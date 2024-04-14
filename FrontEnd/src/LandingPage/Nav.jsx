import './Nav.css';
import { Link } from 'react-router-dom';


export function Nav() {
    return (
        <div className="nav">
            <div className="nav-layout">
                <p>Logo</p>
                <div className="nav-links">
                    <a href="">Pricing</a>
                    <a href="">FAQ</a>
                </div>
                <div className="nav-links">
                    <Link to="/login">Login</Link>
                    <Link to="/signup" className='sign-up-btn'>Sign up</Link>
                </div>   
            </div>
        </div>
    );
}