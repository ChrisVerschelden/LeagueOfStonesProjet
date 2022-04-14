import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const FormConnexion = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [pristine_userName, pristine_setUserName] = useState(true);
    const [pristine_password, pristine_setPassword] = useState(true);

    const handleSubmit = () => {
        fetch('http://localhost:3001/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name" :userName, "password" : password})
        }).then(response => {
            if (response.status !== 200) {
                document.location.href = '/successplusplus'
            }else if (response.status === 200) {
                document.location.href = '/';
            }
        })
    }

    return (
        <div className='container-fluid'>
          <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="col col-md-6">
                <div className="form-group">
                    <label >Pseudo</label>
                    <input onChange={e => setUserName(e.target.value)} onBlur={() => pristine_setUserName(false)} type="text" className="form-control" id="username" aria-describedby="pseudoHelp" placeholder="your pseudo here" value={userName}></input>
                    <span>{userName === "" && !pristine_userName ? <span className='text-danger'>can't be empty !</span> : ""}</span>
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