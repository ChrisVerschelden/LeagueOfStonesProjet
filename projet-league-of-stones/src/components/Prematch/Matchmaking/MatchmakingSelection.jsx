
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

import { getMatchmakingAvailablePlayers, participateMatchMaking, unparticipateMatchMaking } from '../../../utils/queries';

import { AvailablePlayers } from './AvailablePlayers/AvailablePlayers';
import { MatchRequests } from './MatchRequests/MatchRequests';

// const DEBUG = {
//     PLAYERS: [
//         {
//             "name": "Angel",
//             "email": "angel@gmail.com",
//             "matchmakingId": "010203"
//         },
//         {
//             "name": "Ansar",
//             "email": "ansar@gmail.com",
//             "matchmakingId": "040506"
//         },
//         {
//             "name": "Chris",
//             "email": "chris@gmail.com",
//             "matchmakingId": "070809"
//         }
//     ],
//     REQUESTS: [
//         {
//             "name": "Chris",
//             "email": "chris@gmail.com",
//             "matchmakingId": "070809"
//         }
//     ]
// }

const CONSTANTS = {
    CONFIRM_LEAVING: {
        FR: "Voulez-vous quitter le matchmaking ?",
        EN: "Do you want to leave matchmaking ?",
    }
}

const INTERVAL_REPEAT = 5 * 1000;

export const MatchmakingSelection = (props) => {
    const session = useSelector(state => state.session);
    const navigate = useNavigate();

    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [isParticipating, setIsParticipating] = useState(true);

    const handleParticipating = useCallback(async (doParticipate) => {
        if (session && typeof(session) === "string") {
            if (doParticipate) {
                const response = await participateMatchMaking(session);
                if (response) {
                    if ("status" in response) {
                        switch (response.status) {
                            case 200:
                                // console.log("Now participating");
                                setIsParticipating(doParticipate);
                                break;
                        
                            default:
                                console.error(`not 200, response: ${await response.text()}`);
                                break;
                        }
                    }
                }
            } else {
                const response = await unparticipateMatchMaking(session);
                if (response) {
                    if ("status" in response) {
                        switch (response.status) {
                            case 200:
                                // console.log("Not participating anymore", doParticipate);
                                setIsParticipating(doParticipate);
                                setAvailablePlayers([]);
                                break;
                        
                            default:
                                console.error(`not 200, response: ${await response.text()}`);
                                break;
                        }
                    }
                }
            }
        }
    }, [setIsParticipating, session]);

    const setupAvailablePlayers = useCallback(async () => {
        if (session && typeof(session) === "string") {
            const response = await getMatchmakingAvailablePlayers(session);
            if (response) {
                if ("status" in response) {
                    switch (response.status) {
                        case 200:
                            const data = await response.json();
                            if (Array.isArray(data)) setAvailablePlayers(data);
                            break;
                    
                        default:
                            console.error(`not 200, response: ${await response.text()}`);
                            break;
                    }
                }
            }
        }
    }, [session]);

    const setupRequests = useCallback( async () => {
        if (session && typeof(session) === "string") {
            const response = await participateMatchMaking(session);
            if (response) {
                if ("status" in response) {
                    switch (response.status) {
                        case 200:
                            const data = await response.json();
                            if ("request" in data) {
                                setReceivedRequests(data.request);
                            }
                            break;
                    
                        default:
                            console.error(`not 200, response: ${await response.text()}`);
                            break;
                    }
                }
            }
        }
    }, [session]);
    
    const checkForMatch = useCallback( async () => {
        if (session && typeof(session) === "string") {
            const response = await participateMatchMaking(session);
            if (response) {
                if ("status" in response) {
                    switch (response.status) {
                        case 200:
                            try {
                                const data = await response.json();
                                if ("match" in data) {
                                    console.log("navigate('/composeDeck');");
                                    navigate('/composeDeck');
                                }
                            } catch (err) { console.error(err); }
                            break;
                    
                        default:
                            console.error(`not 200, response: ${await response.text()}`);
                            break;
                    }
                }
            }
        }
    }, [session, navigate]);

    const updatePlayers = useCallback(() => {
        console.log("updatePlayers", isParticipating);
        if (isParticipating) {
            setupAvailablePlayers();
            setupRequests();
            checkForMatch();
        }
    }, [isParticipating, setupAvailablePlayers, setupRequests, checkForMatch]);

    // Not working, cannot guarantee to successfuly achieve fetch/any API call with 'beforeunload' event type
    const handleUnload = useCallback((e) => {
        e.preventDefault();
        const doExit = window.confirm(CONSTANTS.CONFIRM_LEAVING.FR);
        if (doExit) {
            if (session && typeof(session) === "string") {
                unparticipateMatchMaking(session);
            }
        }
    }, [session]);

    useEffect(() => {
        console.log("useEffect lanceur boucle");
        const interval = setInterval(() => {
        console.log("boucle");
        updatePlayers();
        }, INTERVAL_REPEAT);
        return () => clearInterval(interval);
    }, [isParticipating, updatePlayers])

    useEffect(() => { updatePlayers(); }, [updatePlayers]);

    // Not working, cannot guarantee to successfuly achieve fetch/any API call with 'beforeunload' event type
    useEffect(() => {
        window.addEventListener('beforeunload', handleUnload);

        return () => window.removeEventListener('beforeunload', handleUnload);
    }, [handleUnload]);

    return (
        <div className="container py-2">
            <h1>Matchmaking</h1>
            <div className="container">
                <AvailablePlayers players={availablePlayers} />
                <MatchRequests players={receivedRequests} isParticipating={isParticipating} handleParticipating={handleParticipating} />
            </div>
        </div>
    );
};
