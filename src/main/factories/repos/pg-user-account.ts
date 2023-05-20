import { PostgresUserAccountRepository } from '@/infra/postgres/repos'

export const makePgUserAccountRepo = (): PostgresUserAccountRepository => {
  return new PostgresUserAccountRepository()
}
