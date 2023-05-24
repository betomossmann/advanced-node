import { makeFacebookAuthentication } from '@/main/factories/usecases'
import { FacebookLoginController } from '@/application/controllers'

export const makeFacebookLoginController = (): FacebookLoginController => {
  return new FacebookLoginController(makeFacebookAuthentication())
}
