import { type SaveFacebookAccountRepository, type LoadUserAccountRepository } from '@/data/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'
import { getRepository } from 'typeorm'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result
type SaveParams = SaveFacebookAccountRepository.Params
type SaveResult = SaveFacebookAccountRepository.Result

export class PostgresUserAccountRepository implements LoadUserAccountRepository, SaveFacebookAccountRepository {
  private readonly pgUserRepo = getRepository(PgUser)

  async load ({ email }: LoadParams): Promise<LoadResult> {
    const pgUser = await this.pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser?.id.toString(),
        name: pgUser?.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: SaveParams): Promise<SaveResult> {
    let ResultId: string
    if (id === undefined) {
      const pgUser = await this.pgUserRepo.save({ email, name, facebookId })
      ResultId = pgUser.id.toString()
    } else {
      ResultId = id
      await this.pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
    return { id: ResultId }
  }
}
