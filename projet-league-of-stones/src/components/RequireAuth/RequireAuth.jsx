
import { Navigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'; 

import { isAuth } from '../../utils/auth';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const session = useSelector(state => state.session);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const setupAuth = useCallback(async () => {
    if (session && typeof(session) === "string") {
      setAuth(await isAuth(session));
    }
    setLoading(false);
  }, [session]);

  useEffect(() => { setupAuth(); }, [setupAuth])

  return (
    auth ?
      (children)
      :
      loading ?
        (<div>LOADING...</div>)
        :
        (<Navigate to="/login" />) 
    );
}
