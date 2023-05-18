import { type LoadUserAccountRepository } from '@/data/contracts/repos'
import { Column, Entity, PrimaryGeneratedColumn, type Repository, getRepository, getConnection } from 'typeorm'
import { type IBackup, newDb } from 'pg-mem'

class PostgresUserAccountRepository implements LoadUserAccountRepository {
  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email: params.email })
    if (pgUser !== undefined) {
      return {
        id: pgUser?.id.toString(),
        name: pgUser?.name ?? undefined
      }
    }
  }
}

@Entity({ name: 'usuarios' })
class PgUser {
  @PrimaryGeneratedColumn()
    id!: number

  @Column({ name: 'nome', nullable: true })
    name?: string

  @Column()
    email!: string

  @Column({ name: 'id_facebook', nullable: true })
    facebookId?: string
}

describe('PostgresUserAccountRepository', () => {
  describe('load', () => {
    let sut: PostgresUserAccountRepository
    let pgUserRepo: Repository<PgUser>
    let backup: IBackup

    beforeAll(async () => {
      const db = newDb()
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PgUser]
      })
      await connection.synchronize()
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
