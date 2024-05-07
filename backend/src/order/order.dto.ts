import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { OrderStatusEnum } from "src/order/types";

export class OrderDTO {
  @ApiProperty({
    description: "Order id",
  })
  id: string;

  @ApiProperty({
    description: "Tariff id",
  })
  tariffId: string;

  @ApiProperty({
    description: "Amount for pay",
  })
  amount: number;

  @ApiProperty({
    description: "Order status",
  })
  status: OrderStatusEnum;
}

export class CreateOrderDTO {
  @ApiProperty({
    description: "Tariff id",
  })
  @IsNotEmpty()
  tariffId: string;
}
