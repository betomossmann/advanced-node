import { setupFacebookAuthentication, type FacebookAuthentication } from '@/domain/usecases'
import { makeJwtTokenHandler, makeFacebookApi } from '@/main/factories/gateways'
import { makePgUserAccountRepo } from '@/main/factories/repos'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandler()
  )
}
