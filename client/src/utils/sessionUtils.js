// Simple session management using localStorage

export const createUserSession = (userData) => {
  localStorage.setItem('currentUser', JSON.stringify(userData));
  localStorage.setItem('isAuthenticated', 'true');
};

export const destroyUserSession = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isAuthenticated');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};