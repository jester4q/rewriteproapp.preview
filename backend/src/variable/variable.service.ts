import { Injectable, Inject } from "@nestjs/common";
import { VariableDocument } from "./types";
import { NotFoundApiError } from "../core/error";
import { VariableProviderName } from "./constants";
import { Model } from "mongoose";

@Injectable()
export class VariableService {
  constructor(
    @Inject(VariableProviderName)
    private variableModel: Model<VariableDocument>,
  ) {}

  public async fetchOne(name: string): Promise<VariableDocument> {
    const v = await this.variableModel.findOne({ name });
    if (!v) {
      throw new NotFoundApiError("Could not find variable " + name);
    }
    return v;
  }
}
