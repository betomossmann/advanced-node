import './config/module-alias'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

createConnection()
  .then(() =>
    app.listen(env.port, () =>
      console.log(`Server listening at http://localhost:${env.port}`)))
  .catch(console.error)
