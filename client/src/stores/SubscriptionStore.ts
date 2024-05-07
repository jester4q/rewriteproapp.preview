import { makeAutoObservable } from "mobx";
import userStoreFactory from "stores/UserStore";
import { RequestState } from "types/RequestState";

export type Tariff = {
  id: string;
  price: number;
  name: string;
  attempts: number;
};

export type Order = {
  id: string;
  tariffId: string;
  amount: number;
};

export interface ISubscriptionStore {
  state: RequestState;
  tariffs(): Promise<Tariff[]>;
  connectionError(): boolean;
  getTariff(id: string): Tariff | undefined;
  getOrder(tariffId: string): Promise<Order>;
}

const UserStore = userStoreFactory();

class SubscriptionStore implements ISubscriptionStore {
  public state: RequestState = RequestState.PENDING;

  private data: Tariff[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  tariffs(): Promise<Tariff[]> {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    this.setState(RequestState.LOADING);

    return fetch(`${process.env.REACT_APP_API_HOST}tariffs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => this.checkResponse(res))
      .then((res) => this.setTariffs(res.items))
      .then(() => this.data || []);
  }

  getTariff(id: string): Tariff | undefined {
    if (!this.data) {
      return undefined;
    }
    return this.data.find((item) => item.id === id);
  }

  getOrder(tariffId: string): Promise<Order> {
    return fetch(`${process.env.REACT_APP_API_HOST}orders`, {
      method: "POST",
      body: JSON.stringify({ tariffId: tariffId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => this.checkResponse(res))
      .then((res) => ({
        tariffId: res.tariffId,
        id: res.id,
        amount: res.amount,
      }));
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

  private setTariffs(result: Tariff[]) {
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

const store = new SubscriptionStore();

export default function subscriptionStoreFactory(): ISubscriptionStore {
  return store;
}
