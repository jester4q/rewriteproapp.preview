import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  NotFoundException,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger";
import { AuthTokenGuard } from "../auth/token/authToken.guard";
import { UserRolesGuard } from "../user/roles/roles.guard";
import { OrderDocument } from "./types";
import { SessionUserDecorator } from "src/auth/sessionUser.decorator";
import { SessionUser } from "src/auth/types";
import { CreateOrderDTO, OrderDTO } from "src/order/order.dto";
import { OrderService } from "src/order/order.service";

@ApiTags("Orders")
@Controller("orders")
@ApiSecurity("bearer")
@UseGuards(AuthTokenGuard, UserRolesGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get("/:id")
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Get order info by id",
    type: OrderDTO,
  })
  async get(
    @SessionUserDecorator() session: SessionUser,
    @Param("id") id: string,
  ): Promise<OrderDTO> {
    const order = await this.orderService.fetchOne(id);
    if (order.userId != session.userId) {
      throw new NotFoundException("Could not found order by id " + id);
    }
    return this.toOrderDTO(order);
  }

  @Post("")
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Create new order",
    type: OrderDTO,
  })
  async create(
    @SessionUserDecorator() session: SessionUser,
    @Body() data: CreateOrderDTO,
  ): Promise<OrderDTO> {
    const order = await this.orderService.add(session.userId, data.tariffId);
    return this.toOrderDTO(order);
  }

  protected toOrderDTO(order: OrderDocument): OrderDTO {
    return {
      id: order.id,
      tariffId: order.tariffId,
      amount: order.amount / 100,
      status: order.status,
    };
  }
}
