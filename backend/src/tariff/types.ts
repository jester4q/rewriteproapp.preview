import { HydratedDocument } from "mongoose";
import { Tariff } from "./tariff.schema";

export type TariffDocument = HydratedDocument<Tariff>;
