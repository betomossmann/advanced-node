import { type LoadFacebookUserApi } from '../contracts/apis'
import { type TokenGenerator } from '../contracts/crypto'
import { type LoadUserAccountRepository, type SaveFacebookAccountRepository } from '../contracts/repos'
import { AccessToken, FacebookAccount } from '../entities'
import { AuthError } from '../entities/errors'

type Setup = (facebookApi: LoadFacebookUserApi, userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository, crypto: TokenGenerator) => FacebookAuthentication
export type FacebookAuthentication = (params: { token: string }) => Promise<AccessToken | AuthError>

export const setupFacebookAuthentication: Setup = (facebookApi, userAccountRepo, crypto) => async (params) => {
  const fbData = await facebookApi.loadUser(params)
  if (fbData !== undefined) {
    const accountData = await userAccountRepo.load({ email: fbData.email })
    const fbAccount = new FacebookAccount(fbData, accountData)
    const { id } = await userAccountRepo.saveWithFacebook(fbAccount)
    const token = await crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
    return new AccessToken(token)
  }
  return new AuthError()
}
