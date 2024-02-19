import { axiosInstance } from ".";

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:9000/api/users/register",
      payload
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "http://localhost:9000/api/users/login",
      payload
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:9000/api/users/currentUser"
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const AllUsers = async () => {
  try {
    const response = await axiosInstance.get(
      "http://localhost:9000/api/users/dashboard"
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const UpdateUser = async (userId, payload) => {
  try {
    const response = await axiosInstance.patch(
      `http://localhost:9000/api/users/block/${userId}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
