//import React, { useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { Link} from "react-router-dom";

const Dashboard = () => {
  const auth = useAuth(); 
  return (
    <div className="container">
      <div>
        <h1>Welcome! {auth.user?.username}</h1>
        <button onClick={() => auth.logOut()} className="btn-submit">
          logout
        </button>
        <Link to ='/cart' className="buttonCart">cart</Link>
      </div>
    </div>
  );
};

export default Dashboard;