import axios from 'axios';

const API_URL = 'https://rps-backend-ro2g.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (data) => api.post('/api/auth/signup', data),
  login: (data) => api.post('/api/auth/login', data),
  getMe: () => api.get('/api/auth/me'),
};

export const gameAPI = {
  makeChoice: (matchId, roundId, choice) =>
    api.post(`/api/game/match/${matchId}/round/${roundId}/choice`, { choice }),
};

export const tournamentAPI = {
  createTournament: (name) => api.post('/api/tournament/create', { name }),
  getActiveTournaments: () => api.get('/api/tournament/active'),
  joinTournament: (id) => api.post(`/api/tournament/${id}/join`),
  getBracket: (id) => api.get(`/api/tournament/${id}/bracket`),
};

export default api;
