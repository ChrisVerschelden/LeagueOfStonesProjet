import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PlateauDeck from './PlateauDeck'
import CardReact from "../CardReact";
import {initDeck, getMatchInfo, attackEnemyCard} from "../../utils/queries";
import {stringifyDeck} from "../../utils/osef";
import {useCookies} from "react-cookie";
import { PlayerCard } from "./PlayerCard";
// {}

const Plateau = (props) => {
    const [cookies, setCookie] = useCookies(['name']);
    const [selectedCardAdversary, setSelectedCardAdversary] = useState({selected:false, card: {}})
    const [selectedCardPlayer, setSelectedCardPlayer]       = useState({selected:false, card: {}})
    const [board, setBoard]                                 = useState({player1:{}, player2:{}})

    const checkStateSelection = async () => {
        if (selectedCardAdversary.selected === true && selectedCardPlayer.selected === true) {
            attackEnemyCard(selectedCardPlayer.card.key, selectedCardAdversary.card.key)
            const result = await getMatchInfo()
            setBoard({player1: result.player1, player2: result.player2});
        }
    }

    const handleClickAdversary = (data) => {
        setSelectedCardAdversary({selected: true, card: data});
        checkStateSelection();
    }

    const handleClickPlayer = (data) => {
        setSelectedCardPlayer({selected: true, card: data});
        checkStateSelection();
    }

    const handleClickHand = (data) => {
        return 0
    }

    useEffect(() => {
        async function fetchData() {
            console.log("useEffect")
            let result = await (await getMatchInfo(cookies.session)).json()
            const interval = setInterval(async () => {
                console.log('LET ME IN')
                result = await (await getMatchInfo(cookies.session)).json()
                console.log(result)
                if (result.status !== 'Deck is pending') {
                    clearInterval(interval)
                }

                }, 2000);
            setBoard({player1: result.player1, player2: result.player2});
            console.log("bonjour")
        }
        fetchData();
    }, []);

    useEffect(() => { console.log("board"); console.log(board); }, [board]);

    return (
        <div>
            <div className="d-flex row align-items-start battleGround">
                <div className='align-items-center mt-4'>
                    <div className="container-fluid mt-4">
                        <div className="row">
                            <h1>{board.player2.hp}</h1>
                            <div className='col-2'>
                                <PlayerCard turn={false} name={"Player name"} pv={"100"} img={"https://e6.pngbyte.com/pngpicture/265700/png-Don-T-Starve-Characters-Woodie-Transparent-Afeitarse-Clipart-don-t-starve.png"} />
                            </div>
                            <div className='col-10'>
                                <div className='row justify-content-center'>
                                    <PlateauDeck deck={board.player2.board} clickHandler={handleClickAdversary}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="border-3"></hr>
                    <div className="container-fluid">
                        <div className="row">
                            <h1>{board.player1.hp}</h1>
                            <div className='col-2'>
                                <PlayerCard turn={true} name={"Player name"} pv={"100"} img={"https://e6.pngbyte.com/pngpicture/265700/png-Don-T-Starve-Characters-Woodie-Transparent-Afeitarse-Clipart-don-t-starve.png"} />
                            </div>
                            <div className='col-10'>
                                <div className='row justify-content-center'>
                                    <PlateauDeck deck={board.player1.board} clickHandler={handleClickPlayer}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container fixed-bottom mb-n3 hand">
                    <div className='row'>
                        <div className="col-1 d-flex align-item-center">
                            <button className="btn btn-info h-3"> pick card</button>
                        </div>
                        <div className='col-11'>
                            <div className='row justify-content-center'>
                                <PlateauDeck deck={board.player1.hand} clickHandler={handleClickHand}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Plateau;