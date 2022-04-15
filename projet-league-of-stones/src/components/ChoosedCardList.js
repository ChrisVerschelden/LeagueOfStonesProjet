import React from "react";
import CardReact from "./CardReact";
import 'bootstrap/dist/css/bootstrap.min.css';
class ChoosedCardList extends React.Component {

    render() {
        const listeChoosed  = this.props.choosed
        return Object.keys(listeChoosed).map((key, index) => { 
                    return <div key={key} onClick={() => {
                                                this.props.cards[key] = listeChoosed[key]; 
                                                delete this.props.choosed[key]; 
                                                this.props.updateState(this.props.cards, this.props.choosed)
                                            }
                                        } className="col mt-3 cardReact-anime"> <CardReact data={listeChoosed[key]} /> </div>
                }) 
    }
}
        
    export default ChoosedCardList; // le composant pourra être importé dans un autre composant