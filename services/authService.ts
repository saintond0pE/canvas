
import { User } from '../types';

// Mock user for demonstration
const MOCK_USER: User = {
  id: 'u_123',
  name: 'Creative User',
  email: 'user@canvas.ai',
  avatar: 'https://ui-avatars.com/api/?name=Creative+User&background=8B5CF6&color=fff',
};

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate network delay for backend call (e.g. Google Gemini / Antigravity Auth)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve(MOCK_USER);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const register = async (name: string, email: string, password: string): Promise<User> => {
  // Simulate network delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password && name) {
        resolve({ ...MOCK_USER, name });
      } else {
        reject(new Error('Invalid registration data'));
      }
    }, 1000);
  });
};

export const logout = async (): Promise<void> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};
