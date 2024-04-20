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
        <table className="tbl">
  <tbody>
    <tr>
      <td className="align-baseline">baseline</td>
      <td className="align-top">top</td>
      <td className="align-middle">middle</td>
      <td className="align-bottom">bottom</td>
      <td className="align-text-top">text-top</td>
      <td className="align-text-bottom">text-bottom</td>
    </tr>
  </tbody>
</table>
      </div>
    </div>
  );
};

export default Dashboard;