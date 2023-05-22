import { type AccessToken } from '@/domain/entities'
import { type AuthError } from '@/domain/entities/errors'

export interface FacebookAuthentication {
  perform: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

export namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthError
}
