const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
  apiKey: process.env.Google_GenAI_API_KEY,
});

const interviewReportJsonSchema = {
  type: "object",
  properties: {
    technicalQuestions: {
      type: "array",
      description:
        "Technical questions that can be asked in an interview along with their intention and how to answer them.",
      items: {
        type: "object",
        properties: {
          questions: {
            type: "string",
            description: "The technical question that can be asked in an interview",
          },
          intention: {
            type: "string",
            description: "The intention of interviewer behind asking this question",
          },
          answer: {
            type: "string",
            description:
              "How to answer this question, what points to cover, what approach to take etc.",
          },
        },
        required: ["questions", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: "array",
      description:
        "Behavioral questions that can be asked in an interview along with their intention and how to answer them.",
      items: {
        type: "object",
        properties: {
          questions: {
            type: "string",
            description: "The behavioral question that can be asked in an interview",
          },
          intention: {
            type: "string",
            description: "The intention of interviewer behind asking this question",
          },
          answer: {
            type: "string",
            description:
              "How to answer this question, what points to cover, what approach to take etc.",
          },
        },
        required: ["questions", "intention", "answer"],
      },
    },
    skillGaps: {
      type: "array",
      description:
        "List of skill gaps in the candidate's profile along with their severity",
      items: {
        type: "object",
        properties: {
          skill: {
            type: "string",
            description: "The skill which candidate is lacking",
          },
          severity: {
            type: "string",
            enum: ["low", "medium", "high"],
            description:
              "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: "array",
      description:
        "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
      items: {
        type: "object",
        properties: {
          day: {
            type: "integer",
            minimum: 1,
            description: "The day number in the preparation plan, starting from 1",
          },
          focus: {
            type: "string",
            description:
              "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          },
          tasks: {
            type: "array",
            items: { type: "string" },
            description:
              "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
    title: {
      type: "string",
      description:
        "The title of the job for which the interview report is generated",
    },
    matchScore: {
      type: "number",
      minimum: 0,
      maximum: 100,
    },
  },
  required: [
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
    "title",
    "matchScore",
  ],
};

const interviewReportSchema = z.fromJSONSchema(interviewReportJsonSchema);

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  console.log("\n========== INTERVIEW REPORT REQUEST ==========");
  console.log("\n--- Resume ---\n", resume);
  console.log("\n--- Self Description ---\n", selfDescription);
  console.log("\n--- Job Description ---\n", jobDescription);

  const prompt = `
Generate a detailed interview preparation report for the candidate using the
resume, self-description, and job description provided below.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: interviewReportJsonSchema,
    },
  });

  const parsedResponse = JSON.parse(interaction.output_text);
  const interviewReport = interviewReportSchema.parse(parsedResponse);

  console.log("\n========== GENERATED INTERVIEW REPORT ==========");
  console.log(JSON.stringify(interviewReport, null, 2));
  console.log("================================================\n");

  return interviewReport;
}

module.exports = generateInterviewReport;
