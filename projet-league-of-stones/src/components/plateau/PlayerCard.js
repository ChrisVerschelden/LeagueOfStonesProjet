import React from "react"

export const PlayerCard = (props) => {

    const turnIndicator = props.turn ? <p className="turn-indicator">YOUR TURN</p> : <p className="turn-indicator">WAITING FOR OPPONENT</p>;
    return(
        <div className="card float-left border-3 border-dark player">
            <img src={props.img} className="card-img card-cover"/>
            <div>
                <p className='nom-perso w-100'>
                    {props.name}
                </p>
                {turnIndicator}
                <div className="player-health">
                    <p className="player-health-text">{props.pv} PV</p>
                </div>
            </div>
        </div>
    );
}