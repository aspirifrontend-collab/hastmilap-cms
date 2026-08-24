import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000/api`,
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

const CONTENT_RETRY_ATTEMPTS = 4;
const CONTENT_RETRY_DELAY_MS = 1500;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// The backend/DB can be slow to respond on the very first request after a
// cold start, so a single failed attempt shouldn't leave the page empty —
// retry a few times with backoff before giving up.
export async function fetchContentWithRetry() {
  let lastError;
  for (let attempt = 1; attempt <= CONTENT_RETRY_ATTEMPTS; attempt++) {
    try {
      const res = await api.get('/content');
      return res.data;
    } catch (err) {
      lastError = err;
      if (attempt < CONTENT_RETRY_ATTEMPTS) {
        await delay(CONTENT_RETRY_DELAY_MS * attempt);
      }
    }
  }
  throw lastError;
}

export default api;
