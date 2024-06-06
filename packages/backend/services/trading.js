import axios from 'axios';

const API_URL = 'http://localhost:5000/api/trading';

export const placeOrder = async (token, orderData) => {
    const config = {
        headers: {
            'x-auth-token': token
        }
    };
    const res = await axios.post(`${API_URL}/order`, orderData, config);
    return res.data;
};

export const getOpenOrders = async (token) => {
    const config = {
        headers: {
            'x-auth-token': token
        }
    };
    const res = await axios.get(`${API_URL}/orders`, config);
    return res.data;
};

export const executeTrade = async (token, tradeData) => {
    const config = {
        headers: {
            'x-auth-token': token
        }
    };
    const res = await axios.post(`${API_URL}/trade`, tradeData, config);
    return res.data;
};
