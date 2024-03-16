import axios from "axios";

const path = process.env.REACT_APP_BACKEND_URL;

export const login = async (email, password) => {
  const response = await axios.post(
    `${path}/auth/login`,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // console.log("Login successful");

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("role", response.data.user.role);
  localStorage.setItem("username", response.data.user.username);
  // console.log(response.data)
  return response.data;
};

export const logout = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${path}/auth/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log(response.data.message);
    return response.data;
  } catch (error) {
    // console.error(error);
    // console.error(error.response.data.error);
  }
};
