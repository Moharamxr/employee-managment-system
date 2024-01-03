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


export const deletePost = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `https://crashline.onrender.com/posts/${id}`,

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
