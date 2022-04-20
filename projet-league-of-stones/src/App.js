import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FormConnexion from './components/FormConnexion'
import FormInscriptionAlt from './components/FormInscriptionAlt';
import Interface from './components/Interface'
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import { MatchmakingSelection } from './components/Prematch/Matchmaking/MatchmakingSelection';
import { RequireAuth } from './components/RequireAuth/RequireAuth';

import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
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
        <Routes>
          <Route path='/register' element={<FormInscriptionAlt />}/>
          <Route path='/login'   element={<FormConnexion />}/>
          <Route path='/success'     element={<h1>Votre compte à bien été créé !</h1>}/>
          <Route path='/composeDeck' element={<Interface />}/>
          <Route path='/findGame'    element={<p></p>}/>
          <Route path='/game'        element={<p></p>}/>
          <Route path='/prematch/matchmaking' element={
                                                        <RequireAuth>
                                                          <MatchmakingSelection />
                                                        </RequireAuth>
                                                      }/>
        </Routes>
    </div>
  );
}

export default App;
