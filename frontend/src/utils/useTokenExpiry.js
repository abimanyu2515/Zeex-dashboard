// utils/useTokenExpiry.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const useTokenExpiry = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const exp = decoded.exp;
                const now = Math.floor(Date.now() / 1000);
                
                if (exp < now) {
                    localStorage.removeItem('token');
                    navigate('/');
                }
            } catch (error) {
                console.error("Invalid token", error);
                navigate('/');
            }
        }
    }, [navigate]);
};