import axios from "axios";

const path = process.env.REACT_APP_BACKEND_URL;

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
};

export const getUserById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${path}/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
};
export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${path}/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
};

export const updateUserInfo = async (newData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(`${path}/users/${newData.id}`, newData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response);
  return response.data;
};
export const updateUserPassword = async (newData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${path}/users/${newData.id}/password`,
    newData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(response);
  return response.data;
};
