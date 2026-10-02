const { PDFParse } = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterviewReportController(req,res){
    if (!req.file) {
        return res.status(400).json({ message: "A PDF resume is required." })
    }

    const parser = new PDFParse({ data: req.file.buffer })
    const parsedResume = await parser.getText()
    await parser.destroy()
    const resumeContent = parsedResume.text
    const{selfDescription, jobDescription} = req.body
    
    const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message:"Interview report generated successfully .",
        interviewReport
    })
    
}
/**
 * @description Controller to get interview report by interviewId.
 * 
 */
async function generateInterviewReportByIdController(req,res){
const {interviewId} = req.params

const interviewReport = await interviewReportModel.findOne({
    _id:interviewId,
    user:req.user.id
})
if(!interviewReport){
    return res.status(404).json({
        message:"Interview report not found"
    })
}

res.status(200).json({
    message:"Interview report fetched successfully.",
    interviewReport
})

}

/**
 * @description Controller to get interview reports of logged in user
 */

async function getAllInterviewReportController(req,res){
const interviewReports = await  interviewReportModel.find({
    user:req.user.id
}).sort({
    createdAt:-1
}).select(
    "-resume -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestions -strategicAdvice -skillGaps -preparationPlan"
)

res.status(200).json({
    message:"Interview reports fetched successfully.",
    interviewReports
})
}

module.exports = {generateInterviewReportController,generateInterviewReportByIdController,getAllInterviewReportController}
