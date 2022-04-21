import React, {useState, useEffect} from "react";
import CardReact from "../CardReact";
import 'bootstrap/dist/css/bootstrap.min.css';

const PlateauDeck = (props) => {
    return (
        Object.keys(props.deck).map((key, index) => { 
            return <div key={key} onClick={() => { 
                        props.clickHandler({selected: true, card:props.deck[key]})
                    }
                } className="col-3 cardReact-anime card-game"> <CardReact data={props.deck[key]} /> </div>
            })
    );
}

export default PlateauDeck;