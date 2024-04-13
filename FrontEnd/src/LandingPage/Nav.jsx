import './Nav.css';


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
                <a href="">Login</a>
                <a href="" className='sign-up-btn'>Sign up</a>
                </div>   
            </div>
        </div>
    );
}