import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API - User
export const authAPI = {
  signup: async (userData) => {
    const response = await apiClient.post('/user/signup', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  signin: async (credentials) => {
    const response = await apiClient.post('/user/signin', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      if (!user || user === 'undefined' || user === 'null') return null;
      return JSON.parse(user);
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// Courses API
export const coursesAPI = {
  // Get all courses (preview)
  getPreview: async () => {
    const response = await apiClient.get('/course/preview');
    return response.data;
  },

  // Purchase a course
  purchase: async (courseId) => {
    const response = await apiClient.post('/course/purchase', { courseID: courseId });
    return response.data;
  },

  // Get user's purchased courses — normalize to { courses: [...] }
  getPurchased: async () => {
    const response = await apiClient.get('/user/purchases');
    return { courses: response.data.courseData || [] };
  },
};

// Admin Auth API
export const adminAuthAPI = {
  signup: async (adminData) => {
    const response = await apiClient.post('/admin/signup', adminData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ ...response.data.admin, role: 'admin' }));
    }
    return response.data;
  },

  signin: async (credentials) => {
    const response = await apiClient.post('/admin/signin', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ ...response.data.admin, role: 'admin' }));
    }
    return response.data;
  },
};

// Admin Courses API
export const adminCoursesAPI = {
  // Get all courses (bulk)
  getBulk: async () => {
    const response = await apiClient.get('/admin/course/bulk');
    return response.data;
  },

  // Create a course
  create: async (courseData) => {
    const response = await apiClient.post('/admin/course', courseData);
    return response.data;
  },

  // Update a course — backend expects courseID (capital ID)
  update: async (courseId, courseData) => {
    const response = await apiClient.put('/admin/course', { courseID: courseId, ...courseData });
    return response.data;
  },
};

export default apiClient;
