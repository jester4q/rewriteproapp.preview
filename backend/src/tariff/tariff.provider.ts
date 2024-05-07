import { getTariffModel } from "./tariff.schema";
import { DBProviderName } from "../core";
import { TariffProviderName } from "./constants";

export const TariffProvider = {
  provide: TariffProviderName,
  useFactory: getTariffModel,
  inject: [DBProviderName],
};
