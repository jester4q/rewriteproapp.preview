import { Injectable, Inject } from "@nestjs/common";
import { TariffDocument } from "./types";
import { NotFoundApiError } from "../core/error";
import { TariffProviderName } from "./constants";
import { Model } from "mongoose";

@Injectable()
export class TariffService {
  constructor(
    @Inject(TariffProviderName)
    private tariffModel: Model<TariffDocument>,
  ) {}

  public async fetchAll(): Promise<TariffDocument[]> {
    const where: any = {
      forRegistration: false,
    };

    const tariffs: TariffDocument[] = await this.tariffModel.find(where);
    if (!tariffs.length) {
      return [];
    }

    return tariffs;
  }

  public async fetchOne(tariffId: string): Promise<TariffDocument> {
    const tariff = await this.tariffModel.findById(tariffId);
    if (!tariff) {
      throw new NotFoundApiError("Could not find tariff by id " + tariffId);
    }
    return tariff;
  }

  public async getForRegistration(): Promise<TariffDocument> {
    const tariff = await this.tariffModel.findOne({ forRegistration: true });
    if (!tariff) {
      throw new NotFoundApiError("Could not find default tariff");
    }
    return tariff;
  }
}
