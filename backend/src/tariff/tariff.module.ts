import { Module } from "@nestjs/common";
import { DBModule } from "../core/db/db.module";
import { TariffProvider } from "src/tariff/tariff.provider";
import { TariffController } from "src/tariff/tariff.controller";
import { TariffService } from "src/tariff/tariff.service";

@Module({
  imports: [DBModule],
  controllers: [TariffController],
  providers: [TariffService, TariffProvider],
  exports: [TariffService],
})
export class TariffModule {}
