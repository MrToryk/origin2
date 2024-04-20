//import React, { useEffect } from "react";
import { useAuth } from "../hooks/AuthProvider";

function Dashboard() {
  const auth = useAuth(); 
  return (
    <div className="container">
      <div>
        <button onClick={() => auth.logOut()} className="btn-submit">
          logout
        </button>
        <h1 className="mainH1">Welcome! {auth.user?.username}</h1>
      </div>
    </div>
  );
};

export default Dashboard;