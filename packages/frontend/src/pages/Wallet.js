import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { getWallets, depositFunds, withdrawFunds } from '../services/wallet';

function Wallet() {
    const { auth } = useContext(AuthContext);
    const [wallets, setWallets] = useState([]);
    const [depositData, setDepositData] = useState({ currency: '', amount: 0 });
    const [withdrawData, setWithdrawData] = useState({ currency: '', amount: 0 });

    useEffect(() => {
        const fetchWallets = async () => {
            if (auth.token) {
                const result = await getWallets(auth.token);
                setWallets(result);
            }
        };
        fetchWallets();
    }, [auth.token]);

    const handleDepositChange = (e) => {
        setDepositData({ ...depositData, [e.target.name]: e.target.value });
    };

    const handleWithdrawChange = (e) => {
        setWithdrawData({ ...withdrawData, [e.target.name]: e.target.value });
    };

    const handleDeposit = async (e) => {
        e.preventDefault();
        if (auth.token) {
            await depositFunds(auth.token, depositData);
            const result = await getWallets(auth.token);
            setWallets(result);
        }
    };

    const handleWithdraw = async (e) => {
        e.preventDefault();
        if (auth.token) {
            await withdrawFunds(auth.token, withdrawData);
            const result = await getWallets(auth.token);
            setWallets(result);
        }
    };

    return (
        <div>
            <h1>Wallet</h1>
            <div>
                {wallets.map((wallet, index) => (
                    <div key={index}>
                        <p>{wallet.currency}: {wallet.balance}</p>
                    </div>
                ))}
            </div>
            <div>
                <h2>Deposit Funds</h2>
                <form onSubmit={handleDeposit}>
                    <div>
                        <label>Currency</label>
                        <input type="text" name="currency" value={depositData.currency} onChange={handleDepositChange} required />
                    </div>
                    <div>
                        <label>Amount</label>
                        <input type="number" name="amount" value={depositData.amount} onChange={handleDepositChange} required />
                    </div>
                    <button type="submit">Deposit</button>
                </form>
            </div>
            <div>
                <h2>Withdraw Funds</h2>
                <form onSubmit={handleWithdraw}>
                    <div>
                        <label>Currency</label>
                        <input type="text" name="currency" value={withdrawData.currency} onChange={handleWithdrawChange} required />
                    </div>
                    <div>
                        <label>Amount</label>
                        <input type="number" name="amount" value={withdrawData.amount} onChange={handleWithdrawChange} required />
                    </div>
                    <button type="submit">Withdraw</button>
                </form>
            </div>
        </div>
    );
}

export default Wallet;
