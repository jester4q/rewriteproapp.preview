import { HydratedDocument } from "mongoose";
import { Variable } from "./variable.schema";

export type VariableDocument = HydratedDocument<Variable>;
