import mongoose from "mongoose";
import { TariffModelName } from "./constants";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export function getTariffModel(connection: mongoose.Connection) {
  return connection.model(TariffModelName, TariffSchema);
}

@Schema({ versionKey: false })
export class Tariff {
  @Prop({ required: true, index: { unique: true } })
  public name: string;
  @Prop({ required: true })
  public attempts: number;
  @Prop({ required: true })
  public price: number;
  @Prop({ default: false })
  public forRegistration: boolean;
}

export const TariffSchema = SchemaFactory.createForClass(Tariff);

TariffSchema.set("toJSON", {
  getters: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
