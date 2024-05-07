import { Controller, UseGuards, Post, Body } from "@nestjs/common";
import { ApiOkResponse, ApiSecurity, ApiTags, ApiBody } from "@nestjs/swagger";
import { AuthTokenGuard } from "src/auth";
import { RewriteRequestDTO, RewriteTextDTO } from "./rewrite.dto";
import { RewriteService } from "./rewrite.service";
import { UserRoleEnum, UserRolesGuard } from "../user";
import { SessionUserDecorator } from "src/auth/sessionUser.decorator";
import { SessionUser } from "src/auth/types";
import { HasRoles } from "src/user/roles/roles.decorator";

@ApiTags("Rewrite")
@Controller("rewrite")
@ApiSecurity("bearer")
@UseGuards(AuthTokenGuard, UserRolesGuard)
export class RewriteController {
  constructor(private readonly rewriteService: RewriteService) {}

  @Post()
  @ApiOkResponse({
    description: "Rewritten  text",
    type: RewriteTextDTO,
  })
  @HasRoles(UserRoleEnum.customer)
  @ApiBody({ required: true, type: RewriteRequestDTO })
  async rewrite(
    @SessionUserDecorator() session: SessionUser,
    @Body() data: RewriteRequestDTO,
  ): Promise<RewriteTextDTO> {
    const result = await this.rewriteService.rewriteText(session, data.text);
    return { text: result };
  }
}
