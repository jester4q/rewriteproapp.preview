import { Controller, Get, UseGuards, Param } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger";
import { AuthTokenGuard } from "src/auth/token/authToken.guard";
import { UserRolesGuard } from "src/user/roles/roles.guard";
import { TariffService } from "./tariff.service";
import { GetTariffsResponseDTO, TariffDTO } from "./tariff.dto";
import { TariffDocument } from "./types";

@ApiTags("Tariffs")
@Controller("tariffs")
@ApiSecurity("bearer")
@UseGuards(AuthTokenGuard, UserRolesGuard)
export class TariffController {
  constructor(private tariffService: TariffService) {}

  @Get("")
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: "List of tariffs",
    type: GetTariffsResponseDTO,
  })
  async list(): Promise<GetTariffsResponseDTO> {
    const tariffs = await this.tariffService.fetchAll();
    return { items: tariffs.map((item) => this.toTariffDTO(item)) };
  }

  @Get("/:id")
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: "Get tariff by id",
    type: TariffDTO,
  })
  async get(@Param("id") id: string): Promise<TariffDTO> {
    const tariff = await this.tariffService.fetchOne(id);
    return this.toTariffDTO(tariff);
  }

  protected toTariffDTO(tariff: TariffDocument): TariffDTO {
    return {
      id: tariff.id,
      name: tariff.name,
      attempts: tariff.attempts,
      price: tariff.price,
    };
  }
}
