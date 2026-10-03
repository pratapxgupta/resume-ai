require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/database")
const port = process.env.PORT || 3000

async function startServer() {
  await connectDB()

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Server startup failed:", error.message)
    process.exitCode = 1
  })
}

module.exports = app
