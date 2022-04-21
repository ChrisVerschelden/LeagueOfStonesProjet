
import { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';

import { requestPlayer } from '../../../../utils/queries';

export const AvailablePlayers = (props) => {
    const [cookies, setCookie] = useCookies(['name']);
    
    const [players, setPlayers] = useState();
    const [playersUl, setPlayersUl] = useState(<ul className="list-group list-group-flush"></ul>);

    const handleRequestTo = useCallback(async (matchmakingId) => {
        if (matchmakingId && typeof(matchmakingId) === "string" && matchmakingId.length > 0
        && cookies && "session" in cookies) {
            const session = cookies.session;
            const response = await requestPlayer(session, matchmakingId);
            if (response) {
                console.log("response");
                console.log(response);
                if ("status" in response) {
                    switch (response.status) {
                        case 200:
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
    }, [cookies]);

    const setupPlayersUl = useCallback(() => {
        if (Array.isArray(players)) {
            const liList = []
            for (const [index, player] of players.entries()) {
                if ("email" in player && "name" in player && "matchmakingId" in player) {
                    liList.push(<li key={index} className="list-group-item d-flex justify-content-between align-items-center"><span className="flex-grow-1">{player.name} ({player.email})</span><button className="btn btn-primary" onClick={() => handleRequestTo(player.matchmakingId)}>Défier</button></li>);
                }
            }
            setPlayersUl(<ul className="list-group list-group-flush w-50 border border-warning rounded p-0">{liList}</ul>);
        }
      }, [players, setPlayersUl]);
    

    useEffect(() => { setupPlayersUl() }, [players])

    useEffect(() => { if(Array.isArray(props.players)) setPlayers(props.players); }, [props.players])

    return (
        <div className="col container row justify-content-center bg-dark text-light px-1 pb-2">
            <Toaster />
            <h2>Joueurs en ligne</h2>
            {playersUl}
        </div>
    );
};
