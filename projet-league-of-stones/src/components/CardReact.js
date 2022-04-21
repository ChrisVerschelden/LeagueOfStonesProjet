import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
class CardReact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {attack:false,}
    }

    hasAttacked() {
        this.setState({attack:true,})
    }


    
    render() { 
            const address = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.props.data.key + "_0.jpg"
            let stars = []
            const num = parseInt(this.props.data.info.difficulty)
            for (let step = 0; step < num; step++) {
                stars.push(<span style={{color: 'gold'}}>★</span>)
            }

            return (
                <div className="card border-3 border-light bg-black cardReact" style={{width: '10rem', height: '13rem'}}>
                    <img src={address} className="card-img card-cover" alt="image de perso nul"/>
                    <p className='nom-perso w-100'>
                        {stars}
                        <br></br>
                        {this.props.data.name}
                    </p>
                    <div class="quarter-circle-bottom-left"></div>
                    <span className="text-card-left">{this.props.data.info.attack}</span>
                    <div class="quarter-circle-bottom-rigth"></div>
                    <span className="text-card-rigth">{this.props.data.info.defense}</span>
                </div>
            )
        }
    }
    
    export default CardReact; // le composant pourra être importé dans un autre composant