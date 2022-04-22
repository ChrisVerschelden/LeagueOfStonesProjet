
import { useState, useEffect, useCallback } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import '../../../../App.css';


import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKhanda } from "@fortawesome/free-solid-svg-icons"

export const AvailablePlayers = (props) => {
    const [players, setPlayers] = useState();
    const [playersUl, setPlayersUl] = useState( <tbody>
                                                    <tr>
                                                        <td scope="col" className="col-3"></td>
                                                        <td scope="col" className="col-3"></td>
                                                        <td scope="col" className="col-3"></td>
                                                        <td scope="col" className="col-3"></td>
                                                    </tr>
                                                </tbody>
                                               );


    const setupPlayersUl = useCallback(() => {
        if (Array.isArray(players)) {
            const tbodyContent = []
            let cpt = 0
            for (const [index, player] of players.entries()) {
                cpt = cpt+1
                if ("email" in player && "name" in player && "matchmakingId" in player) {
                    tbodyContent.push(<tr>
                                    <td scope="col" className="col-3">{cpt}</td>
                                    <td scope="col" className="col-3">{player.name}</td>
                                    <td scope="col" className="col-3">{player.email}</td>
                                    <td scope="col" className="col-3"><a>defier</a></td>
                                </tr>);
                }
            }
            setPlayersUl(<tbody>{tbodyContent}</tbody>);
        }
      }, [players, setPlayersUl]);
    

    useEffect(() => { setupPlayersUl() }, [players])

    useEffect(() => { if(Array.isArray(props.players)) setPlayers(props.players); }, [props.players])

    return (
        <div className='container-fluid vh-100'>
            <div className=" justify-content-center">
                <h4 className="text-white p-4">Liste des joueurs prets à faire une partie</h4>
            
                <div className="row">
                    <div className="col-lg-10 bg-dark mx-auto rounded l">
                                
                        <div className="table-responsive">
                            <table className="table table-dark table-fixed table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" className="col-3">#</th>
                                        <th scope="col" className="col-3">Players</th>
                                        <th scope="col" className="col-3">Informations</th>
                                    </tr>
                                </thead>      
                                    {playersUl}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
        
    );
};
