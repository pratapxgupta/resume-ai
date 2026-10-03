const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const connectDB = require("./config/database")


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

app.use(async (req, res, next) => {
    try {
        await connectDB()
        next()
    } catch (error) {
        error.status = 503
        error.code = "DATABASE_UNAVAILABLE"
        next(error)
    }
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/*using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.use((req, res) => {
    res.status(404).json({
        message: "API endpoint not found.",
        code: "NOT_FOUND"
    })
})

app.use((err, req, res, _next) => {
    console.error(`${req.method} ${req.originalUrl} failed:`, err)

    let status = Number.isInteger(err.status) ? err.status : 500
    let code = err.code || "INTERNAL_SERVER_ERROR"
    let message = "The server could not complete the request. Please try again later."

    if (err.message === "Origin is not allowed by CORS") {
        status = 403
        code = "CORS_ORIGIN_DENIED"
        message = "This website is not allowed to access the API."
    } else if (err.message === "Malformed part header") {
        status = 400
        code = "MALFORMED_MULTIPART_REQUEST"
        message = "Malformed multipart request. Let the browser set the upload Content-Type boundary."
    } else if (err.type === "entity.parse.failed") {
        status = 400
        code = "INVALID_JSON"
        message = "The request body contains invalid JSON."
    } else if (err.name === "MulterError") {
        status = 400
        code = err.code
        message = err.code === "LIMIT_FILE_SIZE"
            ? "The uploaded file exceeds the 3 MB limit."
            : "The file upload could not be processed."
    } else if (err.name === "ValidationError") {
        status = 400
        code = "VALIDATION_ERROR"
        message = Object.values(err.errors)
            .map((validationError) => validationError.message)
            .join(" ")
    } else if (err.code === 11000) {
        const duplicateField = Object.keys(err.keyPattern || err.keyValue || {})[0]
        status = 409
        code = "DUPLICATE_VALUE"
        message = duplicateField
            ? `An account with that ${duplicateField} already exists.`
            : "An account with those details already exists."
    } else if (err.name === "CastError") {
        status = 400
        code = "INVALID_IDENTIFIER"
        message = "The supplied identifier is invalid."
    } else if (
        err.code === "DATABASE_UNAVAILABLE" ||
        ["MongooseServerSelectionError", "MongoNetworkError"].includes(err.name)
    ) {
        status = 503
        code = "DATABASE_UNAVAILABLE"
        message = "Database connection is unavailable. Check the backend database configuration and try again."
    } else if (status < 500 && err.message) {
        message = err.message
    }

    res.status(status).json({ message, code })
})

module.exports = app
