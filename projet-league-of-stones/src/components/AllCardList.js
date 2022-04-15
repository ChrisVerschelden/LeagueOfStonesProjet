import React from "react";
import CardReact from "./CardReact";
import 'bootstrap/dist/css/bootstrap.min.css';
class AllCardList extends React.Component {
    
    render() {
            const liste  = this.props.cards
            return  Object.keys(liste).map((key, index) => { 
                        return <div key={key} onClick={() => { 
                                                    if (Object.keys(this.props.choosed).length < 20){
                                                        this.props.choosed[key] = liste[key]; 
                                                        delete this.props.cards[key]; 
                                                        this.props.updateState(this.props.cards, this.props.choosed)
                                                    }
                                                }
                                            } className="col mt-3 cardReact"> <CardReact data={liste[key]} /> </div>
                    })
                        
        }
    }
     
    export default AllCardList; // le composant pourra être importé dans un autre composant