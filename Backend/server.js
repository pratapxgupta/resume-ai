require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/database")
const {resume, selfDescription, jobDescription} = require("./src/services/temp")

const  generateInterviewReport= require("./src/services/ai.service")

connectDB()
//   generateInterviewReport({
//  resume,selfDescription,jobDescription
// })
const port = process.env.PORT || 3000

if (require.main === module) {
  app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
  })
}

module.exports = app
