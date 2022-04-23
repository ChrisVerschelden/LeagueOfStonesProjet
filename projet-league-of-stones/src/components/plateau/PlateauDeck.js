import React, {useState, useEffect} from "react";
import CardReact from "../CardReact";
import 'bootstrap/dist/css/bootstrap.min.css';

const PlateauDeck = (props) => {
    if (props.deck) {
        let data = Array.from(props.deck)
        return ( data.map((elem, index) => {
            return <div key={index} onClick={() => { 
                        props.clickHandler({selected: true, card:elem})
                    }
                } className="col-3 cardReact-anime card-game"> <CardReact data={elem} /> </div>
            })
        )
    } else {
        return (
            <p></p>
        );
}
}

export default PlateauDeck;