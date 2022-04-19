import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const FormConnexion = () => {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

    const [pristine_email, pristine_setemail] = useState(true);
    const [pristine_password, pristine_setPassword] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email" :email, "password" : password})
        }).then(response => {return response})
        .then(data => {
            const status = data.status
            data = data.json()
            if (status === 200) {
                alert(data.token)
                document.location.href = '/successplusplus'
            } else {
                alert(data.error)
            }
            
        })
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