import { type SaveFacebookAccount, type LoadUserAccount } from '@/domain/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'
import { getRepository } from 'typeorm'

type LoadParams = LoadUserAccount.Params
type LoadResult = LoadUserAccount.Result
type SaveParams = SaveFacebookAccount.Params
type SaveResult = SaveFacebookAccount.Result

export class PostgresUserAccountRepository implements LoadUserAccount, SaveFacebookAccount {
  async load ({ email }: LoadParams): Promise<LoadResult> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: SaveParams): Promise<SaveResult> {
    const pgUserRepo = getRepository(PgUser)
    let ResultId: string
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ email, name, facebookId })
      ResultId = pgUser.id.toString()
    } else {
      ResultId = id
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
    return { id: ResultId }
  }
}
