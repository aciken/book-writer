import './Login.css';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const [verification, setVerification] = useState(false)
    const [verifyError, setVerifyError] = useState('')
    const [code, setCode] = useState('');



    const submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login', {
            email, password
        })
        .then(res =>{
            if(res.data == 'failed'){
                setErrorMessage('Invalid email or password');
            } else if(res.data.verify != 1){
                setVerification(true);
            } else {
                navigate('/logedPage', {state: {email: email}})
            }
        })
    }

    const Verify = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/verify', {
            code, email
        })
        .then(res => {
            if(res.data.message === 'verified'){
                navigate('/logedPage', {state: {email: email}})
            } else{
                setVerifyError('Invalid verification code');
            }
        })


    }

    return (
        <div className="Login">
            <Link className='logo-log' to="/">Logo</Link>
            {verification ?
                        <form className='verify-box' onSubmit={Verify}>
                        <h1>Verify your email</h1>
                        <div>
                            <label htmlFor="code">Verification Code</label>
                            <input type="text" name='code' onChange={(e) => setCode(e.target.value)} required/>
                        </div>
                        <p>{verifyError}</p>
                        <button type='submit'>Verify</button>
                    </form> :  
            
        
        
            <form onSubmit={submit}>
                <h1>Welcome Back!</h1>
                <div className="input-wrapper">
                    <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                </div>
                <p>{errorMessage}</p>
                <button type='submit'>Login</button>
                <p>Don't have account? <Link to="/signup" className='have-acc'>Signup</Link></p>
            </form>
}
        </div>
    );
}