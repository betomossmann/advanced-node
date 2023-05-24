type LoadParams = LoadUserAccount.Params
type LoadResult = LoadUserAccount.Result
type SaveParams = SaveFacebookAccount.Params
type SaveResult = SaveFacebookAccount.Result

export interface LoadUserAccount {
  load: (params: LoadParams) => Promise<LoadResult>
}

export namespace LoadUserAccount {
  export type Params = {
    email: string
  }

  export type Result = undefined | {
    id: string
    name?: string
  }
}

export interface SaveFacebookAccount {
  saveWithFacebook: (params: SaveParams) => Promise<SaveResult>
}

export namespace SaveFacebookAccount {
  export type Params = {
    id?: string
    email: string
    name: string
    facebookId: string
  }

  export type Result = {
    id: string
  }
}
