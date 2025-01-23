import express from "express"
import userRouter from "./routes/userRoutes"
import {attmeptConnectionToDatabase} from "./utils/utils"
import cors,{ CorsOptions } from "cors"

const app = express()
const port = 3001

const corsOptions : CorsOptions = {
    origin : 'http://localhost:5173'
}
app.use(cors(corsOptions))

app.use(express.json());
attmeptConnectionToDatabase()
app.use("/users",userRouter)

app.listen(port ,() => {
    console.log(`running on ${port}`);
    
})

