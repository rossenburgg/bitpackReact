import axios from 'axios';

const API_URL = 'http://localhost:5000/api/wallet';

export const getWallets = async (token) => {
    const config = {
        headers: {
            'x-auth-token': token
        }
    };
    const res = await axios.get(API_URL, config);
    return res.data;
};

export const depositFunds = async (token, data) => {
    const config = {
        headers: {
            'x-auth-token': token
        }
    };
    const res = await axios.post(`${API_URL}/deposit`, data, config);
    return res.data;
};

export const withdrawFunds = async (token, data) => {
    const config = {
        headers: {
            'x-auth-token': token
        }
    };
    const res = await axios.post(`${API_URL}/withdraw`, data, config);
    return res.data;
};
