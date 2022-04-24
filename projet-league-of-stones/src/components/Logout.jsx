
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userDisconnect } from '../store';
import { unparticipateMatchMaking } from '../utils/queries';

export const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const session = useSelector(state => state.session);

    const [component, ] = useState();

    const doLogout = useCallback(() => {
        if (session && typeof(session) === "string") unparticipateMatchMaking(session);
        dispatch(userDisconnect());
        navigate('/login');
    }, [navigate, dispatch, session]);

    useEffect(() => { doLogout(); }, [doLogout])

    return component;
};
