import { makeAutoObservable } from "mobx";
import { RequestState } from "types/RequestState";
import { VkPayload } from "types/VkPayload";

type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  subscription: { attempts: number };
};

export interface IUserStore {
  state: RequestState;
  isAccount(): boolean;
  loginVk(payload: VkPayload): Promise<void>;
  loadAccount(): Promise<void>;
  logout(): Promise<void>;
  connectionError(): boolean;
  stringAvatar(): string;
  amountAvailableRequests(): number;
  hasUserAvatar(): boolean;
  userName(): string;
  userAvatar(): string;
}

class UserStore implements IUserStore {
  public state: RequestState = RequestState.PENDING;

  private data: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public hasToken() {
    return !!this.token;
  }

  public connectionError(): boolean {
    return this.state === RequestState.ERROR;
  }

  public isAccount(): boolean {
    return !!this.data && !!this.data.id && this.data.name !== "Anonym";
  }

  public stringAvatar(): string {
    if (!this.data) {
      return "";
    }
    const name = this.data.name.split(" ");
    return `${name[0][0]}${(name.length && name[1][0]) || ""}`;
  }

  public amountAvailableRequests(): number {
    if (!this.data) {
      return 0;
    }
    return this.data.subscription.attempts;
  }

  public hasUserAvatar() {
    return !!(this.data && this.data.avatarUrl);
  }

  public userName(): string {
    return this.data?.name || "";
  }

  public userAvatar(): string {
    return this.data?.avatarUrl || "";
  }

  public initAnonym(token?: string) {
    if (token) {
      this.token = token;
      return Promise.resolve();
    }
    this.setState(RequestState.LOADING);

    return fetch(`${process.env.REACT_APP_API_HOST}auth/anonym`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        switch (res.status) {
          case 200:
          case 201:
            return res.json();
          default:
            this.setError();
            return Promise.reject("ERROR");
        }
      })
      .then((res) => {
        this.token = res.token;
        this.clear();
      })
      .catch((err) => {
        this.setError();
        console.log("Error init anonym token", err);
      });
  }

  public loginVk(payload: VkPayload): Promise<void> {
    this.setState(RequestState.LOADING);

    return fetch(`${process.env.REACT_APP_API_HOST}auth/vk-login`, {
      method: "POST",
      body: JSON.stringify({
        userId: payload.user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        switch (res.status) {
          case 200:
          case 201:
            return res.json();
          default:
            this.setError();
            return Promise.reject();
        }
      })
      .then((res) => {
        this.token = res.token;
        return this.loadAccount();
      });
  }

  private get token(): string {
    const token = sessionStorage.getItem("rwr.token");
    return token || "";
  }

  private set token(token: string) {
    sessionStorage.setItem("rwr.token", token);
  }

  private checkResponse(res) {
    switch (res.status) {
      case 200:
      case 201:
        return res.json();
      case 401:
        return this.logout().then(() => Promise.reject("LOGOUT"));
      default:
        this.setError();
        return Promise.reject("ERROR");
    }
  }

  public loadAccount() {
    this.setState(RequestState.LOADING);
    if (!this.hasToken()) {
      return Promise.reject();
    }

    return fetch(`${process.env.REACT_APP_API_HOST}auth`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => this.checkResponse(res))
      .then((user) => this.setUser(user))
      .catch((error) => {
        if (error === "LOGOUT") {
          return this.initAnonym();
        }
        throw error;
      });
  }

  public async logout() {
    if (this.hasToken() && this.isAccount()) {
      await this.initAnonym();
    }
    this.clear();
  }

  private clear() {
    this.data = null;
    this.setState(RequestState.PENDING);
  }

  private setUser(user: User) {
    this.data = user;
    this.setState(RequestState.SUCCESS);
  }

  private setState(state: RequestState) {
    this.state = state;
  }

  private setError() {
    this.setState(RequestState.ERROR);
  }
}

const userStore = new UserStore();

export default function userStoreFactory(): IUserStore {
  if (!userStore.hasToken()) {
    userStore
      .initAnonym
      //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTdiZGZiOGEwNjUyNTU3YjZjNjJlYTMiLCJuYW1lIjoiODQyODA4NDBAdmsuY29tIiwidXNlcklkIjoiNjU3NmJkOWJjZmU3OWY1ZDU1MThmYTEwIiwicm9sZXMiOlsiY3VzdG9tZXIiXSwiaWF0IjoxNzAyNjE3MDE2LCJleHAiOjE3MDI2MTg4MTZ9.MHS-cZxZ8kD9nCwVzpKI5_166tPVzx8W80uGL6v9COQ",
      ();
  }
  return userStore;
}
