import { type LoadUserAccount, type SaveFacebookAccount } from '@/domain/contracts/repos'
import { type LoadFacebookUser, type TokenGenerator } from '@/domain/contracts/gateways'
import { AccessToken, FacebookAccount } from '@/domain/entities'
import { AuthError } from '@/domain/entities/errors'

type Setup = (
  facebookApi: LoadFacebookUser,
  userAccountRepo: LoadUserAccount & SaveFacebookAccount,
  token: TokenGenerator
) => FacebookAuthentication
type Input = { token: string }
type Output = { accessToken: string }
export type FacebookAuthentication = (params: Input) => Promise<Output>

export const setupFacebookAuthentication: Setup = (facebookApi, userAccountRepo, token) => async params => {
  const fbData = await facebookApi.loadUser(params)
  if (fbData === undefined) throw new AuthError()
  const accountData = await userAccountRepo.load({ email: fbData.email })
  const fbAccount = new FacebookAccount(fbData, accountData)
  const { id } = await userAccountRepo.saveWithFacebook(fbAccount)
  const accessToken = await token.generate({ key: id, expirationInMs: AccessToken.expirationInMs })
  return { accessToken }
}
