
const API_URL = `http://localhost:3001`;

export const connect = async (email, password) => {


  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"email" :email, "password" : password})
  });
  return response;
};

export const register = async (name, email, password) => {


  const response = await fetch(`${API_URL}/user`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"name" :name, "email" : email, "password" : password})
  });
  return response;
};

/*
Connection queries
 */

export const currentConnectedUser = async (session) => {
    return await fetch(`${API_URL}/users/amIConnected`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'www-authenticate': session
        }
    });
};


/*  game queries

 */
export const initDeck = async (session,jsonDeck) => {
    return await fetch(`${API_URL}/match/initDeck?deck=` + jsonDeck,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "www-authenticate": session
        }
    });
}

export const getMatchInfo = async (session) => {
    return await fetch(`${API_URL}/match/getMatch`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "www-authenticate": session
        }
    });
}

export const getAllMatchInfo = async () => {
    let data = await fetch(`${API_URL}/match/getAllMatch`);
    return await data.json()
}
/* Combat queries

 */

export const playCard = async (session, idCard) => {
    let data = await fetch(`${API_URL}/match/playCard?card=` + idCard,{
        method: 'GET',
            headers: {
            'Content-Type': 'application/json',
                "www-authenticate": session
        }
    });
    return await data.json()
}

export const pickCard = async (session) => {
    let data = await fetch(`${API_URL}/match/pickCard`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "www-authenticate": session
        }
    });
}

export const attackEnemyCard = async (session, idMine, idAdv) => {
    let data = await fetch(`${API_URL}/match/attack?card=` + {idMine} + "&enemyCard=" + {idAdv},{
        method: 'GET',
            headers: {
            'Content-Type': 'application/json',
                "www-authenticate": session
        }
    });
    return await data.json()
}


export const attackPlayer = async (session) => {
    let data = await fetch(`${API_URL}/match/attackPlayer`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "www-authenticate": session
        }
    });
    return await data.json()
}

export const endTurn = async (session) => {
    let data = await fetch(`${API_URL}/match/endTurn`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "www-authenticate": session
        }
    });
    return await data.json()
}

export const finishMatch = async (session) => {
    let data = fetch(`${API_URL}/match/finishMatch`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "www-authenticate": session
        }
    });
    return await data.json()
}


/* Matchmaking queries

 */

export const getMatchmakingAvailablePlayers = async (session) => {

  const response = await fetch(`${API_URL}/matchmaking/getAll`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      "www-authenticate": session
    }
  });
  return response;
};

export const participateMatchMaking = async (session) => {


  const response = await fetch(`${API_URL}/matchmaking/participate`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        "www-authenticate": session
    }
  });
  return response;     
};

export const unparticipateMatchMaking = async (session) => {

    const response = await fetch(`${API_URL}/matchmaking/unparticipate`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "www-authenticate": session
        }
    });

    return response;     
}

export const requestPlayer = async (session, idPlayer) => {
    let response = await fetch(`${API_URL}/matchmaking/request?matchmakingId=` + idPlayer, {
        headers: {
            'www-authenticate': session
        }
    });
    return response;
}

export const acceptRequest = async (session, idPlayer) => {
    let response = await fetch(`${API_URL}/matchmaking/acceptRequest?matchmakingId=` + idPlayer, {
        headers: {
            'www-authenticate': session
        }
    });
    return response;
}
