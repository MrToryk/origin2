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
                <div className='d-flex justify-content-end gap-3'>
                    <Link to="/cart" className="nav-item nav-link"><i className="bi bi-cart"></i></Link>  
                    {auth?.token 
                        ?  <div className="nav-item dropdown ml-4">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {auth.user.name}
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item"  onClick={() => auth.logOut()}>Logout</Link></li>
                                </ul>
                            </div> 
                        
                        : <Link to="/login" className="nav-item nav-link d-inline">Login</Link>}
                </div>
            </div>
        </nav>
    );
}


export { Nav };