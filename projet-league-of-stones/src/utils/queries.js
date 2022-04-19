export const isAttacking = (idMine, idAdv) => {
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

const getMatchInfo = () => {
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

const playCard = (idCard) => {
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