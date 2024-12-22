import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081/rcc/api/v1',
  timeout: 10000,
});

export const getAnnouncements = async () => {
  const response = await apiClient.get('/announcement/list');
  return response.data;
};
