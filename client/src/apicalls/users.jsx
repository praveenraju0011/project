import { axiosInstance } from ".";

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("http://localhost:9000/api/users/register", payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("http://localhost:9000/api/users/login", payload);
    return response.data;
  } catch (error) {
    return error;
  }
};
