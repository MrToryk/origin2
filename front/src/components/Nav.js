
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/AuthProvider";

function Nav() {
    const auth = useAuth(); 
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link">Main</Link>
                <button onClick={() => auth.logOut()} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </nav>
    );
}


export { Nav };