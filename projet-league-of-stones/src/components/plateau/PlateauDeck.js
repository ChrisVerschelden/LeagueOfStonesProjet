import React, {useState, useEffect} from "react";
import CardReact from "../CardReact";
import 'bootstrap/dist/css/bootstrap.min.css';

const PlateauDeck = (props) => {
    if (props.deck) {
        let bonus_class = props.hand ? "col cardReact-anime card-game scale-down" : "col cardReact-anime card-game";
        let data = Array.from(props.deck)
        return ( data.map((elem, index) => {
            return <div key={index} onClick={() => { 
                        props.clickHandler({selected: true, card:elem})
                    }
                } className={bonus_class}> <CardReact data={elem} /> </div>
            })
        )
    } else {
        return (
            <p></p>
        );
}
}

export default PlateauDeck;