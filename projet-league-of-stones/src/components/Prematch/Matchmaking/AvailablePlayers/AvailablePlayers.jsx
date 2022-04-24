
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import { requestPlayer } from '../../../../utils/queries';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../../../App.css';

import ReactDOM from 'react-dom'

const CONSTANTS = {
    ONLINE_PLAYERS: {
        FR: "Joueurs en ligne",
        EN: "Online players"
    }
};

export const AvailablePlayers = (props) => {
    const session = useSelector(state => state.session);
    
    const [players, setPlayers] = useState();
    const [playersUl, setPlayersUl] = useState( <tbody>
                                                    
                                                </tbody>
                                               );

    const handleRequestTo = useCallback(async (matchmakingId) => {
        if (session && typeof(session) === "string") {
            if (matchmakingId && typeof(matchmakingId) === "string" && matchmakingId.length > 0) {
                const response = await requestPlayer(session, matchmakingId);
                if (response) {
                    console.log("response");
                    console.log(response);
                    if ("status" in response) {
                        switch (response.status) {
                            case 200:
                                console.log("TTTTTT");
                                try {
                                    const successMsg = await response.text();
                                    toast.success(successMsg);
                                } catch (err) {
                                    console.error(`Unable to read response`);
                                    console.error(response);
                                    toast.error("Unable to send request, try again")
                                };
                                break;
                            default:
                                let msg = "";
                                try {
                                    msg = await response.text();
                                } catch (err) { };
                                console.error(`Unable to send request to player ${matchmakingId}, ${msg}`);
                                toast.error("Unable to send request, try again")
                                break;
                        }
                    }
                }
            }
        }
    }, [session]);

    const setupPlayersUl = useCallback(() => {
        console.log("setupPlayersUl");
        console.log("players");
        console.log(players);
        if (Array.isArray(players)) {
            const tbodyContent = []
            let cpt = 0
            for (const [index, player] of players.entries()) {
                cpt = cpt+1
                if ("email" in player && "name" in player && "matchmakingId" in player) {
                    tbodyContent.push(<tr>
                                    <td scope="col" className="col-3">{cpt}</td>
                                    <td className="col-3">{player.name}</td>
                                    <td className="col-3">{player.email}</td>
                                    <td className="col-3"><button type="button" class="btn btn-light btn-sm" onClick={() => handleRequestTo(player.matchmakingId)}><i class="bi bi-shield-slash"></i></button></td>
                                </tr>);
                }
            }
            setPlayersUl(<tbody>{tbodyContent}</tbody>);
        }
      }, [players, setPlayersUl]);
    

    useEffect(() => { setupPlayersUl() }, [players, setupPlayersUl])

    useEffect(() => { if(Array.isArray(props.players)) setPlayers(props.players); }, [props.players])

    return (
        <div className='container-fluid'>
            <div className=" justify-content-center">
                <h4 className="text-white p-4">{CONSTANTS.ONLINE_PLAYERS.FR}</h4>
            
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
