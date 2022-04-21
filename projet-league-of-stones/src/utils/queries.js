
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
    const response = await fetch(`${API_URL}/users/amIConnected`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'www-authenticate': session
        }
    });
    return response;
};


/*  game queries

 */
export const initDeck = (jsonDeck) => {
    fetch(`${API_URL}/match/initDeck?deck=`+jsonDeck, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        return response
    })
        .then(data => {
            console.log(data)
            return data
        })
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

export const playCard = async (idCard) => {
    let data = await fetch(`${API_URL}/match/playCard?card=` + idCard);
    return await data.json()
}

export const pickCard = async () => {
    let data = await fetch(`${API_URL}/match/pickCard`);
    return await data.json()
}

export const attackEnemyCard = async (idMine, idAdv) => {
    let data = await fetch(`${API_URL}/match/attack?card=` + {idMine} + "&enemyCard=" + {idAdv});
    return await data.json()
}


export const attackPlayer = async () => {
    let data = await fetch(`${API_URL}/match/attackPlayer`);
    return await data.json()
}

export const endTurn = async () => {
    let data = await fetch(`${API_URL}/match/endTurn`)
    return await data.json()
}

export const finishMatch = async () => {
    let data = fetch(`${API_URL}/match/finishMatch`)
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
