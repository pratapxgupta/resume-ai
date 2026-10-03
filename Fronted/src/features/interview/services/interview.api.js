import axios from "axios";


const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
withCredentials:true,
})
/**
 * @description
 * Service to generate an interview report based on the user's self-description, resume file, and job description.
 * This function sends a POST request with form data (multipart/form-data) containing the required fields.
 * @param {Object} params - Parameters for generating the interview report.
 * @param {string} params.jobDescription - The job description.
 * @param {string} params.selfDescription - The user's self-description.
 * @param {File} params.resume - The resume file (PDF).
 * @returns {Promise<Object>} The generated interview report data.
 */
export const generateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resume
}) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resume);

    const response = await api.post("/api/interview", formData);
    return response.data;
};

/**
 * @description
 * Service to fetch a specific interview report by the provided interviewId.
 * Sends a GET request to retrieve the interview report from the backend.
 * @param {string} interviewId - ID of the interview report.
 * @returns {Promise<Object>} The requested interview report data.
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
};

/**
 * @description
 * Service to fetch all interview reports for the logged-in user.
 * Sends a GET request to retrieve the list of interview reports.
 * @returns {Promise<Object>} The interview reports data.
 */
export const getAllInterviewReports = async () => {
    const response = await api.get(`/api/interview`);
    return response.data;
};
