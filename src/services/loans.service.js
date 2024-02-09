import axios from "axios";

const path = process.env.REACT_APP_BACKEND_URL;

export const getAllLoans = async (data) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${path}/debts`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            params: {
                pending: data,
            },
        });
        console.log(response.data.message);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        console.log("req", error.response.status);
        if (error.response.status === 401) {
            localStorage.setItem("isLoggedIn", false)
            localStorage.setItem("token", '');
        }
        console.log('Status Code:', error.response.status);
        console.error(error.response.data.error);

    }
};
export const getLoanById = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${path}/debts/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.message);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        console.log("req", error.response.status);
        if (error.response.status === 401) {
            localStorage.setItem("isLoggedIn", false)
            localStorage.setItem("token", '');
        }
        console.log('Status Code:', error.response.status);
        console.error(error.response.data.error);

    }
};
export const makePayment = async (newData) => {

    try {
        const token = localStorage.getItem("token");
        const requestBody = {
            amount: newData.amount,
        };
        const response = await axios.patch(`${path}/debts/${newData.id}`, requestBody, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.message);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        console.log("req", error.response.status);
        if (error.response.status === 401) {
            localStorage.setItem("isLoggedIn", false)
            localStorage.setItem("token", '');
        }
        console.log('Status Code:', error.response.status);
        console.error(error.response.data.error);

    }
};
export const addDept = async (newData) => {

    try {
        const token = localStorage.getItem("token");
        const requestBody = {
            date: newData.date,
            amount: newData.amount,
            reason: newData.reason,
        };
        const response = await axios.post(`${path}/debts/${newData.id}`, requestBody, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.message);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        console.log("req", error.response.status);
        if (error.response.status === 401) {
            localStorage.setItem("isLoggedIn", false)
            localStorage.setItem("token", '');
        }
        console.log('Status Code:', error.response.status);
        console.error(error.response.data.error);

    }
};
export const getEmpLoans = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${path}/debts/employees/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            params: {
                pending: false,
            },
        });
        console.log(response.data.message);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        console.log("req", error.response.status);
        if (error.response.status === 401) {
            localStorage.setItem("isLoggedIn", false)
            localStorage.setItem("token", '');
        }
        console.log('Status Code:', error.response.status);
        console.error(error.response.data.error);

    }
};