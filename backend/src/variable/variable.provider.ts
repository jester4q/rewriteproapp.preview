import { getVariableModel } from "./variable.schema";
import { DBProviderName } from "../core";
import { VariableProviderName } from "./constants";

export const VariableProvider = {
  provide: VariableProviderName,
  useFactory: getVariableModel,
  inject: [DBProviderName],
};
