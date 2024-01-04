import axios from "axios";

const path = "https://abo-abdallah.onrender.com";

export const getAllEmployees = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${path}/employees`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error(error);
    console.log("req",error.response.status);
    console.log('Status Code:', error.response.status);
    console.error(error.response.data.error);
    
  }
};
export const getEmployeeById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${path}/employees/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Employee by ID fetched successfully");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    console.error(error.response.data.error);
    
  }
};

export const addEmployee = async (newEmployeeData) => {
  try {
    const token = localStorage.getItem("token");
    
    const requestBody = {
      id: newEmployeeData.id,
      name: newEmployeeData.name,
      jobRole: newEmployeeData.jobRole,
      ssn: newEmployeeData.ssn,
      phone: newEmployeeData.phone,
      workAddress: newEmployeeData.workAddress,
      baseSalary: newEmployeeData.baseSalary,
    };

    const response = await axios.post(`${path}/employees/add`, requestBody, {
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

export const updateEmployee = async (newEmployeeData) => {
  try {
    const token = localStorage.getItem("token");

    const requestBody = {
      id: newEmployeeData.id,
      name: newEmployeeData.name,
      jobRole: newEmployeeData.jobRole,
      ssn: newEmployeeData.ssn,
      phone: newEmployeeData.phone,
      workAddress: newEmployeeData.workAddress,
      baseSalary: newEmployeeData.baseSalary,
    };

    const response = await axios.put(`${path}/employees/update/${newEmployeeData.id}`, requestBody, {
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

export const deleteEmployee = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${path}/employees/remove/${id}`,
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