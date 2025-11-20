import express from "express"
import cors from "cors"

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json());

//importing routes
import healthCheckRouter from "./routes/healthCheck.routes.js"
import linkRouter from "./routes/link.routes.js"
app.use("/api",healthCheckRouter)
app.use("/api",linkRouter)

export {app}