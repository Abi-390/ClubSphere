import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTH SERVICES ============

export const authService = {
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await API.get('/auth/current');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  },
};

// ============ CLUB SERVICES ============

export const clubService = {
  createClub: async (clubData) => {
    const response = await API.post('/clubs', clubData);
    return response.data;
  },

  searchClubs: async (query) => {
    const response = await API.get(`/clubs/search?q=${query}`);
    return response.data;
  },

  getClubById: async (clubId) => {
    const response = await API.get(`/clubs/${clubId}`);
    return response.data;
  },

  updateClub: async (clubId, clubData) => {
    const response = await API.put(`/clubs/${clubId}`, clubData);
    return response.data;
  },

  deleteClub: async (clubId) => {
    const response = await API.delete(`/clubs/${clubId}`);
    return response.data;
  },

  getAllClubs: async () => {
    const response = await API.get('/clubs');
    return response.data;
  },
};

// ============ EVENT SERVICES ============

export const eventService = {
  createEvent: async (eventData) => {
    const response = await API.post('/events', eventData);
    return response.data;
  },

  getAllEvents: async () => {
    const response = await API.get('/events');
    return response.data;
  },

  getEventById: async (eventId) => {
    const response = await API.get(`/events/${eventId}`);
    return response.data;
  },

  updateEvent: async (eventId, eventData) => {
    const response = await API.put(`/events/${eventId}`, eventData);
    return response.data;
  },

  deleteEvent: async (eventId) => {
    const response = await API.delete(`/events/${eventId}`);
    return response.data;
  },

  getEventsByClub: async (clubId) => {
    const response = await API.get(`/events/club/${clubId}`);
    return response.data;
  },
};

// ============ DISCUSSION SERVICES ============

export const discussionService = {
  createDiscussion: async (discussionData) => {
    const response = await API.post('/discussions', discussionData);
    return response.data;
  },

  getDiscussionsByClub: async (clubId) => {
    const response = await API.get(`/discussions/club/${clubId}`);
    return response.data;
  },

  getDiscussionById: async (discussionId) => {
    const response = await API.get(`/discussions/${discussionId}`);
    return response.data;
  },

  updateDiscussion: async (discussionId, discussionData) => {
    const response = await API.put(`/discussions/${discussionId}`, discussionData);
    return response.data;
  },

  deleteDiscussion: async (discussionId) => {
    const response = await API.delete(`/discussions/${discussionId}`);
    return response.data;
  },

  createReply: async (replyData) => {
    const response = await API.post('/discussions/reply', replyData);
    return response.data;
  },

  getRepliesByParent: async (parentId) => {
    const response = await API.get(`/discussions/replies/${parentId}`);
    return response.data;
  },
};

// ============ HELPER FUNCTIONS ============

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export default API;