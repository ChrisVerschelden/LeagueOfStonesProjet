import React from "react";
import ChoosedCardList from "./ChoosedCardList";
import AllCardList from "./AllCardList" 
import 'bootstrap/dist/css/bootstrap.min.css';
import {stringifyDeck} from "../utils/osef";
import {initDeck} from "../utils/queries";
import {getMatchInfo} from "../utils/queries"

class Interface extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'cardList' : {},
            'choosedCardList' : {},
            'canValidate': false,
            'deckMessage': 'MON DECK'
        };
    }

    async componentDidMount() {
        let matchInfo = await (await getMatchInfo(this.props.cookies)).json()

        if (matchInfo.player1.deck > 0 && matchInfo.player2.deck > 0) {
            document.location.href = '/game'
        }
        const result = {}
        fetch('http://localhost:3001/cards')
        .then((data) => {
            return data.json()
        }).then( data => {
            data = data.sort((champA, champB) => {
                return (champA.name > champB.name)
            })
            for (const character of data) {
                result[character['_id']] = character 
            }
            this.setState({'cardList':result})
        })
    }
    
    handleUpdate = (p_cards, p_choosed) => {
        if (this.state.deckMessage !== 'DECK VALIDÉ !') {
           if(Object.keys(p_choosed).length === 20){
                this.setState({'cardList':p_cards, 'choosedCardList': p_choosed, 'canValidate': true})
            } else {
                this.setState({'cardList':p_cards, 'choosedCardList': p_choosed, 'canValidate': false})
            } 
        }
    }

    sendDeck = async () => {
        console.log(this.props.cookies)
        const delay = ms => new Promise(res => setTimeout(res, ms));
        this.setState({'deckMessage': 'DECK VALIDÉ !'})
        // let output = ""
        // Object.keys(this.state.choosedCardList).map(key => {
        //     output += this.state.choosedCardList[key].name + "\n"
        // })
        let matchInfo = await getMatchInfo(this.props.cookies)
        await delay(1000)
        const makingDeck = stringifyDeck(this.state.choosedCardList)
        const deckDone = await setInterval(async () => {
            console.log('doing deck')
            let result2 = await(await initDeck( this.props.cookies,makingDeck)).json()
            console.log(result2)
            if (result2.name) {
                clearInterval(deckDone)
                await delay(5000)
                const interval = await setInterval(async () => {
                    console.log('LET ME IN')
                    matchInfo = await (await getMatchInfo(this.props.cookies)).json()
                    console.log(matchInfo)
                    if (matchInfo.player1.deck !== 0 && matchInfo.player2.deck !== 0) {
                        clearInterval(interval)
                        await delay(5000)
                        document.location.href = '/game'
                    }

                }, 2000);

            }
        }, 2000);

    }



    render() {
        let display_cards = ""
        let size_deck  = 6
        let hidden = ""
        if (this.state.deckMessage === 'DECK VALIDÉ !') {
            display_cards = "d-none"
            size_deck  = 12
            hidden = 'hidden'
        }

        return (
                <section className="container-fluid pb-5">
                    <div className="row">
                        <div className={"col-md-6 " + display_cards}>
                            <div className='container-fluid containers-all-cards pb-4'>
                                <div className="row ">
                                    <div> <h1> CHAMPIONS DISPONIBLES </h1></div>
                                    <AllCardList updateState={this.handleUpdate} cards={this.state.cardList} choosed={this.state.choosedCardList}/>
                                </div>
                            </div>
                        </div>
                        <div className={"col-md-" + size_deck}>
                            <div className='container-fluid h-100 containers-choosed-cards pb-4'>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h1 class="card-title mb-0">{this.state.deckMessage}</h1>
                                    <button type="button" class="btn btn-primary" disabled={!this.state.canValidate} hidden={hidden} onClick={this.sendDeck}> Valider deck </button>
                                </div>
                                <div className="row d-flex justify-content-start">
                                    <ChoosedCardList updateState={this.handleUpdate} cards={this.state.cardList} choosed={this.state.choosedCardList} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
    }
    
    export default Interface; // le composant pourra être importé dans un autre composant