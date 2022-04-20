
import { useState, useEffect, useCallback } from 'react';

export const AvailablePlayers = (props) => {
    const [players, setPlayers] = useState();
    const [playersUl, setPlayersUl] = useState(<ul className="list-group list-group-flush"></ul>);


    const setupPlayersUl = useCallback(() => {
        if (Array.isArray(players)) {
            const liList = []
            for (const [index, player] of players.entries()) {
                if ("email" in player && "name" in player && "matchmakingId" in player) {
                    liList.push(<li key={index} className="list-group-item d-flex justify-content-between align-items-center"><span className="flex-grow-1">{player.name} ({player.email})</span><button className="btn btn-primary">Défier</button></li>);
                }
            }
            setPlayersUl(<ul className="list-group list-group-flush w-50 border border-warning rounded p-0">{liList}</ul>);
        }
      }, [players, setPlayersUl]);
    

    useEffect(() => { setupPlayersUl() }, [players])

    useEffect(() => { if(Array.isArray(props.players)) setPlayers(props.players); }, [props.players])

    return (
        <div className="col container row justify-content-center bg-dark text-light px-1 pb-2">
            <h2>Joueurs en ligne</h2>
            {playersUl}
        </div>
    );
};
