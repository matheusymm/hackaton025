import { NextFunction, Request, Response } from "express"
import { HttpController, HttpRequest } from ".."



export const adaptExpressController = (controller: HttpController) => {
  return async (
    expressRequest: Request,
    expressResponse: Response,
    expressNext: NextFunction
  ) => {
    const request: HttpRequest = {
      body: expressRequest.body,
      headers: expressRequest.headers,
      params: expressRequest.params,
      query: expressRequest.query,
    }

    try {
      // TODO: handle headers
      const { status, headers, data } = await controller.handle(request)

      return expressResponse.status(status).send(data)
    } catch (error) {
      return expressNext(error)
    }
  }
}
