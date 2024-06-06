import React, { useEffect, useState } from 'react';
import { socket } from '../services/socket';

function Dashboard() {
    const [marketData, setMarketData] = useState([]);

    useEffect(() => {
        socket.on('marketData', (data) => {
            setMarketData(data);
        });

        return () => {
            socket.off('marketData');
        };
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                {marketData.map((data, index) => (
                    <div key={index}>
                        <p>{data.pair}: {data.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
