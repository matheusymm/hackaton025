export enum ErrorTypeEnum {
  InvalidFieldError,
  Unauthorized,
  NotFound,
  EntityAlreadyExists,
  Forbidden,
  UnprocessableEntity
}

export abstract class BaseError extends Error {
  public readonly details?: string
  public abstract readonly errorType: ErrorTypeEnum

  constructor(message?: string, details?: string) {
    super(message)
    this.details = details
  }
}

export class InvalidFieldError extends BaseError {
  public readonly errorType: ErrorTypeEnum = ErrorTypeEnum.InvalidFieldError

  constructor(field: string, public readonly details?: string) {
    super(`Invalid field '${field}'.`, details)
  }
}

export class UnauthorizedError extends BaseError {
  public readonly errorType: ErrorTypeEnum = ErrorTypeEnum.Unauthorized

  constructor(public readonly details?: string) {
    super(details)
  }
}

export class NotFound extends BaseError {
  public readonly errorType: ErrorTypeEnum = ErrorTypeEnum.NotFound

  constructor(public readonly details?: string) {
    super(details)
  }
}

export class EntityAlreadyExists extends BaseError {
  public readonly errorType: ErrorTypeEnum = ErrorTypeEnum.EntityAlreadyExists

  constructor(value: string, field: string, public readonly details?: string) {
    super(`field: ${field}  with value '${value}' already exists.`, details)
  }
}

export class UnprocessableEntity extends BaseError {
  public readonly errorType: ErrorTypeEnum = ErrorTypeEnum.UnprocessableEntity
  constructor(field: string, public readonly details?: string) {
    super(`There was a error while processing type: ${field}`, details)
  }
}

export class Forbidden extends BaseError {
  public readonly errorType: ErrorTypeEnum = ErrorTypeEnum.Forbidden

  constructor(public readonly details?: string) {
    super(details)
  }
}
