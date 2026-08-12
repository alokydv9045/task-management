import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

// We can add interceptors here later if we need to auto-inject the token,
// but for now, we'll let Zustand handle the token logic.

export default api;
