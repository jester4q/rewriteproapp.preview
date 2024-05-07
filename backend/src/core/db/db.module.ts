import { Module } from "@nestjs/common";
import { DBProvider } from "./db.provider";

@Module({
  providers: [DBProvider],
  exports: [DBProvider],
})
export class DBModule {}
