import {
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from "@nestjs/common";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
  }

  toHttpError() {
    return new BadRequestException(this.message);
  }
}

export class NotFoundApiError extends ApiError {
  toHttpError() {
    return new NotFoundException(this.message);
  }
}

export class ManyRequestsApiError extends ApiError {
  toHttpError() {
    return new ForbiddenException(this.message);
  }
}

export class DeprecatedRequestsApiError extends ApiError {
  toHttpError() {
    return new ForbiddenException(this.message);
  }
}

export class ForbiddenApiError extends ApiError {
  toHttpError() {
    return new ForbiddenException(this.message);
  }
}

export class InternalApiError extends ApiError {
  toHttpError() {
    return new InternalServerErrorException(this.message);
  }
}
