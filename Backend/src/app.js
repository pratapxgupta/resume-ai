const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")


const app = express()

const allowedOrigins = [
    "http://localhost:5173",
    ...(process.env.FRONTEND_URL || "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
]

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error("Origin is not allowed by CORS"))
    },
    credentials:true
}))

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})
/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/*using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.use((err, req, res, next) => {
    if (err.message === "Malformed part header") {
        return res.status(400).json({
            message: "Malformed multipart request. Do not set the Content-Type header manually; let the client add the multipart boundary."
        })
    }

    next(err)
})

module.exports = app
