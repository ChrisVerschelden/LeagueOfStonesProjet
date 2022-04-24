
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userDisconnect } from '../store';

export const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [component, ] = useState();

    const doLogout = useCallback(() => {
        dispatch(userDisconnect());
        navigate('/login');
    }, [navigate, dispatch]);

    useEffect(() => { doLogout(); }, [doLogout])

    return component;
};
