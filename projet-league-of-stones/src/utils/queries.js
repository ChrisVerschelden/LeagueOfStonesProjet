
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
const initDeck = (jsonDeck) => {
    fetch(`${API_URL}/match/initDeck?deck=`+jsonDeck, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {return response})
        .then(data => {
            console.log(data)
            return data
        })
}

const getMatchInfo = () => {
    fetch(`${API_URL}/match/getMatch`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {return response})
        .then(data => {
            console.log(data)
            return data
        })
}

const getAllMatchInfo = () => {
    fetch(`${API_URL}/match/getAllMatch`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {return response})
        .then(data => {
            console.log(data)
            return data
        })
}
/* Combat queries

 */

const playCard = (idCard) => {
    fetch(`${API_URL}/match/playCard?card=`+idCard, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {return response})
        .then(data => {
            console.log(data)
            return data
        })
}

const pickCard = () => {
    fetch(`${API_URL}/match/pickCard`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {return response})
        .then(data => {
            console.log(data)
            return data
        })
}

export const attackEnemyCard = (idMine, idAdv) => {
    fetch(`${API_URL}/match/attack?card=`+idMine+"&enemyCard="+idAdv, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {return response})
        .then(data => {

            console.log(data)
            return data

        })
}


const attackPlayer = () => {
    fetch(`${API_URL}/match/attackPlayer`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {return response})
        .then(data => {
            console.log(data)
            return data
        })
}

const endTurn = () => {
    fetch(`${API_URL}/match/endTurn`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {return response})
        .then(data => {
            console.log(data)
            return data
        })
}

const finishMatch = () => {
    fetch(`${API_URL}/match/finishMatch`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {return response})
        .then(data => {
            console.log(data)
            return data
        })
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

const requestPlayer = (idPlayer) => {
    fetch(`${API_URL}/matchmaking/request?matchmakingId=`+idPlayer, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {return response})
        .then(data => {
            console.log(data)
            return data
        })
}

const acceptRequest = (idPlayer) => {
    fetch(`${API_URL}/matchmaking/acceptRequest?matchmakingId=`+idPlayer, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {return response})
        .then(data => {
            console.log(data)
            return data
        })
}
