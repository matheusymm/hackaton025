import { HttpErrorHandler, httpErrorStatusMap, HttpResponse } from "..";
import { BaseError } from "../../domain/errors";

export class ErrorHandler implements HttpErrorHandler {
  handle(error: Error): HttpResponse<any> {
    // Any unknown errors are returned as internal server errors
    if (!(error instanceof BaseError))
      return {
        status: 500,
        data: {
          'Internal error': error.message
        }
      };

    const { message, details } = error;
    const status = httpErrorStatusMap[error.errorType] ?? 500;

    // TODO: Use a better logging mechanism (maybe winston + GCP logs).
    console.log(error);

    return {
      status,
      data: {
        error: message,
        details
      }
    };
  }
}
