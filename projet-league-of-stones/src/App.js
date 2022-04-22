import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FormConnexion from './components/FormConnexion'
import FormInscriptionAlt from './components/FormInscriptionAlt';
import Interface from './components/Interface'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { MatchmakingSelection } from './components/Prematch/Matchmaking/MatchmakingSelection';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { HeaderComp } from './components/Header/HeaderComp';
import { Logout } from './components/Logout';
import Plateau from "./components/plateau/Plateau";


function App() {
  const [cookies, setCookie] = useCookies(['name']);
  const session = "session" in cookies ? cookies.session : null;
  return (
    <div className="App">
      <header className="App-header">
        <HeaderComp />
      </header>
        <Routes>
          <Route path='/register' element={<FormInscriptionAlt />}/>
          <Route path='/login'   element={<FormConnexion />}/>
          <Route path='/success'     element={<h1>Votre compte à bien été créé !</h1>}/>
          <Route path='/composeDeck' element={<Interface cookies={session}/>}/>
          <Route path='/findGame'    element={<p></p>}/>
          <Route path='/game'        element={<Plateau/>}/>
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
