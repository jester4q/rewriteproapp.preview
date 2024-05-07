import * as mongoose from "mongoose";
import { DBProviderName } from "./constants";
import { VariableSet } from "../../variable";
import { Logger } from "../log/logger";
import { DBMigrations } from "./migrations";

const LogName = "db";

export const DBProvider = {
  provide: DBProviderName,
  useFactory: async (): Promise<typeof mongoose> => {
    const db = await mongoose.connect(process.env.MONGODB_URL);
    updateSchema(db.connection, DBMigrations);
    return db;
  },
};

async function updateSchema(db: mongoose.Connection, migrations) {
  const logger = new Logger(LogName);
  let version: number = (await VariableSet.getValue(db, "version")) || 0;
  logger.log(
    "Migration: schema migration started, current version - " + version,
  );
  for (let i = 0; i < migrations.length; i++) {
    const migration = migrations[i];
    if (migration.version > version) {
      version = migration.version;
      await migration.migrate(db);
      logger.log("Migration: schema updated to version - " + version);
      await VariableSet.setValue(db, "version", migration.version);
    }
  }
  logger.log(
    "Migration: schema migration finished, current version - " + version,
  );
}
