import { ApiProperty } from "@nestjs/swagger";

export class TariffDTO {
  @ApiProperty({
    description: "Tariff id",
  })
  id: string;

  @ApiProperty({
    description: "Tariff name",
  })
  name: string;

  @ApiProperty({
    description: "Tariff price",
  })
  price: number;

  @ApiProperty({
    description: "Amount rewrite attempts",
  })
  attempts: number;
}

export class GetTariffsResponseDTO {
  @ApiProperty({
    description: "Tariffs list",
  })
  items: TariffDTO[];
}
