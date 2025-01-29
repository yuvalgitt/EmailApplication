import { Router } from "express"
import { UserController } from "../controllers/userController";
import {authenticateTokenFromHeader, extractCookiesAndInsertIntoHeader, validateDtoToken, validateDtoUser} from "../utils/middleware"
import {genNewToken}  from "../controllers/tokenController"

const router = Router();
const userController = new UserController()


router.get('/api/sessions/oauth/google', userController.googleOAuth)
router.get('/api/gmail/inbox', userController.getGmailInbox)
router.get('/api/gmail/message/:id', userController.getMessageData)

//  ONLY TOKEN RELATED ROUTES   ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
router.post("/register" ,validateDtoUser ,userController.createUser)
router.post('/login' , validateDtoUser , userController.logInUser )
router.post('/token', validateDtoToken, genNewToken)


export default router;