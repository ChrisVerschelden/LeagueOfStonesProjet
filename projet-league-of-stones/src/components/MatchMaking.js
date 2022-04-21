import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import "../App.css"

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKhanda } from "@fortawesome/free-solid-svg-icons"


const MatchMaking = () => {

    const [userId, setuserId] = useState('');
    const [matchmakingId, setmatchmakingId] = useState('');
    const [, set] = useState('');
    
    
    return (
        <div className='container-fluid vh-100'>
            <div className=" justify-content-center">
                <h4 className="text-white p-4">Liste des joueurs prets à faire une partie</h4>
                
                <div className="row">
                    <div className="col-lg-10 bg-dark mx-auto rounded l">
                                    
                        <div className="table-responsive">
                            <table className="table table-dark table-fixed table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" className="col-3">#</th>
                                        <th scope="col" className="col-3">Players</th>
                                        <th scope="col" className="col-3">Informations</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="col-3">1</td>
                                        <td className="col-3">Otto</td>
                                        <td className="col-3">@mdo</td>
                                        <td className="col-3"><a><FontAwesomeIcon icon={faKhanda}/></a></td>
                                        
                                    </tr>
                                    <tr>
                                        <td className="col-3">2</td>
                                        <td className="col-3">Thornton</td>
                                        <td className="col-3">@fat</td>
                                        <td className="col-3"><a><FontAwesomeIcon icon={faKhanda}/></a></td>
                                    </tr>
                                    <tr>
                                        <td className="col-3">2</td>
                                        <td className="col-3">Thornton</td>
                                        <td className="col-3">@fat</td>
                                        <td className="col-3"><a><FontAwesomeIcon icon={faKhanda}/></a></td>
                                    </tr>
                                    <tr>
                                        <td className="col-3">2</td>
                                        <td className="col-3">Thornton</td>
                                        <td className="col-3">@fat</td>
                                        <td className="col-3"><a><FontAwesomeIcon icon={faKhanda}/></a></td>
                                    </tr>
                                    <tr>
                                        <td className="col-3">2</td>
                                        <td className="col-3">Thornton</td>
                                        <td className="col-3">@fat</td>
                                        <td className="col-3"><a><FontAwesomeIcon icon={faKhanda}/></a></td>
                                    </tr>
                                    <tr>
                                        <td className="col-3">2</td>
                                        <td className="col-3">Thornton</td>
                                        <td className="col-3">@fat</td>
                                        <td className="col-3"><a><FontAwesomeIcon icon={faKhanda}/></a></td>
                                    </tr>
                                    <tr>
                                        <td className="col-3">2</td>
                                        <td className="col-3">Thornton</td>
                                        <td className="col-3">@fat</td>
                                        <td className="col-3"><a><FontAwesomeIcon icon={faKhanda}/></a></td>
                                    </tr>
                                    <tr>
                                        <td className="col-3">2</td>
                                        <td className="col-3">Thornton</td>
                                        <td className="col-3">@fat</td>
                                        <td className="col-3"><a><FontAwesomeIcon icon={faKhanda}/></a></td>
                                    </tr>
                                    <tr>
                                        <td className="col-3">2</td>
                                        <td className="col-3">Thornton</td>
                                        <td className="col-3">@fat</td>
                                        <td className="col-3"><a><FontAwesomeIcon icon={faKhanda}/></a></td>
                                    </tr>
                                    <tr>
                                        <td className="col-3">2</td>
                                        <td className="col-3">Thornton</td>
                                        <td className="col-3">@fat</td>
                                        <td className="col-3"><a><FontAwesomeIcon icon={faKhanda}/></a></td>
                                    </tr>
            
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default MatchMaking;