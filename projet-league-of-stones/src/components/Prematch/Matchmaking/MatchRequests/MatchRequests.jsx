
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { acceptRequest } from '../../../../utils/queries';

export const MatchRequests = (props) => {
    const session = useSelector(state => state.session);
    const navigate = useNavigate();

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
    }, [props, setParticipateButton, setStopParticipateButton]);

    const handleAcceptRequest = useCallback(async (matchmakingId) => {
        if (session && typeof(session) === "string") {
            const response = await acceptRequest(session, matchmakingId);
            if (response) {
                // console.log("response");
                // console.log(response);
                if ("status" in response) {
                    switch (response.status) {
                        case 200:
                            console.log("navigate('/composeDeck');");
                            navigate('/composeDeck');
                            break;
                        default:
                            console.error(`Unable to accept request from player`);
                            console.error(response);
                            break;
                    }
                }
            }
        }
    }, [session, navigate]);

    const setupPlayersUl = useCallback(() => {
        if (Array.isArray(players)) {
            const liList = []
            for (const [index, player] of players.entries()) {
                if ("matchmakingId" in player && "name" in player && "userId" in player) {
                    liList.push(<li key={index} className="list-group-item d-flex justify-content-between align-items-center"><span className="flex-grow-1">{player.name} ({player.matchmakingId})</span><button className="btn btn-primary" onClick={() => handleAcceptRequest(player.matchmakingId)}>Accepter</button></li>);
                }
            }
            setPlayersUl(<ul className="list-group list-group-flush">{liList}</ul>);
        }
      }, [players, setPlayersUl, handleAcceptRequest]);

    useEffect(() => { setupPlayersUl(); }, [players, setupPlayersUl]);

    useEffect(() => { if("players" in props && Array.isArray(props.players)) setPlayers(props.players); }, [props]);

    useEffect(() => { setupParticipateButtons(); }, [props.isParticipating, setupParticipateButtons]);

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
