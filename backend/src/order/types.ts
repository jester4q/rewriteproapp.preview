import { HydratedDocument } from "mongoose";
import { ITimestamps } from "src/core";
import { Order, OrderPayment, OrderPaymentLog } from "./order.schema";

export type OrderPaymentPatch = {
  amount: number;
  externalId: string;
  status: PaymentStatusEnum;
};

export type OrderPaymentLogDocument = HydratedDocument<
  OrderPaymentLog & ITimestamps
>;

export type OrderPaymentDocument = HydratedDocument<OrderPayment & ITimestamps>;

export type OrderDocument = HydratedDocument<
  Order & ITimestamps,
  {
    pay(payment: OrderPaymentPatch, log: any): void;
  }
>;

export enum OrderStatusEnum {
  pending = "pending",
  payed = "payed",
  closed = "closed",
  cancelled = "cancelled",
  refunded = "refunded",
  expired = "expired",
}

export enum PaymentStatusEnum {
  pending = "pending",
  complete = "complete",
  failed = "failed",
  expired = "expired",
  refunded = "refunded",
}

export type TinkoffPaymentDTO = {
  TerminalKey: string;
  OrderId: string;
  Success: boolean;
  Status: "AUTHORIZED" | "CONFIRMED" | "CANCELLED" | "FAILED";
  PaymentId: number;
  ErrorCode: string;
  Amount: number;
  CardId: number;
  Pan: string;
  ExpDate: string;
  Token: string;
};
