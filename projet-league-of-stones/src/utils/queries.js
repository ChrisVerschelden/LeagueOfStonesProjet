/*
Connection queries
 */

export const currentConnectedUser = () => {
    fetch('http://localhost:3001/users/amIConnected', {
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


/*  game queries

 */
export const initDeck = (jsonDeck) => {
    fetch('http://localhost:3001/match/initDeck?deck='+jsonDeck, {
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

export const getMatchInfo = () => {
    fetch('http://localhost:3001/match/getMatch', {
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

export const getAllMatchInfo = () => {
    fetch('http://localhost:3001/match/getAllMatch', {
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

export const playCard = (idCard) => {
    fetch('http://localhost:3001/match/playCard?card='+idCard, {
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

export const pickCard = () => {
    fetch('http://localhost:3001/match/pickCard', {
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
    fetch('http://localhost:3001/match/attack?card='+idMine+"&enemyCard="+idAdv, {
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


export const attackPlayer = () => {
    fetch('http://localhost:3001/match/attackPlayer', {
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

export const endTurn = () => {
    fetch('http://localhost:3001/match/endTurn', {
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

export const finishMatch = () => {
    fetch('http://localhost:3001/match/finishMatch', {
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
export const unparticipate = () => {
    fetch('http://localhost:3001/matchmaking/unparticipate', {
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

export const requestPlayer = (idPlayer) => {
    fetch('http://localhost:3001/matchmaking/request?matchmakingId='+idPlayer, {
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

export const acceptRequest = (idPlayer) => {
    fetch('http://localhost:3001/matchmaking/acceptRequest?matchmakingId='+idPlayer, {
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