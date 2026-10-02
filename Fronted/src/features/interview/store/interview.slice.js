import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
} from "../services/interview.api";

const message = (error, fallback) => error.response?.data?.message || fallback;

export const generateReport = createAsyncThunk(
  "interview/generateReport",
  async (details, { rejectWithValue }) => {
    try {
      const data = await generateInterviewReport(details);
      return data.interviewReport;
    } catch (error) {
      return rejectWithValue(
        message(error, "Could not generate the interview plan."),
      );
    }
  },
);

export const fetchReportById = createAsyncThunk(
  "interview/fetchReportById",
  async (interviewId, { rejectWithValue }) => {
    try {
      const data = await getInterviewReportById(interviewId);
      return data.interviewReport;
    } catch (error) {
      return rejectWithValue(
        message(error, "Could not load this interview report."),
      );
    }
  },
);

export const fetchReports = createAsyncThunk(
  "interview/fetchReports",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllInterviewReports();
      return data.interviewReports;
    } catch (error) {
      return rejectWithValue(
        message(error, "Could not load interview reports."),
      );
    }
  },
);

const initialState = { report: null, reports: [], status: "idle", error: null };
const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    clearInterviewError: (state) => {
      state.error = null;
    },
    clearCurrentReport: (state) => {
      state.report = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportById.pending, (state) => {
        state.report = null;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.report = action.payload;
      })
      .addCase(fetchReportById.fulfilled, (state, action) => {
        state.report = action.payload;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.reports = action.payload;
      })
      .addMatcher(
        isAnyOf(
          generateReport.pending,
          fetchReportById.pending,
          fetchReports.pending,
        ),
        (state) => {
          state.status = "loading";
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          generateReport.fulfilled,
          fetchReportById.fulfilled,
          fetchReports.fulfilled,
        ),
        (state) => {
          state.status = "succeeded";
        },
      )
      .addMatcher(
        isAnyOf(
          generateReport.rejected,
          fetchReportById.rejected,
          fetchReports.rejected,
        ),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload || action.error.message;
        },
      );
  },
});

export const { clearInterviewError, clearCurrentReport } =
  interviewSlice.actions;
export const selectInterview = (state) => state.interview;
export default interviewSlice.reducer;
