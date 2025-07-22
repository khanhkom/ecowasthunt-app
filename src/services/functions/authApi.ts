import { post } from '../api';

// Đăng ký tài khoản
export const register = async (data: {
  mail: string;
  password: string;
  userName: string;
}) => {
  return post('/authentication', data);
};

// Đăng nhập
export const login = async (data: { password: string; userName: string }) => {
  return post('/authentication/createSession', data);
};
