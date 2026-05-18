import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const uploadReportFiles = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export const fetchReportHistory = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/report-history"
  );

  return response.data;
};
export const fetchDashboardStats = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/dashboard-stats"
  );

  return response.data;
};