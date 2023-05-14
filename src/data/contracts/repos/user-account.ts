// LOAD USER ACCOUNT REPOSITORY
export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = undefined | {
    id: string
    name?: string
  }
}

// SAVE FACEBOOK ACCOUNT REPOSITORY
export interface SaveFacebookAccountRepository {
  saveWithFacebook: (params: SaveFacebookAccountRepository.Params) => Promise<void>
}

export namespace SaveFacebookAccountRepository {
  export type Params = {
    id?: string
    email: string
    name: string
    facebookId: string
  }
}
