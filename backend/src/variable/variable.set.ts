import mongoose from "mongoose";
import { getVariableModel } from "./variable.schema";

export const VariableSet = {
  getValue(db: mongoose.Connection, name: string): Promise<any> {
    const model = getVariableModel(db);
    return model.findOne({ name }).then((r) => (r && r.value) || null);
  },

  setValue(db: mongoose.Connection, name: string, value: any): Promise<void> {
    const model = getVariableModel(db);
    return model
      .findOneAndUpdate({ name }, { value }, { new: true, upsert: true })
      .then(() => {});
  },
};
