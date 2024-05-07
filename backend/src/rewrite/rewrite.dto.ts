import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class RewriteTextDTO {
  @ApiProperty({
    description: "Result text",
  })
  text: string;
}

export class RewriteRequestDTO {
  @ApiProperty({
    description: "Initial text",
  })
  @IsNotEmpty()
  @MaxLength(2800)
  text: string;
}
