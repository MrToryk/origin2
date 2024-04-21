//import React, { useEffect } from "react";
import {useAuth} from "../hooks/AuthProvider";

function Dashboard() {
  const auth = useAuth();
  return (
    <div className="container">
        {<h2></h2>}
    </div>
  );
};

export default Dashboard;