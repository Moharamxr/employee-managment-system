import axios from "axios";

const path = "https://abo-abdallah.onrender.com";

export const login = async (eMail, Password) => {
  try {
    const formData = new FormData();
    formData.append("email", eMail);
    formData.append("password", Password);

    const response = await axios.post(
      `${path}/auth/login`,
      {
        "email": eMail,
        "password":Password,
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
