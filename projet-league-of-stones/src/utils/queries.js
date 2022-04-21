/*
Connection queries
 */

export const currentConnectedUser = () => {
    fetch('http://localhost:3001/users/amIConnected', {
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


/*  game queries

 */
export const initDeck = (jsonDeck) => {
    fetch('http://localhost:3001/match/initDeck?deck=' + jsonDeck, {
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

export const getMatchInfo = async () => {
    let data = await fetch('http://localhost:3001/match/getMatch');
    return await data.json()
}

export const getAllMatchInfo = async () => {
    let data = await fetch('http://localhost:3001/match/getAllMatch');
    return await data.json()
}
/* Combat queries

 */

export const playCard = async (idCard) => {
    let data = await fetch('http://localhost:3001/match/playCard?card=' + idCard);
    return await data.json()
}

export const pickCard = async () => {
    let data = await fetch('http://localhost:3001/match/pickCard');
    return await data.json()
}

export const attackEnemyCard = async (idMine, idAdv) => {
    let data = await fetch('http://localhost:3001/match/attack?card=' + {idMine} + "&enemyCard=" + {idAdv});
    return await data.json()
}


export const attackPlayer = async () => {
    let data = await fetch('http://localhost:3001/match/attackPlayer');
    return await data.json()
}

export const endTurn = async () => {
    let data = await fetch('http://localhost:3001/match/endTurn')
    return await data.json()
}

export const finishMatch = async () => {
    let data = fetch('http://localhost:3001/match/finishMatch')
    return await data.json()
}


/* Matchmaking queries

 */
export const unparticipate = async () => {
    let data = await fetch('http://localhost:3001/matchmaking/unparticipate')
    return await data.json()
}

export const requestPlayer = async (idPlayer) => {
    let data = await fetch('http://localhost:3001/matchmaking/request?matchmakingId=' + idPlayer);
    return await data.json()
}

export const acceptRequest = async (idPlayer) => {
    let data = await fetch('http://localhost:3001/matchmaking/acceptRequest?matchmakingId=' + idPlayer)
    return await data.json()
}