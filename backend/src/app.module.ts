import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerMiddleware } from "./core/";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { RewriteModule } from "src/rewrite/rewrite.module";
import { VariableModule } from "src/variable/variable.module";
import { TariffModule } from "src/tariff/tariff.module";
import { OrderModule } from "src/order/order.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    RewriteModule,
    VariableModule,
    TariffModule,
    OrderModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
