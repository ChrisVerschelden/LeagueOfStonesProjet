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
            return (
                <div className="card-before card border-3 border-light bg-black cardReact" style={{width: '9rem'}}>
                    <img src={address} className="card-img-top" alt="image de perso nul"/>
                    <div className="bg-dark text-secondary panel-footer text-center">
                        <p className='bg-black float-start w-100'>{this.props.data.name}</p>
                        <span className='float-start'> attack :     {this.props.data.info.attack}     </span><br/>
                        <span className='float-start'> defense :    {this.props.data.info.defense}    </span><br/>
                        {/* <span className='float-start'> difficulty : {this.props.data.info.difficulty} </span><br/>
                        <span className='float-start'> magic :      {this.props.data.info.magic}      </span> */}
                    </div>
                </div>
            )
        }
    }
    
    export default CardReact; // le composant pourra être importé dans un autre composant