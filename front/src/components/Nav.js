import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/AuthProvider";

function Nav() {
    const auth = useAuth(); 
    return (
        <nav className="navbar border-bottom border-body">
            <div className="container">
                <div className="navbar-nav">
                    <Link to="/" className="nav-item nav-link">Main</Link>                     
                </div>
                <div className='d-flex w-25'>
                    <Link to="/cart" className="nav-item nav-link col-6"><i className="bi bi-cart"></i></Link>  
                    {auth?.token 
                        ?  <div className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {auth.user.name}
                        </Link>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">
                            <button onClick={() => auth.logOut()} className="btn btn-link nav-item nav-link d-inline">Logout</button> </a></li>
                        </ul>
                    </div> 
                        
                        : <Link to="/login" className="nav-item nav-link d-inline">Login</Link>}
                </div>
            </div>
        </nav>
    );
}


export { Nav };