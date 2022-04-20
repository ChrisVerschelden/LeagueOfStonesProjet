import CardReact from "../components/CardReact";
import {attackEnemyCard, pickCard} from "./queries";


const pickOneCard = () => {
    return <div className="col mt-3 cardReact"><CardReact data={pickCard}/></div>
}


export const stringifyDeck = (deck) => {
    const dic = []
    Object.keys(deck).map(key => {
        dic.push({key:deck[key].key})
    })
    return JSON.stringify(dic)
}

export const attackCard = (card1, card2) => {
    const data = attackEnemyCard(card1.id, card2.id)
    // player1.setState({hp : data.player1.hp, board: data.player1.board})
    // player2.setState({hp : data.player2.hp, board: data.player2.board})
}