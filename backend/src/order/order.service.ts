import { Injectable, Inject } from "@nestjs/common";
import { OrderDocument, OrderStatusEnum } from "./types";
import { NotFoundApiError } from "../core/error";
import { OrderProviderName } from "./constants";
import { Model } from "mongoose";
import { TariffService } from "src/tariff/tariff.service";

@Injectable()
export class OrderService {
  constructor(
    @Inject(OrderProviderName)
    private orderModel: Model<OrderDocument>,
    private tariffService: TariffService,
  ) {}

  public async fetchOne(orderId: string): Promise<OrderDocument> {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundApiError("Could not find order by id " + orderId);
    }
    return order;
  }

  public async add(userId: string, tariffId: string): Promise<OrderDocument> {
    const tariff = await this.tariffService.fetchOne(tariffId);
    if (!tariff) {
      throw new NotFoundApiError("Could not find tariff by id");
    }
    let order = await this.orderModel.findOne({
      userId: userId,
      tariffId: tariffId,
      status: OrderStatusEnum.pending,
    });
    if (order && (!order.payments || !order.payments.length)) {
      return order;
    }

    order = await this.orderModel.create({
      userId: userId,
      tariffId: tariffId,
      amount: tariff.price * 100,
      status: OrderStatusEnum.pending,
    });
    return order;
  }
}
