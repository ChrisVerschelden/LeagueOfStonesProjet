import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PlateauDeck from './PlateauDeck'
import CardReact from "../CardReact";
import {initDeck, getMatchInfo, attackEnemyCard, pickCard, playCard, currentConnectedUser, endTurn, attackPlayer, finishMatch} from "../../utils/queries";
import {stringifyDeck} from "../../utils/osef";
import {useCookies} from "react-cookie";
import { PlayerCard } from "./PlayerCard";
// {}

const Plateau = (props) => {
    const [cookies, setCookie] = useCookies(['name']);
    const [selectedCardAdversary, setSelectedCardAdversary] = useState({selected:false, card: {}})
    const [selectedCardPlayer, setSelectedCardPlayer]       = useState({selected:false, card: {}})
    const [currentPlayer, setPlayer]                        = useState({ player:"" })
    const [board, setBoard]                                 = useState({player1:{board:[]}, player2:{board:[]}})

    const autorefresh = async (ms, num) => {
        setInterval(() => {
            updateMachData(num)
        }, ms)
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const checkStateSelection = async () => {
        console.log("les deux sont cliqué : " + selectedCardAdversary.selected + " " + selectedCardPlayer.selected)
        if (board.player2.board.length === 0 && selectedCardPlayer.selected === true){
            console.log('i am there')
            await attackPlayer(cookies.session, selectedCardPlayer.card.key)
            const result = await getMatchInfo(cookies.session)
            setSelectedCardAdversary({selected:false, card: {}})
            setSelectedCardPlayer({selected:false, card: {}})
            //await handleEndTurn()
            await updateMachData()
        }
        if (selectedCardAdversary.selected && selectedCardPlayer.selected) {
            console.log('i am in : ' + selectedCardPlayer.card.key + " " + selectedCardAdversary.card.key)
            await attackEnemyCard(cookies.session, selectedCardPlayer.card.key, selectedCardAdversary.card.key)
            const result = await getMatchInfo(cookies.session)
            setSelectedCardAdversary({selected:false, card: {}})
            setSelectedCardPlayer({selected:false, card: {}})
            //await handleEndTurn()
            await updateMachData()
        }
    }

    const handleClickAdversary = async (data) => {
        console.log("selected card Adversary = " + data.card.key)
        setSelectedCardAdversary(data);
        //await delay(200);
        checkStateSelection();
    }

    const handleClickPlayer = async (data) => {
        console.log("selected card Player = " + data.card.key)
        setSelectedCardPlayer(data);
        //await delay(200);
        checkStateSelection();
    }

    const handleClickHand = async (data) => {
        console.log("card played = " + data.card.key )
        await playCard(cookies.session, data.card.key)
        await updateMachData()
    }

    const handleEndTurn = async () => {
        console.log("turn ended")
        await endTurn(cookies.session)
        await updateMachData()
    }

    const handlePickCard = async () => {
        console.log("card picked")
        await pickCard(cookies.session)
        await updateMachData()
    }

    const handleFinishMatch = async () => {
        await finishMatch(cookies.session)
        await updateMachData()
    }

    const updateMachData = async (playNum = "") => {
        console.log(currentPlayer.player)
        let result = await (await getMatchInfo(cookies.session)).json()
        if(currentPlayer.player === "1" || playNum === "1") {
            setBoard({player1: result.player1, player2: result.player2});
        }
        else {
            setBoard({player1: result.player2, player2: result.player1});
        }
    }



    useEffect(() => {
        async function fetchData() {
            console.log("useEffect")
            let playNum = ""
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
                playNum = "1"
                await setPlayer({player : "1"})
            }
            else {
                playNum = "2"
                await setPlayer({player : "2"})
            }
            await updateMachData(playNum)
            autorefresh(4000, playNum);
            console.log("which player")
            console.log("bonjour")

            if (!result.player1.turn && !result.player2.turn) {
                await handleFinishMatch();
            }
        }
        fetchData();
    }, []);

    useEffect(() => { console.log("board"); console.log(board); }, [board]);



    return (
        <div>
            {/* <button onClick={updateMachData}>Click here</button> */}
            <div className="d-flex row align-items-start battleGround">
                <div className='align-items-center mt-4'>
                    <div className="container-fluid mt-4">
                        <div className="row">
                            <div className='col-2'>
                                <PlayerCard turn={board.player2.turn} name={board.player2.name} pv={board.player2.hp} img={"https://e6.pngbyte.com/pngpicture/265700/png-Don-T-Starve-Characters-Woodie-Transparent-Afeitarse-Clipart-don-t-starve.png"} />
                            </div>
                            <div className='col-10'>
                                <div className='row d-flex justify-content-center'>
                                    <PlateauDeck hand={false} selectedCard={selectedCardAdversary} deck={board.player2.board} clickHandler={handleClickAdversary}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="border-3"></hr>
                    <div className="container-fluid">
                        <div className="row">
                            <div className='col-2'>
                                <PlayerCard turn={board.player1.turn} name={board.player1.name} pv={board.player1.hp} img={"https://e6.pngbyte.com/pngpicture/265700/png-Don-T-Starve-Characters-Woodie-Transparent-Afeitarse-Clipart-don-t-starve.png"} />
                            </div>
                            <div className='col-10'>
                                <div className='row d-flex justify-content-center'>
                                    <PlateauDeck hand={false} selectedCard={selectedCardPlayer} deck={board.player1.board} clickHandler={handleClickPlayer}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container fixed-bottom mb-n3 hand">
                    <div className='row'>
                        <div className="col-1 d-flex align-item-center">
                            <button className="btn btn-info h-3" onClick={() => {handlePickCard()}}>pick card</button>
                        </div>
                        <div className='col-10' style={{height:"12rem"}}>
                            <div className='row justify-content-center'>
                                <PlateauDeck hand={true} selectedCard={{card:{}}} deck={board.player1.hand} clickHandler={handleClickHand}/>
                            </div>
                        </div>
                        <div className="col-1 d-flex align-item-center">
                            <button className="btn btn-info h-3" onClick={() => {handleEndTurn()}}>end turn</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Plateau;