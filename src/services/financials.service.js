import axios from "axios";

const path = "https://abo-abdallah.onrender.com";

export const addLoan = async (newData) => {
    try {
      const token = localStorage.getItem("token");
  
      const requestBody = {
        id: newData.id,
        type: newData.type,
        amount: newData.amount,
      };
  
      const response = await axios.post(`${path}/financials/${newData.id}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      console.error(error);
      console.error(error.response.data.error);
      
    }
  };
  
export const addDeductions = async (newData) => {
    try {
      const token = localStorage.getItem("token");
  
      const requestBody = {
        id: newData.id,
        type: newData.type,
        amount: newData.amount,
      };
  
      const response = await axios.post(`${path}/financials/${newData.id}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      console.error(error);
      console.error(error.response.data.error);
      
    }
  };
  
export const addCompensations = async (newData) => {
    try {
      const token = localStorage.getItem("token");
  
      const requestBody = {
        id: newData.id,
        type: newData.type,
        amount: newData.amount,
      };
  
      const response = await axios.post(`${path}/financials/${newData.id}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      console.error(error);
      console.error(error.response.data.error);
      
    }
  };
  
export const addBonuses = async (newData) => {
    try {
      const token = localStorage.getItem("token");
  
      const requestBody = {
        id: newData.id,
        type: newData.type,
        amount: newData.amount,
      };
  
      const response = await axios.post(`${path}/financials/${newData.id}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      console.error(error);
      console.error(error.response.data.error);
      
    }
  };
  