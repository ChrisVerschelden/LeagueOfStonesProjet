
import { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useBeforeunload } from 'react-beforeunload';

import { getMatchmakingAvailablePlayers, participateMatchMaking, unparticipateMatchMaking } from '../../../utils/queries';

import { AvailablePlayers } from './AvailablePlayers/AvailablePlayers';
import { MatchRequests } from './MatchRequests/MatchRequests';

const CONSTANTS = {
    USERS_TITLE: {
        FR: "Joueurs",
        EN: "Players"
    }
}

const DEBUG = {
    PLAYERS: [
        {
            "name": "Angel",
            "email": "angel@gmail.com",
            "matchmakingId": "010203"
        },
        {
            "name": "Ansar",
            "email": "ansar@gmail.com",
            "matchmakingId": "040506"
        },
        {
            "name": "Chris",
            "email": "chris@gmail.com",
            "matchmakingId": "070809"
        }
    ],
    REQUESTS: [
        {
            "name": "Chris",
            "email": "chris@gmail.com",
            "matchmakingId": "070809"
        }
    ]
}

const INTERVAL_REPEAT = 5 * 1000;

export const MatchmakingSelection = (props) => {
    const navigate = useNavigate();

    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [isParticipating, setIsParticipating] = useState(true);
    const [updateCheckValue, setUpdateCheckValue] = useState(1);

    const [cookies, setCookie] = useCookies(['name']);

    const handleParticipating = useCallback(async (doParticipate) => {
        if (doParticipate) {
            const response = await participateMatchMaking(cookies.session);
            if (response) {
                if ("status" in response) {
                    switch (response.status) {
                        case 200:
                            console.log("response");
                            console.log(await response.json());
                            console.log("Now participating");
                            setIsParticipating(doParticipate);
                            break;
                    
                        default:
                            console.log(`not 200, response: ${await response.text()}`);
                            break;
                    }
                }
            }
        } else {
            const response = await unparticipateMatchMaking(cookies.session);
            if (response) {
                if ("status" in response) {
                    switch (response.status) {
                        case 200:
                            console.log("Not participating anymore", doParticipate);
                            setIsParticipating(doParticipate);
                            setAvailablePlayers([]);
                            break;
                    
                        default:
                            console.log(`not 200, response: ${await response.text()}`);
                            break;
                    }
                }
            }
        }
    }, [setIsParticipating]);

    const setupAvailablePlayers = useCallback(async () => {
        console.log("setupAvailablePlayers");
        if ("session" in cookies) {
            const response = await getMatchmakingAvailablePlayers(cookies.session);
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
    }, []);

    const setupRequests = useCallback( async () => {
        if (cookies && "session" in cookies) {
            const response = await participateMatchMaking(cookies.session);
            if (response) {
                if ("status" in response) {
                    switch (response.status) {
                        case 200:
                            const data = await response.json();
                            if ("request" in data) {
                                setReceivedRequests(data.request);
                            }
                            console.log("data");
                            console.log(data);
                            break;
                    
                        default:
                            console.error(`not 200, response: ${await response.text()}`);
                            break;
                    }
                }
            }
        }
    }, []);
    
    const checkForMatch = useCallback( async () => {
        if (cookies && "session" in cookies) {
            const response = await participateMatchMaking(cookies.session);
            if (response) {
                if ("status" in response) {
                    switch (response.status) {
                        case 200:
                            console.log("response");
                            try {
                                const data = await response.json();
                                if ("match" in data) {
                                    navigate('/composeDeck');
                                }
                            } catch (err) { console.error(err); }
                            console.log(await response.json());
                            break;
                    
                        default:
                            console.log(`not 200, response: ${await response.text()}`);
                            break;
                    }
                }
            }
        }
    }, [cookies]);

    const updatePlayers = useCallback(() => {
        if (isParticipating) {
            setupAvailablePlayers();
            setupRequests();
            checkForMatch();
        }
    }, [isParticipating, setupAvailablePlayers, setupRequests]);

    useBeforeunload(() => {
        if (cookies && "session" in cookies) {
            unparticipateMatchMaking(cookies.session);
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Logs every minute');
            updatePlayers();
            console.log(isParticipating);
        }, INTERVAL_REPEAT);
        return () => clearInterval(interval);
    }, [isParticipating])

    useEffect(() => { updatePlayers(); }, [])

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
