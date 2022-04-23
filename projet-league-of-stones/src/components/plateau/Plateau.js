import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PlateauDeck from './PlateauDeck'
import CardReact from "../CardReact";
import {initDeck, getMatchInfo, attackEnemyCard, pickCard, currentConnectedUser} from "../../utils/queries";
import {stringifyDeck} from "../../utils/osef";
import {useCookies} from "react-cookie";
import { PlayerCard } from "./PlayerCard";
// {}

const Plateau = (props) => {
    const [cookies, setCookie] = useCookies(['name']);
    const [selectedCardAdversary, setSelectedCardAdversary] = useState({selected:false, card: {}})
    const [selectedCardPlayer, setSelectedCardPlayer]       = useState({selected:false, card: {}})
    const [currentPlayer, setPlayer]       = useState({ player:"" })

    const [board, setBoard]                                 = useState({player1:{board:[]}, player2:{board:[]}})

    const checkStateSelection = async () => {
        if (selectedCardAdversary.selected === true && selectedCardPlayer.selected === true) {
            await attackEnemyCard(selectedCardPlayer.card.key, selectedCardAdversary.card.key)
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

    const handlePickCard = async () => {
        await pickCard(cookies.session)
        await updateMachData()
    }

    const updateMachData = async () => {
        console.log(currentPlayer.player)
        let result = await (await getMatchInfo(cookies.session)).json()
        if(currentPlayer.player === "1") {
            setBoard({player1: result.player1, player2: result.player2});
        }
        else {
            setBoard({player1: result.player2, player2: result.player1});
            console.log(result)
            console.log("ici")
            console.log(board.player1.hand)


        }
    }



    useEffect(() => {
        async function fetchData() {
            console.log("useEffect")
            let myName = await (await currentConnectedUser(cookies.session)).json()
            const val = myName['connectedUser']['name']
            let result = await (await getMatchInfo(cookies.session)).json()
            const interval = setInterval(async () => {
                console.log('LET ME IN')
                result = await (await getMatchInfo(cookies.session)).json()
                console.log(result)
                if (result.status !== 'Deck is pending') {
                    clearInterval(interval)
                }

                }, 2000);
            if(result.player1.name=== val.toString()) {
                setPlayer({player : "1"})
            }
            else {
                setPlayer({player : "2"})
            }

            await updateMachData()
            console.log("bonjour")
        }
        fetchData();
    }, []);

    useEffect(() => { console.log("board"); console.log(board); }, [board]);



    return (
        <div>
            <button onClick={updateMachData}>Click here</button>
            <div className="d-flex row align-items-start battleGround">
                <div className='align-items-center mt-4'>
                    <div className="container-fluid mt-4">
                        <div className="row">
                            <div className='col-2'>
                                <PlayerCard turn={false} name={board.player2.name} pv={board.player2.hp} img={"https://e6.pngbyte.com/pngpicture/265700/png-Don-T-Starve-Characters-Woodie-Transparent-Afeitarse-Clipart-don-t-starve.png"} />
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
                            <div className='col-2'>
                                <PlayerCard turn={board.player2.turn} name={board.player1.name} pv={board.player1.hp} img={"https://e6.pngbyte.com/pngpicture/265700/png-Don-T-Starve-Characters-Woodie-Transparent-Afeitarse-Clipart-don-t-starve.png"} />
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