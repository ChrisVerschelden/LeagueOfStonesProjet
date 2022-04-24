import React, {useState, useEffect} from "react";
import CardReact from "../CardReact";
import 'bootstrap/dist/css/bootstrap.min.css';

const PlateauDeck = (props) => {
    if (props.deck) {
        let bonus_class = props.hand ? "col cardReact-anime card-game scale-down" : "col cardReact-anime card-game";
        let data = Array.from(props.deck)
        return ( data.map((elem, index) => {
            if (Object.keys(props.selectedCard.card).length > 0 && elem.key === props.selectedCard.card.key) {
                bonus_class += " selected-card"
            } else {
                bonus_class = bonus_class.replace(" selected-card", " ")
            }
            return <div key={index} onClick={() => { 
                        props.clickHandler({selected: true, card:elem})
                    }
                } className={bonus_class}> <CardReact data={elem} /> </div>
            })
        )
    } else {
        return (
            <div className="col-12" style={{height:"12rem"}}>hey</div>
        );
}
}

export default PlateauDeck;