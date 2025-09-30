import { ErrorTypeEnum } from '../domain/errors';

export type HttpRequest = {
  body?: any;
  headers?: any;
  params?: any;
  query?: any;
  cookies?: any;
};

export enum HttpStatusEnum {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502
}

export type HttpResponse<T> = {
  status: HttpStatusEnum;
  headers?: Record<string, string>;
  data?: T;
};

/**
 * Helper type predicate to define if a given entity is an `HttpResponse`. Specially
 * useful on the detection of HTTP middlewares request/response flow.
 *
 * See more at: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
export const isHttpResponse = (
  entity: HttpRequest | HttpResponse<any>
): entity is HttpResponse<any> =>
  (entity as HttpResponse<any>).status !== undefined;

export interface HttpController {
  handle: (request: HttpRequest) => Promise<HttpResponse<any>>;
}

export interface HttpMiddleware {
  handle: (request: HttpRequest) => Promise<HttpRequest | HttpResponse<any>>;
}

export interface HttpErrorHandler {
  handle: (error: Error) => HttpResponse<any>;
}

/**
 * Maps each error type in `ErrorTypeEnum` to the corresponding HTTP response
 * status on `HttpStatusEnum`.
 */
export const httpErrorStatusMap: Record<ErrorTypeEnum, HttpStatusEnum> = {
  [ErrorTypeEnum.InvalidFieldError]: HttpStatusEnum.BadRequest,
  [ErrorTypeEnum.Unauthorized]: HttpStatusEnum.Unauthorized,
  [ErrorTypeEnum.NotFound]: HttpStatusEnum.NotFound,
  [ErrorTypeEnum.EntityAlreadyExists]: HttpStatusEnum.UnprocessableEntity,
  [ErrorTypeEnum.Forbidden]: HttpStatusEnum.Forbidden,
  [ErrorTypeEnum.UnprocessableEntity]: HttpStatusEnum.UnprocessableEntity
};
