import { type LoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthError } from '@/domain/errors'
import { type FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthError> {
    await this.loadFacebookUserApi.loadUser(params)
    return new AuthError()
  }
}
