import axios from "axios";

const path = process.env.REACT_APP_BACKEND_URL;

export const getShiftById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${path}/shifts/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Shift by ID fetched successfully");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    // console.error(error.response.data.error);
  }
};
export const getShiftByEmployeeId = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${path}/shifts/employees/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Shifts by Employee ID fetched successfully");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    // console.error(error.response.data.error);
    if (error.response.status === 401) {
      localStorage.setItem("token", "");
      localStorage.setItem("isLoggedIn", false);
    }
  }
};
export const getShiftsFinancial = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${path}/shifts/financials/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Financial of Shifts by Employee ID fetched successfully");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    // console.error(error.response.data.error);
    if (error.response.status === 401) {
      localStorage.setItem("token", "");
      localStorage.setItem("isLoggedIn", false);
    }
  }
};

export const addShift = async (newData) => {
  const token = localStorage.getItem("token");

  const requestBody = {
    date: newData.date,
    time: newData.time,
    location: newData.location,
  };
// console.log(requestBody);
  const response = await axios.post(
    `${path}/shifts/${newData.id}`,
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // console.log(response.data.message);
  return response.data;
};
export const deleteShift = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${path}/shifts/${id}`,

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
    if (error.response.status === 401) {
      localStorage.setItem("token", "");
      localStorage.setItem("isLoggedIn", false);
    }
  }
};
