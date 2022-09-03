import { ServerError } from '../errors'
import { HttpResponse } from '../protocols'

export const badRequest = (error: Error): HttpResponse => (
  {
    statusCode: 400,
    body: error
  }
)
export const unauthorized = (error: Error): HttpResponse => (
  {
    statusCode: 401,
    body: error
  }
)
export const notFound = (error: Error): HttpResponse => (
  {
    statusCode: 404,
    body: error
  }
)
export const serverError = (): HttpResponse => (
  {
    statusCode: 500,
    body: new ServerError()
  }
)

export const created = (data: any): HttpResponse => (
  {
    statusCode: 201,
    body: data
  }
)
export const ok = (data: any): HttpResponse => (
  {
    statusCode: 200,
    body: data
  }
)

export const unprocessableEntity = (data: any): HttpResponse => (
  {
    statusCode: 422,
    body: data
  }
)
