import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PlateauDeck from './PlateauDeck'
import CardReact from "../CardReact";


const Plateau = () => {
    const [selectedCardAdversary, setSelectedCardAdversary] = useState({selected:false})
    const [selectedCardPlayer, setSelectedCardPlayer]       = useState({selected:false})

    const checkStateSelection = () => {
        if (selectedCardAdversary.selected === true && selectedCardPlayer.selected === true) {
            console.log('yo')
        }
    }

    const handleClickAdversary = (data) => {
        setSelectedCardAdversary(data)
        checkStateSelection()
    }

    const handleClickPlayer    = (data) => {
        setSelectedCardPlayer(data)
        checkStateSelection()
    }

    return (
        <div>
            <div className=" row align-items-center flex-grow-1 battleGround">
                <div className='align-items-center'>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <PlateauDeck deck={'cards'} clickHandler={handleClickPlayer} />
                            <div className="col-2 cardReact-anime card-game">
                                <CardReact data={{key:"Ivern", name:"Ivern", info : {attack:9, defense:9, difficulty:9, magic:9}}} />
                            </div>
                            <div className="col-2 cardReact-anime card-game">
                                <CardReact data={{key:"Ivern", name:"Ivern", info : {attack:9, defense:9, difficulty:9, magic:9}}} />
                            </div>
                            <div className="col-2 cardReact-anime card-game">
                                <CardReact data={{key:"Ivern", name:"Ivern", info : {attack:9, defense:9, difficulty:9, magic:9}}} />
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <PlateauDeck deck={'cards'} clickHandler={handleClickPlayer} />
                            <div className="col-2 cardReact-anime">
                                <CardReact data={{key:"Ivern", name:"Ivern", info : {attack:9, defense:9, difficulty:9, magic:9}}} />
                            </div>
                            <div className="col-2 cardReact-anime">
                                <CardReact data={{key:"Ivern", name:"Ivern", info : {attack:9, defense:9, difficulty:9, magic:9}}} />
                            </div>
                            <div className="col-2 cardReact-anime">
                                <CardReact data={{key:"Ivern", name:"Ivern", info : {attack:9, defense:9, difficulty:9, magic:9}}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Plateau;