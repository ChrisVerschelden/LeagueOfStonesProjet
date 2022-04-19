
import { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';

import { getMatchmakingAvailablePlayers } from '../../../utils/queries';

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

export const MatchmakingSelection = (props) => {
    const [availablePlayers, setavailablePlayers] = useState([]);
    const [isParticipating, setIsParticipating] = useState(false);

    const [cookies, setCookie] = useCookies(['name']);

    const handleParticipating = useCallback((doParticipate) => {
        setIsParticipating(doParticipate);
    }, [setIsParticipating]);

    const setupAvailablePlayers = useCallback(async () => {
        if ("session" in cookies) {
            const response = await getMatchmakingAvailablePlayers(cookies.session);
            if (response) {
                if ("status" in response) {
                    switch (response.status) {
                        case 200:
                            console.log(await response.json());
                            break;
                    
                        default:
                            console.error(`not 200, response: ${await response.text()}`);
                            break;
                    }
                }
            }
        }
    }, []);

    useEffect(() => { setupAvailablePlayers() }, [])

    return (
        <div className="container py-2">
            <h1>Matchmaking</h1>
            <div className="container">
                <AvailablePlayers players={DEBUG.PLAYERS} />
                <MatchRequests players={DEBUG.REQUESTS} isParticipating={isParticipating} handleParticipating={handleParticipating} />
            </div>
        </div>
    );
};
