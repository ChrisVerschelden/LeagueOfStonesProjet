
import { useEffect, useCallback, useState } from 'react'; 
import { useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";

import { isAuth } from '../../utils/auth';
import { currentConnectedUser } from '../../utils/queries';


const DEFAULT_NAVBAR = (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light">
        <Link className="navbar-brand" to="/">League Of Stone</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className='nav-item'> <Link to='/register' className='m-3 link-secondary text-decoration-none'> s'inscrire </Link> </li>
                <li className='nav-item'> <Link to='/login' className='m-3 link-secondary text-decoration-none'> se connecter </Link> </li>
            </ul>
        </div>
    </nav>
);
const getLoggedNavbar = (email, name, state) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light">
        <Link className="navbar-brand" to="/">League Of Stone</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className='nav-item'> <Link to='/logout' className='m-3 link-secondary text-decoration-none'>Déconnexion</Link> </li>
            </ul>
        </div>
        <span>{name} ({email})</span>
        <button onClick={() => console.log(state)}>Log state</button>
    </nav>
    );
};

export const HeaderComp = (props) => {
    const state = useSelector(state => state)
    const [cookies, setCookie] = useCookies(['name']);
    let [component, setComponent] = useState(DEFAULT_NAVBAR);

    const setupNavbarVersion = useCallback(async () => {
        if  ("session" in cookies && isAuth) {
            const response = await currentConnectedUser(cookies.session);
            if (response) {
                const data = await response.json();
                if ("connectedUser" in data) {
                    const user = data.connectedUser;
                    if ("email" in user && "name" in user) {
                        setComponent(getLoggedNavbar(user.email, user.name, state));
                    }
                }
            }
        }
    }, [cookies, state]);

    useEffect(() => { setupNavbarVersion(); }, [cookies, setupNavbarVersion])

    return component;
};
