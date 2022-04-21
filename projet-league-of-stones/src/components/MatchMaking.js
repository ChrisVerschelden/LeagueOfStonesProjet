import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import "../App.css"


const MatchMaking = () => {

    const [userId, setuserId] = useState('');
    const [matchmakingId, setmatchmakingId] = useState('');
    const [, set] = useState('');
    
    {/*const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        fetch('http://localhost:3001/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"userId" :userId, "matchmakingId" : matchmakingId})
        }).then(response => {return response})
        .then(data => {
            const status = data.status
            data = data.json()
            if (status === 200) {
                alert('ok')
            } else {
                alert('pas ok')
            }
        })
    }
*/}
    return (
        <div className='container-fluid vh-100'>
            <div className=" justify-content-center">
                <h4 className="text-white p-4">Liste des joueurs prets à faire une partie</h4>
                
                <div class="row">
                    <div class="col-lg-10 bg-dark mx-auto rounded l">
                                    
                        <div class="table-responsive">
                            <table class="table table-dark table-fixed table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" class="col-4">#</th>
                                        <th scope="col" class="col-4">Players</th>
                                        <th scope="col" class="col-4">Informations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="col-4">1</td>
                                        <td class="col-4">Otto</td>
                                        <td class="col-4">@mdo</td>
                                    </tr>
                                    <tr>
                                        <td class="col-4">2</td>
                                        <td class="col-4">Thornton</td>
                                        <td class="col-4">@fat</td>
                                    </tr>
                                    <tr>
                                        <td class="col-4">2</td>
                                        <td class="col-4">Thornton</td>
                                        <td class="col-4">@fat</td>
                                    </tr>
                                    <tr>
                                        <td class="col-4">2</td>
                                        <td class="col-4">Thornton</td>
                                        <td class="col-4">@fat</td>
                                    </tr>
                                    <tr>
                                        <td class="col-4">2</td>
                                        <td class="col-4">Thornton</td>
                                        <td class="col-4">@fat</td>
                                    </tr>
                                    <tr>
                                        <td class="col-4">2</td>
                                        <td class="col-4">Thornton</td>
                                        <td class="col-4">@fat</td>
                                    </tr>
                                    <tr>
                                        <td class="col-4">2</td>
                                        <td class="col-4">Thornton</td>
                                        <td class="col-4">@fat</td>
                                    </tr>
                                    <tr>
                                        <td class="col-4">2</td>
                                        <td class="col-4">Thornton</td>
                                        <td class="col-4">@fat</td>
                                    </tr>
                                    <tr>
                                        <td class="col-4">2</td>
                                        <td class="col-4">Thornton</td>
                                        <td class="col-4">@fat</td>
                                    </tr>
                                    <tr>
                                        <td class="col-4">2</td>
                                        <td class="col-4">Thornton</td>
                                        <td class="col-4">@fat</td>
                                    </tr>
                                    <tr>
                                        <td class="col-4">2</td>
                                        <td class="col-4">Thornton</td>
                                        <td class="col-4">@fat</td>
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