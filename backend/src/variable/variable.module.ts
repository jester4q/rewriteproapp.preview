import { Module } from "@nestjs/common";
import { DBModule } from "../core/db/db.module";
import { VariableProvider } from "src/variable/variable.provider";
import { VariableService } from "src/variable/variable.service";

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [VariableService, VariableProvider],
  exports: [VariableService],
})
export class VariableModule {}
