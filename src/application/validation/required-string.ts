import { RequiredFieldError } from '@/application/errors'

export class RequiredStringValidator {
  constructor (
    private readonly value: string,
    private readonly fielName: string
  ) {}

  validate (): Error | undefined {
    if (this.value === '' || this.value === null || this.value === undefined) {
      return new RequiredFieldError(this.fielName)
    }
  }
}
