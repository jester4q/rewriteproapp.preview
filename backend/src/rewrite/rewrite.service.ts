// import { Result, validationResult } from "express-validator";
import OpenAI from "openai";
import { APIConnectionError, APIConnectionTimeoutError } from "openai/error";
import * as deepl from "deepl-node";
import { Injectable } from "@nestjs/common";
import { ForbiddenApiError, InternalApiError } from "src/core/error";
import { UserService } from "src/user/user.service";
import { SessionUser } from "src/auth/types";
import { VariableService } from "src/variable/variable.service";

@Injectable()
export class RewriteService {
  private readonly deeplTranslator: deepl.Translator;
  private readonly openai: OpenAI;

  constructor(
    private variableService: VariableService,
    private userService: UserService,
  ) {
    const deeplApiKey = process.env.DEEPL_API_KEY;
    this.deeplTranslator = new deepl.Translator(deeplApiKey);
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const openaiApiOrgKey = process.env.OPENAI_API_ORGKEY;
    this.openai = new OpenAI({
      apiKey: openaiApiKey,
      organization: openaiApiOrgKey,
    });
  }

  async rewriteText(session: SessionUser, text: string) {
    if (!this.userService.hasSubscription(session.userId)) {
      throw new ForbiddenApiError("There is no available request for user");
    }
    //const gpt3Text = await this.gpt3Text(text);
    const gpt4Text = await this.gpt4Text(text);
    //const translatedText = await this.translate(gpt4Text);
    await this.userService.useSubscriptionAttempt(session.userId);
    return gpt4Text;
  }

  private async gpt3Text(text: string) {
    const variable = await this.variableService.fetchOne("gpt3.5.promt");
    try {
      const gpt3Answer = await this.openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `${variable.value}  ${text}`,
          },
        ],
        model: "gpt-3.5-turbo",
      });

      return gpt3Answer.choices[0].message.content;
    } catch (error) {
      this.openaiErrorHandler(error);
    }
  }

  private async gpt4Text(text: string) {
    const variable = await this.variableService.fetchOne("gpt4.0.promt");
    try {
      const gpt4Answer = await this.openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `${variable.value} ${text}`,
          },
        ],
        model: "gpt-4-0125-preview",
        temperature: 0.58,
      });
      return gpt4Answer.choices[0].message.content;
    } catch (error) {
      this.openaiErrorHandler(error);
    }
  }

  private async translate(text: string): Promise<string> {
    const response = await this.deeplTranslator.translateText(
      text,
      null,
      "ru",
      { formality: "prefer_more" },
    );
    return response.text;
  }

  private openaiErrorHandler(e: Error & { status?: number; code?: string }) {
    if (e instanceof APIConnectionTimeoutError) {
      throw new InternalApiError(`OpenAI API request timed out: ${e.code}`);
    }

    if (e instanceof APIConnectionError) {
      throw new InternalApiError(
        `OpenAI API request failed to connect: ${e.code}`,
      );
    }
    if (e.status == 400) {
      throw new InternalApiError(`OpenAI API request was invalid: ${e.code}`);
    }
    if (e.status == 401) {
      throw new InternalApiError(
        `OpenAI API request was not authorized: ${e.code}`,
      );
    }
    if (e.status == 403) {
      throw new InternalApiError(
        `OpenAI API request was not permitted: ${e.code}`,
      );
    }

    if (e.status == 429) {
      throw new InternalApiError(
        `OpenAI API request exceeded rate limit: ${e.code}`,
      );
    }

    throw new InternalApiError(`OpenAI API returned an API Error: ${e.code}`);
  }
}
