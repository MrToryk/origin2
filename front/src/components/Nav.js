
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/AuthProvider";

function Nav() {
    const auth = useAuth(); 
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
            <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link">Main</Link>           
                <Link to="/cart" className="nav-item nav-link"><i class="bi bi-cart"></i></Link>     
                {console.log(localStorage.getItem("site"))}
                {localStorage.getItem("site") ? <button onClick={() => auth.logOut()} className="btn btn-link nav-item nav-link">Logout</button> :null}
            </div>
            </div>
        </nav>
    );
}


export { Nav };