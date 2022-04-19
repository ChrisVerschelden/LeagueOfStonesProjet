
import { useState, useEffect, useCallback } from 'react';



export const MatchRequests = (props) => {
    const [players, setPlayers] = useState();
    const [playersUl, setPlayersUl] = useState(<ul className="list-group list-group-flush"></ul>);
    const [participateButton, setParticipateButton] = useState(<button className="btn btn-primary mx-2" style={{width: "170px"}}>Participer</button>);
    const [stopParticipateButton, setStopParticipateButton] = useState(<button className="btn btn-light mx-2 disabled" style={{width:"170px"}}>Arrêter de participer</button>);


    const setupParticipateButtons = useCallback(() => {
        if("isParticipating" in props && typeof(props.isParticipating) === "boolean" && "handleParticipating" in props && typeof(props.handleParticipating)) {
            // Buttons are declared here for simplicity
            const BUTTONS = {
                ENABLED: {
                    PARTICIPATE: <button className="btn btn-primary mx-2" style={{width: "170px"}} onClick={() => props.handleParticipating(true)} >Participer</button>,
                    STOPPARTICIPATE: <button className="btn btn-light mx-2" style={{width:"170px"}} onClick={() => props.handleParticipating(false)} >Arrêter de participer</button>
                },
                DISABLED: {
                    PARTICIPATE: <button className="btn btn-primary mx-2 disabled" style={{width: "170px"}} >Participer</button>,
                    STOPPARTICIPATE: <button className="btn btn-light mx-2 disabled" style={{width:"170px"}}>Arrêter de participer</button>
                }
            }

            if (props.isParticipating) {
                setParticipateButton(BUTTONS.DISABLED.PARTICIPATE);
                setStopParticipateButton(BUTTONS.ENABLED.STOPPARTICIPATE);
            } else {
                setParticipateButton(BUTTONS.ENABLED.PARTICIPATE);
                setStopParticipateButton(BUTTONS.DISABLED.STOPPARTICIPATE);
            }
        }
    }, [props.isParticipating, props.handleParticipating, setParticipateButton, setStopParticipateButton]);

    const setupPlayersUl = useCallback(() => {
        if (Array.isArray(players)) {
            const liList = []
            for (const [index, player] of players.entries()) {
                if ("email" in player && "name" in player && "matchmakingId" in player) {
                    liList.push(<li key={index} className="list-group-item"><span>{player.name} ({player.email})</span></li>);
                }
            }
            setPlayersUl(<ul className="list-group list-group-flush">{liList}</ul>);
        }
      }, [players, setPlayersUl]);


    useEffect(() => { setupPlayersUl() }, [players]);

    useEffect(() => { if("players" in props && Array.isArray(props.players)) setPlayers(props.players); }, [props.players]);
    useEffect(() => { setupParticipateButtons(); }, [props.isParticipating]);

    return (
        <div className="col container px-1">
            <div className="my-2">
                {participateButton}
            </div>
            <div className="my-2">
                {stopParticipateButton}
            </div>
            <div className="bg-light border border-light rounded">
                <h2>Requêtes reçues</h2>
                {playersUl}
            </div>
        </div>
    );
};
