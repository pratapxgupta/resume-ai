import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReportById,
  fetchReports,
  generateReport as generateReportThunk,
  selectInterview,
} from "../store/interview.slice";

export const useInterview = () => {
  const dispatch = useDispatch();
  const { report, reports, status, error } = useSelector(selectInterview);
  const generateReport = useCallback(
    (details) => dispatch(generateReportThunk(details)).unwrap(),
    [dispatch],
  );
  const getReportById = useCallback(
    (interviewId) => dispatch(fetchReportById(interviewId)).unwrap(),
    [dispatch],
  );
  const getReports = useCallback(
    () => dispatch(fetchReports()).unwrap(),
    [dispatch],
  );
  return {
    loading: status === "loading",
    report,
    reports,
    error,
    generateReport,
    getReportById,
    getReports,
  };
};
