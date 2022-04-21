import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormConnexion from './components/FormConnexion'
import FormInscriptionAlt from './components/FormInscriptionAlt';
import Interface from './components/Interface'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import MatchMaking from './components/MatchMaking';
import Plateau from './components/plateau/Plateau';

function App() {
    return (
        <div className="App">
            <Router>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light">
                    <a className="navbar-brand" href="#">League Of Stone</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className='nav-item'><Link to='/inscription'
                                                           className='m-3 link-secondary text-decoration-none'> s'inscrire </Link>
                            </li>
                            <li className='nav-item'><Link to='/connexion'
                                                           className='m-3 link-secondary text-decoration-none'> se
                                connecter </Link></li>
                        </ul>
                    </div>
                </nav>
                <Routes>
                    <Route path='/inscription' element={<FormInscriptionAlt/>}/>
                    <Route path='/connexion' element={<FormConnexion/>}/>
                    <Route path='/success' element={<h1>Votre compte à bien été créé !</h1>}/>
                    <Route path='/composeDeck' element={<Interface/>}/>
                    <Route path='/findGame' element={<p/>}/>
                    <Route path='/game' element={<Plateau/>}/>
                    <Route path='/matchmaking' element={<MatchMaking />}/>

                </Routes>
            </Router>
        </div>
    );
}

export default App;
