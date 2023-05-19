import { ValidationComposite, type Validator } from '@/application/validation'
import { badRequest, type HttpResponse } from '@/application/helpers'
import { ServerError } from '@/application/errors'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  buildValidators (httpRequest: any): Validator[] {
    return []
  }

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) {
        return badRequest(error)
      }
      return await this.perform(httpRequest)
    } catch (error) {
      return {
        statusCode: 500,
        data: new ServerError()
      }
    }
  }

  private validate (httpRequest: any): Error | undefined {
    return new ValidationComposite(this.buildValidators(httpRequest)).validate()
  }
}
