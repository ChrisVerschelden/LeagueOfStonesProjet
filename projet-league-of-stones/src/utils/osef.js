import CardReact from "../components/CardReact";
import {attackEnemyCard, pickCard, playCard} from "./queries";

/*
const pickOneCard = async (numPlayer) => {
    let data = await pickCard()
    if (numPlayer === 1 ) {
        // game.setState({player1_hand = data.player.hand})
    }
    else {
        // game.setState({player2_hand = data.player.hand})
    }

}
 */

/*
const playOneCard = async (card, numPlayer) => {
    let data = await playCard(card.id)
    if (numPlayer === 1 ) {
        // game.setState({player1_board: data.player.board, player1_hand = data.player.hand})
    }
    else {
        // game.setState({player2_board: data.player.board, player2_hand = data.player.hand})
    }
}
*/

export const stringifyDeck = (deck) => {
    const dic = []
    Object.keys(deck).map(key => {
        dic.push({key:deck[key].key})
    })
    return JSON.stringify(dic)
}
/*
export const attackCard = async (card1, card2) => {
    const data = await attackEnemyCard(card1.id, card2.id)
    // game.setState({player1_hp : data.player1.hp, player1_board: data.player1.board})
    // game.setState({player2_hp : data.player2.hp, player2_board: data.player2.board})
}
*/