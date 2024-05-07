import mongoose from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { OrderModelName } from "./constants";
import { OrderPaymentPatch, OrderStatusEnum } from "./types";
import { PaymentStatusEnum } from "./types";

export function getOrderModel(connection: mongoose.Connection) {
  return connection.model(OrderModelName, OrderSchema);
}

@Schema({ timestamps: true, versionKey: false })
export class OrderPaymentLog {
  constructor(data?: { log: string }) {
    if (data) {
      this.log = data.log;
    }
  }
  @Prop({ require: true })
  public log: string;
}

export const OrderPaymentLogSchema =
  SchemaFactory.createForClass(OrderPaymentLog);

@Schema({ timestamps: true, versionKey: false })
export class OrderPayment {
  constructor(data?: OrderPaymentPatch) {
    if (data) {
      this.amount = data.amount;
      this.externalId = data.externalId;
      this.status = data.status;
      this.log = [];
    }
  }
  @Prop({ required: true })
  public amount: number;

  @Prop({ required: true })
  public externalId: string;

  @Prop({ required: true })
  public status: PaymentStatusEnum;

  @Prop({ type: [OrderPaymentLogSchema], default: [] })
  public log: Array<OrderPaymentLog>;
}

export const OrderPaymentSchema = SchemaFactory.createForClass(OrderPayment);

@Schema({ timestamps: true, versionKey: false })
export class Order {
  @Prop({ required: true })
  public tariffId: string;

  @Prop({ required: true })
  public amount: number;

  @Prop({ required: true })
  public userId: string;

  @Prop({ required: true })
  public status: OrderStatusEnum;

  @Prop({ type: [OrderPaymentSchema], default: [] })
  public payments: Array<OrderPayment>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.method("pay", function (payment: OrderPaymentPatch, log: any) {
  let same = this.payments.find(
    (item) => item.externalId == payment.externalId,
  );
  if (!same) {
    same = new OrderPayment(payment);
    this.payments.push(same);
  }
  same.log.push(new OrderPaymentLog({ log: JSON.stringify(log) }));
});

OrderSchema.set("toJSON", {
  getters: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

OrderPaymentSchema.set("toJSON", {
  getters: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

OrderPaymentLogSchema.set("toJSON", {
  getters: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
