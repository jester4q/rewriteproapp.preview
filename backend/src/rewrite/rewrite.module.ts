import { Module } from "@nestjs/common";
import { RewriteController } from "./rewrite.controller";
import { RewriteService } from "./rewrite.service";
import { VariableModule } from "src/variable/variable.module";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [VariableModule, UserModule],
  controllers: [RewriteController],
  providers: [RewriteService],
  exports: [],
})
export class RewriteModule {}
