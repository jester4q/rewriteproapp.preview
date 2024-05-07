import React from "react";
import rewriteStoreFactory, { IRewriteStore } from "stores/RewriteStore";

export const RewriteContext = React.createContext<IRewriteStore>(
  rewriteStoreFactory(),
);

export function useRewriteStore() {
  return React.useContext(RewriteContext);
}
