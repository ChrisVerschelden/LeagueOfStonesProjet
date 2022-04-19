import React, {useState, useEffect} from "react";
import { useCookies } from 'react-cookie';

import { connect } from '../utils/queries.js';

const FormConnexion = () => {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

    const [pristine_email, pristine_setemail] = useState(true);
    const [pristine_password, pristine_setPassword] = useState(true);
    
    const [cookies, setCookie] = useCookies(['name']);

    const handleSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        
        const response = await connect(email, password);
        if (response) {
            if ("status" in response) {
                switch (response.status) {
                    case 200:
                        const data = await response.json();
                        if (data) {
                            if ("token" in data) {
                                let expiration = new Date();
                                expiration.setHours(expiration.getHours() + 8);
                                console.log("setting session cookie");
                                console.log(expiration);
                                setCookie("session", data.token, {
                                    expires: expiration
                                });
                                document.location.href = '/successplusplus'
                            }
                        }
                        break;
                
                    default:
                        break;
                }
            }
        }
    }

    return (
        <div className='container-fluid vh-100'>
          <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="col col-md-6">
                <div className="form-group">
                    <label >Email</label>
                    <input onChange={e => setemail(e.target.value)} onBlur={() => pristine_setemail(false)} type="text" className="form-control" id="email" aria-describedby="emailHelp" placeholder="your email here" value={email}></input>
                    <span>{email === "" && !pristine_email ? <span className='text-danger'>can't be empty !</span> : ""}</span>
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input onChange={e => setPassword(e.target.value)} onBlur={() => pristine_setPassword(false)} type="password" className="form-control" id="password" placeholder="Password" value={password}></input>
                    <span>{password === "" && !pristine_password ? <span className='text-danger'>can't be empty !</span> : ""}</span>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary m-3">Submit</button>
                </div>
            </form>
          </div>
        </div>
    );
}

export default FormConnexion;