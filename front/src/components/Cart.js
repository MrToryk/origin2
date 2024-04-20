
import { useAuth } from "../hooks/AuthProvider";
import { Link} from "react-router-dom";

const Cart = () => {
  const auth = useAuth();
  return (
    <div className="container">
      <div className="topofpage">
        <div className="childtop">
        <Link to ='/dashboard' className="buttonCart">exit cart</Link>
        <button onClick={() => auth.logOut()} className="btn-submit">
          logout
        </button> 
        </div>
        <div className="childtop">
        <h1 className="mainH1">Welcome! {auth.user?.username}</h1>      
        </div>
      </div>
    </div>
  );
};

export default Cart;