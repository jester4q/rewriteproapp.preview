import React from "react";
import subscriptionStoreFactory, {
  ISubscriptionStore,
} from "./SubscriptionStore";

export const SubscriptionContext = React.createContext<ISubscriptionStore>(
  subscriptionStoreFactory(),
);

export function useSubscriptionStore() {
  return React.useContext(SubscriptionContext);
}
