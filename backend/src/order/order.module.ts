import { Module } from "@nestjs/common";
import { DBModule } from "../core/db/db.module";
import { PaymentController } from "./payment.controller";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderProvider } from "./order.provider";
import { PaymentService } from "./payment.service";
import { UserModule } from "src/user/user.module";
import { TariffModule } from "src/tariff/tariff.module";

@Module({
  imports: [DBModule, UserModule, TariffModule],
  controllers: [PaymentController, OrderController],
  providers: [OrderService, PaymentService, OrderProvider],
  exports: [OrderService],
})
export class OrderModule {}
