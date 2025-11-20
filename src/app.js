import express from "express"
import cors from "cors"

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//importing routes
import router from "./routes/route.js";
app.use("/api/link",router)

export {app}