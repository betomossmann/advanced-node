import { type LoadFacebookUserApi } from '@/data/contracts/apis'
import { type LoadUserAccountRepository } from '@/data/contracts/repos'
import { AuthError } from '@/domain/errors'
import { type FacebookAuthentication } from '@/domain/features'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthError> {
    const fbData = await this.loadFacebookUserApi.loadUser(params)
    if (fbData !== undefined) {
      await this.loadUserAccountRepo.load({ email: fbData?.email })
    }
    return new AuthError()
  }
}
