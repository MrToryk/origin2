
import { useAuth } from "../hooks/AuthProvider";
import { Link} from "react-router-dom";

const Cart = () => {
  const auth = useAuth();
  return (
    <div className="container">
      <div>
        <h1>Welcome! {auth.user?.username}</h1>
        <button onClick={() => auth.logOut()} className="btn-submit">
          logout
        </button>        
        <Link to ='/dashboard' className="buttonCart">exit cart</Link>
      </div>
    </div>
  );
};

export default Cart;