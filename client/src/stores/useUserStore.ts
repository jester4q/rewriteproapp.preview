import React from "react";
import userStoreFactory, { IUserStore } from "stores/UserStore";

export const UserContext = React.createContext<IUserStore>(userStoreFactory());

export function useUserStore() {
  return React.useContext(UserContext);
}
