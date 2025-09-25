import axios from 'axios';
import type { User, Agent } from '@/types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/login', { email, password });
    return {
      user: {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
      },
      token: response.data.token,
    };
  },
};

export const agentAPI = {
  getAll: async (): Promise<Agent[]> => {
    const response = await api.get('/agents');
    return response.data;
  },
  create: async (agent: { name: string; email: string; mobile: string; password: string }): Promise<Agent> => {
    const response = await api.post('/agents', agent);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/agents/${id}`);
  },
};

export const uploadAPI = {
  uploadCSV: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const dashboardAPI = {
  getStats: async (): Promise<{ totalAgents: number; totalUploads: number; totalRecords: number }> => {
    const response = await api.get('/dashboard');
    return response.data;
  },
};
