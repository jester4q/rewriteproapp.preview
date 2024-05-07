import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Logger } from "../core";
import { ApiError } from "./error";
import mongoose from "mongoose";
import { DeepLError } from "deepl-node";
import { OpenAIError } from "openai";

const LogName = "exceptions";
const DefaultException = {
  message: "Internal Server Error",
  code: "HttpException",
  status: HttpStatus.INTERNAL_SERVER_ERROR,
};

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private logger = new Logger(LogName);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = DefaultException.message;
    let logMessage = exception.message;
    let code = DefaultException.code;
    let status = DefaultException.status;

    if (exception instanceof ApiError) {
      exception = exception.toHttpError();
    }

    if (exception instanceof HttpException) {
      status = (exception as HttpException).getStatus();
      code = (exception as HttpException).name;
      message = exception.message;
      if (exception.hasOwnProperty("response")) {
        message = (exception as any).response.message;
      }
      logMessage = message;
    }
    if (exception instanceof mongoose.Error) {
      logMessage = "Mongoose Error: " + exception.message;
    }
    if (exception instanceof DeepLError) {
      logMessage = "DeepL Error: " + exception.message;
    }
    if (exception instanceof OpenAIError) {
      logMessage = "OpenAPI Error: " + exception.message;
    }

    this.logger.log(
      logMessage +
        " --- " +
        (exception as any).stack +
        "---" +
        `${request.method} ${request.url}`,
    );

    response
      .status(status)
      .json(GlobalResponseError(status, message, code, request));
  }
}

const GlobalResponseError: (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
) => IResponseError = (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
): IResponseError => {
  return {
    statusCode: statusCode,
    message,
    code,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method,
  };
};

interface IResponseError {
  statusCode: number;
  message: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}
