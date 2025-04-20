import axios from 'axios';

// Fix: Use import.meta.env instead of process.env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Authentication Service
 * 
 * Handles all API calls related to user authentication, including:
 * - Login/logout
 * - Registration
 * - Password management
 * - Token handling
 * - Current user data
 */
class AuthService {
  /**
   * Get auth token from local storage
   * @returns {string|null} The stored auth token or null
   */
  getToken() {
    return localStorage.getItem('auth_token');
  }
  
  /**
   * Save auth token to local storage
   * @param {string} token - JWT auth token
   */
  setToken(token) {
    localStorage.setItem('auth_token', token);
  }
  
  /**
   * Remove auth token from local storage
   */
  removeToken() {
    localStorage.removeItem('auth_token');
  }
  
  /**
   * Set axios auth header with token
   * @param {string} token - JWT auth token
   */
  setAuthHeader(token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }
  
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} API response with user data and token
   */
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      
      if (token) {
        this.setToken(token);
        this.setAuthHeader(token);
      }
      
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise} API response with user data
   */
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  /**
   * Logout user
   */
  logout() {
    this.removeToken();
    this.setAuthHeader(null);
  }
  
  /**
   * Get current authenticated user data
   * @returns {Promise} API response with user data
   */
  async getCurrentUser() {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      this.setAuthHeader(token);
      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  /**
   * Send password reset request
   * @param {string} email - User email
   * @returns {Promise} API response
   */
  async forgotPassword(email) {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   * @returns {Promise} API response
   */
  async resetPassword(token, newPassword) {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        token,
        newPassword
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  /**
   * Update user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise} API response
   */
  async updatePassword(currentPassword, newPassword) {
    try {
      const response = await axios.put(`${API_URL}/auth/password`, {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  /**
   * Check if user is authenticated (has valid token)
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    
    // Simple token expiration check (not a full validation)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Handle errors from API calls
   * @param {Error} error - Error object
   */
  handleError(error) {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      this.removeToken();
      this.setAuthHeader(null);
    }
    
    // Additional error handling as needed
    console.error('Auth service error:', error.response?.data || error.message);
  }
}

export default new AuthService();