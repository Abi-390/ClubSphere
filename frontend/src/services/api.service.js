import axios from 'axios';

// Base API configuration - Backend runs on port 3000 with /api prefix
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
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============ AUTH SERVICES ============
// Base route: /api/auth
// Routes: POST /register, POST /login, GET /me, POST /logout

export const authService = {
  // POST /api/auth/register
  register: async (userData) => {
    try {
      const response = await API.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // POST /api/auth/login
  login: async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET /api/auth/me (protected)
  getCurrentUser: async () => {
    try {
      const response = await API.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // POST /api/auth/logout (protected)
  logout: async () => {
    try {
      await API.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  },
};

// ============ CLUB SERVICES ============
// Base route: /api/clubs
// Routes: POST /, GET /, GET /:id, PUT /:id, DELETE /:id

export const clubService = {
  // POST /api/clubs (protected)
  createClub: async (clubData) => {
    try {
      const response = await API.post('/clubs', clubData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET /api/clubs (public)
  getAllClubs: async () => {
    try {
      const response = await API.get('/clubs');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET /api/clubs/:id (public)
  getClubById: async (clubId) => {
    try {
      const response = await API.get(`/clubs/${clubId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // PUT /api/clubs/:id (protected)
  updateClub: async (clubId, clubData) => {
    try {
      const response = await API.put(`/clubs/${clubId}`, clubData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // DELETE /api/clubs/:id (protected)
  deleteClub: async (clubId) => {
    try {
      const response = await API.delete(`/clubs/${clubId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// ============ EVENT SERVICES ============
// Base route: /api/events
// Routes: POST /create, GET /get, GET /eventbyid/:id, PUT /update/:id, DELETE /delete/:id

export const eventService = {
  // POST /api/events/create (protected)
  createEvent: async (eventData) => {
    try {
      const response = await API.post('/events/create', eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET /api/events/get (protected)
  getAllEvents: async () => {
    try {
      const response = await API.get('/events/get');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET /api/events/eventbyid/:id (protected)
  getEventById: async (eventId) => {
    try {
      const response = await API.get(`/events/eventbyid/${eventId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // PUT /api/events/update/:id (protected)
  updateEvent: async (eventId, eventData) => {
    try {
      const response = await API.put(`/events/update/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // DELETE /api/events/delete/:id (protected)
  deleteEvent: async (eventId) => {
    try {
      const response = await API.delete(`/events/delete/${eventId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// ============ DISCUSSION SERVICES ============
// Base route: /api/discussions
// Routes: POST /creatediscussion, POST /replytodiscussion/:id, GET /getdiscussions/:clubId,
//         GET /getreplies/:id, GET /getdiscussionbyid/:id, PUT /updatediscussion/:id,
//         DELETE /deletediscussion/:id

export const discussionService = {
  // POST /api/discussions/creatediscussion (protected)
  createDiscussion: async (discussionData) => {
    try {
      const response = await API.post('/discussions/creatediscussion', discussionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // POST /api/discussions/replytodiscussion/:id (protected)
  replyToDiscussion: async (discussionId, replyData) => {
    try {
      const response = await API.post(`/discussions/replytodiscussion/${discussionId}`, replyData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET /api/discussions/getdiscussions/:clubId (protected)
  getDiscussionsByClub: async (clubId) => {
    try {
      const response = await API.get(`/discussions/getdiscussions/${clubId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET /api/discussions/getreplies/:id (protected)
  getReplies: async (discussionId) => {
    try {
      const response = await API.get(`/discussions/getreplies/${discussionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // GET /api/discussions/getdiscussionbyid/:id (protected)
  getDiscussionById: async (discussionId) => {
    try {
      const response = await API.get(`/discussions/getdiscussionbyid/${discussionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // PUT /api/discussions/updatediscussion/:id (protected)
  updateDiscussion: async (discussionId, discussionData) => {
    try {
      const response = await API.put(`/discussions/updatediscussion/${discussionId}`, discussionData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // DELETE /api/discussions/deletediscussion/:id (protected)
  deleteDiscussion: async (discussionId) => {
    try {
      const response = await API.delete(`/discussions/deletediscussion/${discussionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// ============ HELPER FUNCTIONS ============

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const getCurrentUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export default API;