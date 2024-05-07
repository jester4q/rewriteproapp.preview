import { Injectable, Inject } from "@nestjs/common";
import {
  OrderDocument,
  OrderStatusEnum,
  PaymentStatusEnum,
  TinkoffPaymentDTO,
} from "./types";
import { NotFoundApiError } from "../core/error";
import { OrderProviderName } from "./constants";
import { Model } from "mongoose";
import { UserService } from "src/user/user.service";
import { OrderPayment } from "src/order/order.schema";

@Injectable()
export class PaymentService {
  constructor(
    @Inject(OrderProviderName)
    private orderModel: Model<OrderDocument>,
    private userService: UserService,
  ) {}

  public async tinkoffPayment(data: TinkoffPaymentDTO): Promise<OrderDocument> {
    const order = await this.orderModel.findById(data.OrderId);
    if (!order) {
      throw new NotFoundApiError("Could not find order by id " + data.OrderId);
    }
    const status = this.tinkoffPaymentStatusToStatus(data.Status);
    await this.addPayment(
      order,
      {
        amount: data.Amount,
        status: status,
        externalId: String(data.PaymentId),
        log: undefined,
      },
      data,
    );
    if (order.amount !== data.Amount) {
      throw new NotFoundApiError("Refund amount is wrong");
    }
    if (status == PaymentStatusEnum.refunded) {
      await this.refund(order);
    }
    if (status == PaymentStatusEnum.complete) {
      await this.pay(order);
    }

    return order;
  }

  private async addPayment(order, payment: OrderPayment, data: any) {
    order.pay(
      {
        amount: payment.amount,
        status: payment.status,
        externalId: payment.externalId,
      },
      data,
    );
    await order.save();
  }

  private async pay(order: OrderDocument) {
    if (order.status !== OrderStatusEnum.pending) {
      throw new NotFoundApiError("Order is closed");
    }

    order.status = OrderStatusEnum.payed;
    await order.save();
    await this.userService.subscribe(order.userId, order.tariffId);
    order.status = OrderStatusEnum.closed;
    await order.save();

    return order;
  }

  private async refund(order: OrderDocument) {
    if (
      ![OrderStatusEnum.closed, OrderStatusEnum.payed].includes(order.status)
    ) {
      throw new NotFoundApiError("Order is not payed");
    }
    await this.userService.unsubscribe(order.userId, order.tariffId);
    order.status = OrderStatusEnum.refunded;
    await order.save();
  }

  private tinkoffPaymentStatusToStatus(
    status: TinkoffPaymentDTO["Status"],
  ): PaymentStatusEnum {
    // "AUTHORIZED" | "CONFIRMED" | "CANCELLED" | "FAILED" | "REJECTED" | "REFUNDED"
    if (status === "AUTHORIZED") {
      return PaymentStatusEnum.pending;
    }

    if (status === "CONFIRMED") {
      return PaymentStatusEnum.complete;
    }

    if (status === "CANCELLED") {
      return PaymentStatusEnum.failed;
    }

    if (status === "FAILED") {
      return PaymentStatusEnum.failed;
    }

    if (status === "REJECTED") {
      return PaymentStatusEnum.failed;
    }

    if (status === "REFUNDED") {
      return PaymentStatusEnum.refunded;
    }

    return undefined;
  }
}
