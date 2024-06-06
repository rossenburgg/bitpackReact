import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { placeOrder, getOpenOrders, executeTrade } from '../services/trading';
import { socket } from '../services/socket';

function Trading() {
    const { auth } = useContext(AuthContext);
    const [orderData, setOrderData] = useState({ type: 'buy', currencyPair: 'BTC/USD', price: 0, amount: 0 });
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (auth.token) {
                const result = await getOpenOrders(auth.token);
                setOrders(result);
            }
        };

        fetchOrders();

        socket.on('newOrder', (newOrder) => {
            setOrders((prevOrders) => [...prevOrders, newOrder]);
        });

        socket.on('orderExecuted', (executedOrder) => {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === executedOrder.id ? executedOrder : order
                )
            );
        });

        return () => {
            socket.off('newOrder');
            socket.off('orderExecuted');
        };
    }, [auth.token]);

    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (auth.token) {
            await placeOrder(auth.token, orderData);
            const result = await getOpenOrders(auth.token);
            setOrders(result);
        }
    };

    const handleExecuteTrade = async (orderId) => {
        if (auth.token) {
            await executeTrade(auth.token, { orderId });
            const result = await getOpenOrders(auth.token);
            setOrders(result);
        }
    };

    return (
        <div>
            <h1>Trading</h1>
            <div>
                <h2>Place Order</h2>
                <form onSubmit={handlePlaceOrder}>
                    <div>
                        <label>Type</label>
                        <select name="type" value={orderData.type} onChange={handleChange}>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>
                    <div>
                        <label>Currency Pair</label>
                        <input
                            type="text"
                            name="currencyPair"
                            value={orderData.currencyPair}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={orderData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={orderData.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Place Order</button>
                </form>
            </div>
            <div>
                <h2>Open Orders</h2>
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            {order.type} {order.amount} {order.currencyPair} @ {order.price}
                            <button onClick={() => handleExecuteTrade(order.id)}>Execute</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Trading;