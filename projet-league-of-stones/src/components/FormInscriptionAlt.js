import React, {useState, useEffect} from "react";

import { register } from '../utils/queries.js';

const FormInscriptionAlt = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    const [pristine_userName, pristine_setUserName] = useState(true);
    const [pristine_email, pristine_setEmail] = useState(true);
    const [pristine_password, pristine_setPassword] = useState(true);
    const [pristine_passwordConf, pristine_setPasswordConf] = useState(true);

    const [error_message, set_error_message] = useState('')

    function resetForm() {
        setEmail('');setPassword('');setPasswordConf('');setUserName(''); 
        pristine_setEmail(true);pristine_setPassword(true); pristine_setPasswordConf(true);pristine_setUserName(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        
        const response = await register(userName, email, password);
        if (response) {
            if ("status" in response) {
                switch (response.status) {
                    case 200:
                        const data = await response.json();
                        if (data) {
                            if ("id" in data) {
                                document.location.href = '/login'
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
                        <label >Pseudo</label>
                        <input onChange={e => setUserName(e.target.value)} onBlur={() => pristine_setUserName(false)} type="text" className="form-control" id="username" aria-describedby="pseudoHelp" placeholder="your pseudo here" value={userName}></input>
                        <span>{userName === "" && !pristine_userName? <span className='text-danger'>can't be empty !</span> : ""}</span>
                    </div>
                    <div className="form-group">
                        <label >Email address</label>
                        <input onChange={e => setEmail(e.target.value)} onBlur={() => pristine_setEmail(false)} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email}></input>
                        <span>{email === "" && !pristine_email? <span className='text-danger'>can't be empty !</span> : ""}</span>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input onChange={e => setPassword(e.target.value)} onBlur={() => pristine_setPassword(false)} type="password" className="form-control" id="password" placeholder="Password" value={password}></input>
                        <span>{password === "" && !pristine_password ? <span className='text-danger'>can't be empty !</span> : ""}</span>
                    </div>
                    <div className="form-group">
                        <label >Confirm Password</label>
                        <input onChange={e => setPasswordConf(e.target.value)} onBlur={() => pristine_setPasswordConf(false)} type="password" className="form-control" id="passwordConfirm" placeholder="confirm password" value={passwordConf}></input>
                        <span>{password !== passwordConf && !pristine_password ? <span className='text-danger'>Must match password</span> : ""}</span>
                    </div>
                    <div>
                        <button type="button" onClick={() => {resetForm()}} className="btn btn-secondary m-3">reset</button>
                        <button type="submit" className="btn btn-primary m-3">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormInscriptionAlt;