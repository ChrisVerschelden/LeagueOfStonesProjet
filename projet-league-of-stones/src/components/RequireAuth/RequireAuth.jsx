
import { Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { isAuth } from '../../utils/auth';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {

  const [cookies, setCookie] = useCookies(['name']);
  let auth = false;
  if ("session" in cookies) {
    auth = isAuth(cookies.session);
  }

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login"  />;
  }

  return children;
}