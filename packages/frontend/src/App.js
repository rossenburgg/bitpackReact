import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Trading from './pages/Trading';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Support from './pages/Support';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
                        <Route path="/trading" element={<ProtectedRoute component={Trading} />} />
                        <Route path="/wallet" element={<ProtectedRoute component={Wallet} />} />
                        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
                        <Route path="/support" element={<ProtectedRoute component={Support} />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
