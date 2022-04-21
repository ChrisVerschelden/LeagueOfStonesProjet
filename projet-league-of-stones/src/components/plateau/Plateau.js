import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PlateauDeck from './PlateauDeck'


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
            <div class=" vh-100 row align-items-center flex-grow-1 fixed-top">
                <div class=' align-items-center'>
                    <div class="row justify-content-md-center">
                        <PlateauDeck deck={'cards'} clickHandler={handleClickAdversary} />
                        <div class="col col-md-3 ">
                            <div class="card-before card border-3 border-light">
                                <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ivern_0.jpg" class="card-img-top" alt="image de perso nul"></img>
                                <div class="bg-dark text-secondary">
                                    <span>le nom du perso</span>
                                </div>
                            </div>
                        </div>
                        <div class="col col-md-3 ">
                            <div class="card-before card border-3 border-light">
                                <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ivern_0.jpg" class="card-img-top" alt="image de perso nul"></img>
                                <div class="bg-dark text-secondary">
                                    <span>le nom du perso</span>
                                </div>
                            </div>
                        </div>
                        <div class="col col-md-3 ">
                            <div class="card-before card border-3 border-light">
                                <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ivern_0.jpg" class="card-img-top" alt="image de perso nul"></img>
                                <div class="bg-dark text-secondary">
                                    <span>le nom du perso</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div class="row justify-content-md-center">
                        <PlateauDeck deck={'cards'} clickHandler={handleClickPlayer} />
                        <div class="col col-md-3 ">
                            <div class="card-before card border-3 border-light">
                                <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ivern_0.jpg" class="card-img-top" alt="image de perso nul"></img>
                                <div class="bg-dark text-secondary">
                                    <span>le nom du perso</span>
                                </div>
                            </div>
                        </div>
                        <div class="col col-md-3 ">
                            <div class="card-before card border-3 border-light">
                                <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ivern_0.jpg" class="card-img-top" alt="image de perso nul"></img>
                                <div class="bg-dark text-secondary">
                                    <span>le nom du perso</span>
                                </div>
                            </div>
                        </div>
                        <div class="col col-md-3 ">
                            <div class="card-before card border-3 border-light">
                                <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ivern_0.jpg" class="card-img-top" alt="image de perso nul"></img>
                                <div class="bg-dark text-secondary">
                                    <span>le nom du perso</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Plateau;