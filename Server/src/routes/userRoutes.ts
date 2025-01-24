import { Router } from "express"
import { UserController } from "../controllers/userController";
import {authenticateTokenFromHeader, extractCookiesAndInsertIntoHeader, validateDtoToken, validateDtoUser} from "../utils/middleware"
import {genNewToken}  from "../controllers/tokenController"

const router = Router();
const userController = new UserController()


router.get("/hi/:name" , extractCookiesAndInsertIntoHeader ,authenticateTokenFromHeader ,userController.getHellowWorld)
router.post("/register" ,validateDtoUser ,userController.createUser)
router.post('/login' , validateDtoUser , userController.logInUser )
router.post('/token', validateDtoToken, genNewToken)


export default router;