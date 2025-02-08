import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const uploadXML = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return await axios.post(`${API_URL}/upload`, formData);
};

export const fetchReports = async () => {
  return await axios.get(`${API_URL}/getReports`);
};
