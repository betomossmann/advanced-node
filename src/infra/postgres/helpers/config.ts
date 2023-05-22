import { type ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'motty.db.elephantsql.com',
  port: 5432,
  username: 'thvzgwnc',
  password: 'OVn5Xz-TjUpUF6Epgdzyrz4loalDMTv7',
  database: 'thvzgwnc',
  entities: ['dist/infra/postgres/entities/index.js']
}
