import React from "react";
import ChoosedCardList from "./ChoosedCardList";
import AllCardList from "./AllCardList" 
import 'bootstrap/dist/css/bootstrap.min.css';
import {stringifyDeck} from "../utils/osef";
import {initDeck} from "../utils/queries";

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

    componentDidMount() {
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

    sendDeck = () => {
        this.setState({'deckMessage': 'DECK VALIDÉ !'})
        let output = ""
        Object.keys(this.state.choosedCardList).map(key => {
            output += this.state.choosedCardList[key].name + "\n"
        })
        initDeck(stringifyDeck(this.state.choosedCardList))
        document.location.href = '/game'
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