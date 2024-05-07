import { makeAutoObservable } from "mobx";
import userStoreFactory from "stores/UserStore";
import { RequestState } from "types/RequestState";

type Text = {
  text: string;
};

export interface IRewriteStore {
  state: RequestState;
  isEmpty(): boolean;
  request(text: string): Promise<string>;
  connectionError(): boolean;
}

const UserStore = userStoreFactory();

class RewriteStore implements IRewriteStore {
  public state: RequestState = RequestState.PENDING;

  private data: Text | null = null;
  private lastRequest: Text | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  isEmpty(): boolean {
    return !this.data || !this.data.text;
  }

  request(text: string): Promise<string> {
    this.setState(RequestState.LOADING);
    this.lastRequest = {
      text: text,
    };

    return fetch(`${process.env.REACT_APP_API_HOST}rewrite`, {
      method: "POST",
      body: JSON.stringify(this.lastRequest),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => this.checkResponse(res))
      .then((res) => this.setText(res))
      .then(() => UserStore.loadAccount())
      .then(() => (this.data && this.data.text) || "");
  }

  public connectionError(): boolean {
    return this.state === RequestState.ERROR;
  }

  private get token(): string {
    const token = sessionStorage.getItem("rwr.token");
    return token || "";
  }

  private checkResponse(res) {
    switch (res.status) {
      case 200:
      case 201:
        return res.json();
      case 401:
        this.clear();
        return UserStore.logout().then(() => Promise.reject("LOGOUT"));
      default:
        this.setError();
        return Promise.reject("ERROR");
    }
  }

  private clear() {
    this.data = null;
    this.setState(RequestState.PENDING);
  }

  private setText(result: Text) {
    this.data = result;
    this.setState(RequestState.SUCCESS);
  }

  private setState(state: RequestState) {
    this.state = state;
  }

  private setError() {
    this.setState(RequestState.ERROR);
  }
}

const rewriteStore = new RewriteStore();

export default function rewriteStoreFactory(): IRewriteStore {
  return rewriteStore;
}
