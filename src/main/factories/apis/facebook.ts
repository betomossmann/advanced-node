import { makeAxiosHttpClient } from '@/main/factories/http/'
import { env } from '@/main/config/env'
import { FacebookApi } from '@/infra/apis'

export const makeFacebookApi = (): FacebookApi => {
  return new FacebookApi(makeAxiosHttpClient(), env.facebookApi.clientId, env.facebookApi.clientSecret)
}
