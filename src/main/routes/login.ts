import { makeFacebookLoginController } from '@/main/factories/controller'
import { adaptExpressRoute } from '@/infra/http'
import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/api/login/facebook', adaptExpressRoute(makeFacebookLoginController()))
}
