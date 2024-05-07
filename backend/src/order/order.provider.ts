import { getOrderModel } from "./order.schema";
import { DBProviderName } from "../core";
import { OrderProviderName } from "./constants";

export const OrderProvider = {
  provide: OrderProviderName,
  useFactory: getOrderModel,
  inject: [DBProviderName],
};
