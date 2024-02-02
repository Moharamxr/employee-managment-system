import axios from "axios";

const path = "https://abo-abdallah.onrender.com";

export const addFinancial = async (newData) => {
  try {
    const token = localStorage.getItem("token");

    const requestBody = {
      id: newData.id,
      type: newData.type,
      amount: newData.amount,
    };

    const response = await axios.post(
      `${path}/financials/${newData.id}`,
      requestBody,
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

export const payroll = async (newData) => {
  try {
    const token = localStorage.getItem("token");

    const requestBody = {
      payedAmount: newData.payedAmount,
    };

    const response = await axios.post(
      `${path}/financials/payroll/${newData.id}`,
      requestBody,
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
