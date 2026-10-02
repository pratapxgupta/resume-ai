const mongoose = require("mongoose");
const { Schema, model } = mongoose;
/**
 * job description
 * resume text
 * self description
 *
 * matchScore:number
 * Technical questions [
 * {
 * questions:"",
 * intention:"",
 * answer:"",
 * }
 * ]
 * behavioral question[
 * * {
 * questions:"",
 * intention:"",
 * answer:"",
 * }]
 * skill gaps[
 * {skill : "",
 * severity:{
 * type:String,
 * enum:["low","medium","high"]
 * }
 * }
 * ]
 * preparation plan[
 * {
 * day:Number,
 * focus:String,
 * tasks:String
 * }]
 */

const technicalQuestionsSchema = new Schema(
  {
    questions: {
      type: String,
      required: [true, "Technical question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const behavioralQuestionSchema = new Schema(
  {
    questions: {
      type: String,
      required: [true, "Behavioral question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const skillsGapSchema = new Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  {
    _id: false,
  },
);

const preparationPlanSchema = new Schema(
  {
    day: {
      type: Number,
      min: 1,
      required: [true, "Day is required"],
    },
    focus: {
      type: String,
      required: [true, "Focus is required"],
    },
    tasks: {
      type: [String],
      required: [true, "At least one task is required"],
      validate: {
        validator: (tasks) => tasks.length > 0,
        message: "At least one task is required",
      },
    },
  },
  { _id: false },
);

const interviewReportSchema = new Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillsGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
    },
  },
  {
    timestamps: true,
  },
);

const interviewReportModel = model("InterviewReport", interviewReportSchema);
module.exports = interviewReportModel;
