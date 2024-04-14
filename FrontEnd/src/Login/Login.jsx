import './Login.css';
import { Link } from 'react-router-dom';

export function Login() {
    return (
        <div className="Login">
            <form>
                <h1>Welcome Back!</h1>
                <div className="input-wrapper">
                    <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required/>
                    </div>
                    <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' required/>
                    </div>
                </div>
                <p></p>
                <button>Login</button>
                <p>Don't have account? <Link to="/signup" className='signup-here'>Signup</Link></p>
            </form>
        </div>
    );
}