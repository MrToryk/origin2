import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/AuthProvider";

function Nav({cart}) {
    //console.log("Nav", cart);
    const auth = useAuth(); 
    return (
        <nav className="navbar border-bottom border-body">
            <div className="container">
                <div className="navbar-nav">
                    <Link to="/" className="nav-item nav-link">Main</Link>                     
                </div>
                <div className='d-flex justify-content-end gap-3'>
                    
                    <Link to="/cart" className="nav-item nav-link position-relative">
                        <i className="bi bi-cart"></i>
                        { cart > 0 &&
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                { cart }
                                <span className="visually-hidden">items in the cart</span>
                            </span>
                        }          
                    </Link>  
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