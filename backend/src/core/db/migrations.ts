import mongoose from "mongoose";
import { Logger } from "../log/logger";
import { UserRoleEnum } from "../../user";
import { getUserModel } from "../../user/user.schema";
import { AnonymUserEmail, SupportUserEmail } from "src/user/constants";
import { VariableSet } from "../../variable";
import { getTariffModel } from "src/tariff/tariff.schema";

export const DBMigrations = [
  {
    version: 1,
    migrate: async (db: mongoose.Connection, log: Logger) => {
      const model = getUserModel(db);
      // add system user
      const email = SupportUserEmail;
      const password = process.env.ROOT_PWD;
      let user;
      try {
        user = await model.findOne({ email });
      } catch (error) {
        log.error(
          "Initial Data: error finding system user - " + error.toString(),
        );
        throw error;
      }
      if (!user) {
        const data = {
          email,
          password,
          roles: [UserRoleEnum.admin],
          name: "Administrator",
        };
        return model.create(data);
      }
    },
  },
  {
    version: 2,
    migrate: async (db: mongoose.Connection, log: Logger) => {
      const model = getUserModel(db);
      // add system user
      const email = AnonymUserEmail;
      const password = "12345678";
      let user;
      try {
        user = await model.findOne({ email });
      } catch (error) {
        log.error(
          "Initial Data: error finding system user - " + error.toString(),
        );
        throw error;
      }
      if (!user) {
        const data = {
          email,
          password,
          roles: [UserRoleEnum.none],
          name: "Anonym",
        };
        return model.create(data);
      }
    },
  },
  {
    version: 4,
    migrate: async (db: mongoose.Connection) => {
      VariableSet.setValue(
        db,
        "gpt3.5.promt",
        "укажи кратко, но детально и по пунктам всю основную информацию данного текста(только пункты и подпункты без описания текста). Обязательно указывай все числовые значения, авторов, если они есть, конкретные данные о компаниях и странах и нормативные акты(in English):",
      );
      VariableSet.setValue(
        db,
        "gpt4.0.promt",
        "Write a brief, unique and interconnected formal text. Use formal language without any comparisons or idioms. Don't separate points. Use the following information as the basis:",
      );
    },
  },
  {
    version: 5,
    migrate: async (db: mongoose.Connection) => {
      const tariffModel = getTariffModel(db);
      const tariff = await tariffModel.findOneAndUpdate(
        { forRegistration: true },
        {
          attempts: 3,
          name: "Default Tariff",
          forRegistration: true,
          price: 0,
        },
        { new: true, upsert: true },
      );
      const userModel = getUserModel(db);
      await userModel.updateMany(
        { subscription: { $exists: false } },
        {
          subscription: {
            lastTariffId: tariff.id,
            attempts: tariff.attempts,
            updatedAt: new Date(),
          },
        },
      );
    },
  },
  {
    version: 6,
    migrate: async (db: mongoose.Connection) => {
      const tariffModel = getTariffModel(db);
      await tariffModel.findOneAndUpdate(
        { attempts: 5 },
        {
          attempts: 5,
          name: "5 запросов",
          forRegistration: false,
          price: 350,
        },
        { new: true, upsert: true },
      );
      await tariffModel.findOneAndUpdate(
        { attempts: 10 },
        {
          attempts: 10,
          name: "10 запросов",
          forRegistration: false,
          price: 600,
        },
        { new: true, upsert: true },
      );
      await tariffModel.findOneAndUpdate(
        { attempts: 15 },
        {
          attempts: 15,
          name: "15 запросов",
          forRegistration: false,
          price: 800,
        },
        { new: true, upsert: true },
      );
      await tariffModel.findOneAndUpdate(
        { attempts: 20 },
        {
          attempts: 20,
          name: "20 запросов",
          forRegistration: false,
          price: 1000,
        },
        { new: true, upsert: true },
      );
      await tariffModel.findOneAndUpdate(
        { attempts: 30 },
        {
          attempts: 30,
          name: "30 запросов",
          forRegistration: false,
          price: 1200,
        },
        { new: true, upsert: true },
      );
      await tariffModel.findOneAndUpdate(
        { attempts: 50 },
        {
          attempts: 50,
          name: "50 запросов",
          forRegistration: false,
          price: 1900,
        },
        { new: true, upsert: true },
      );
    },
  },
];
