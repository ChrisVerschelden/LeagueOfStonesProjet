
import { useEffect, useState, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { userDisconnect } from '../store';

export const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [component, setComponent] = useState();
    const [cookies, setCookies, removeCookie] = useCookies(['name']);

    const doLogout = useCallback(() => {
        removeCookie("session", {path: '/'});
        dispatch(userDisconnect());
        navigate('/login');
    }, [removeCookie, navigate, dispatch]);

    useEffect(() => { doLogout(); }, [doLogout])

    return component;
};
