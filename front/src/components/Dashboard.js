//import React, { useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { Link} from "react-router-dom";

const Dashboard = () => {
  const auth = useAuth(); 
  return (
    <div className="container">
      <div>
        <Link to ='/cart' className="buttonCart">cart</Link>
        <h1 className="mainH1">Welcome! {auth.user?.username}</h1>
        <button onClick={() => auth.logOut()} className="btn-submit">
          logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;