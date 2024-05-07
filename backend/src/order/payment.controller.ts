import { Controller, Post, Req } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { PaymentService } from "./payment.service";
import { TinkoffPaymentDTO } from "./types";

@ApiTags("Payment")
@Controller("payment")
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post("")
  @ApiOkResponse({
    description: "Check payment status",
  })
  async updateStatus(@Req() req: Request): Promise<void> {
    try {
      console.log("Payment LOG: ", req.headers, req.body);
      const data: TinkoffPaymentDTO = req.body as unknown as TinkoffPaymentDTO;
      await this.paymentService.tinkoffPayment(data);
    } catch (error) {
      console.log("Payment LOG: ", error);
    }
  }
}
