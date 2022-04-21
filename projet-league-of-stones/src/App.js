import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FormConnexion from './components/FormConnexion'
import FormInscriptionAlt from './components/FormInscriptionAlt';
import Interface from './components/Interface'
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import { MatchmakingSelection } from './components/Prematch/Matchmaking/MatchmakingSelection';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { HeaderComp } from './components/Header/HeaderComp';
import { Logout } from './components/Logout';

import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderComp />
      </header>
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
          <Route path='/logout' element={
                                                        <RequireAuth>
                                                          <Logout />
                                                        </RequireAuth>
                                                      }/>

        </Routes>
    </div>
  );
}

export default App;
