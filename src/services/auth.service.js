import axios from "axios";

const path = "https://abo-abdallah.onrender.com";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${path}/auth/login`,
      {
        "email": email,
        "password":password,
    },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Login successful");

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("isLoggedIn", true);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const logout = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${path}/auth/logout`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error(error);
    console.error(error.response.data.error);
    
  }
};