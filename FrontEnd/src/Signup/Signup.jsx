import './Signup.css';
import { Form, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


export function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [code, setCode] = useState('');
    const [verifyError, setVerifyError] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const [verification, setVerification] = useState(false)

    const Submit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setErrorMessage('Password does not match');
        }else if(password.length < 6){
            setErrorMessage('Password must be at least 6 characters')    
    } else {
        setErrorMessage('')
        axios.put('http://localhost:3000/signup', {
            email, password
    })
    .then(res => {
        if(res.data.message === 'exist'){
            setErrorMessage('Email already exist');
        } else{
            setVerification(true);
        }
    })

    
    }

}

    const Verify = (e) => {
        e.preventDefault();

        axios.put('http://localhost:3000/verify', {
            code, email
        })
        .then(res => {
            console.log(res.data);
            if(res.data.message === 'verified'){
                window.location.href = '/logedPage';
            } else{
                setVerifyError('Invalid verification code');
            }
        })
    }



    return (
        <div className="Signup">
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
            <form onSubmit={Submit}>
                <h1>Sign up</h1>
                <div className="input-wrapper">
                    <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    </div>
                </div>
                <p className='error-message'>{errorMessage}</p>
                <button type='submit'>Signup</button>
                <p>Already have account?<Link to="/login">Login</Link></p>
            </form>
}
        </div>
    );
}