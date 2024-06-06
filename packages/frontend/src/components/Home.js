import React, { useEffect, useState } from 'react';
import { fetchSampleData } from '../services/api';

function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const result = await fetchSampleData();
            setData(result);
        };
        getData();
    }, []);

    return (
        <div>
            <h1>Welcome to Crypto Trading Platform</h1>
            <p>Trade your favorite cryptocurrencies with ease.</p>
            {data && <p>{data.message}</p>}
        </div>
    );
}

export default Home;
