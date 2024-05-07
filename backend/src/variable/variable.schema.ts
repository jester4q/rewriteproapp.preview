import mongoose from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { VariableModelName } from "./constants";

export function getVariableModel(connection: mongoose.Connection) {
  return connection.model(VariableModelName, VariableSchema);
}

@Schema({ versionKey: false })
export class Variable {
  @Prop({ required: true, index: { unique: true } })
  public name: string;
  @Prop({ required: true, index: { unique: true } })
  public value: string;
}

export const VariableSchema = SchemaFactory.createForClass(Variable);

VariableSchema.set("toJSON", {
  getters: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
