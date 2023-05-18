import { PostgresUserAccountRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'
import { type Repository, getRepository, getConnection } from 'typeorm'
import { type IBackup, newDb, type IMemoryDb } from 'pg-mem'

const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/postgres/entities/index.ts']
  })
  await connection.synchronize()
  return db
}

describe('PostgresUserAccountRepository', () => {
  describe('load', () => {
    let sut: PostgresUserAccountRepository
    let pgUserRepo: Repository<PgUser>
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
      pgUserRepo = getRepository(PgUser)
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      backup.restore()
      sut = new PostgresUserAccountRepository()
    })

    it('Should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'existing_email' })

      const account = await sut.load({ email: 'existing_email' })

      expect(account).toEqual({ id: '1' })
    })

    it('Should return undefined if email does not exists', async () => {
      const sut = new PostgresUserAccountRepository()

      const account = await sut.load({ email: 'new_email' })

      expect(account).toBeUndefined()
    })
  })
})
