import express from "express"
import userRouter from "./routes/userRoutes"
import {attmeptConnectionToDatabase} from "./utils/utils"
import cors,{ CorsOptions } from "cors"
import cookieParser from "cookie-parser"

const app = express()
const port = 3001

const corsOptions : CorsOptions = {
    origin : 'http://localhost:5173',
    credentials : true
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())

attmeptConnectionToDatabase()
app.use("/users",userRouter)

app.listen(port ,() => {
    console.log(`running on ${port}`);
    
})

