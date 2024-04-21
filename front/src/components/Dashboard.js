//import React, { useEffect } from "react";
import {useAuth} from "../hooks/AuthProvider";
import { useState } from "react";

function Dashboard() {
  const auth = useAuth();
  const [input, setInput] = useState({
    name: "",
    password: "",
    rpassword: "",
  });
  
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    console.log(input);
    if ( input.password !== input.rpassword) {
        alert("passwords are not match")
        return;
    }
    auth.changeAction(input);
  };

  return (
    <>
        {<h2 className="text-center">Hello, {auth.user.name}!</h2>}    
      <div className="container d-flex align-items-center justify-content-center h-75">
          <form className="w-25" onSubmit={handleSubmitEvent}>
            <div data-mdb-input-init className="form-outline mb-4">
                <input 
                    placeholder={auth.user.name}
                    type="name"
                    id="name"
                    name="name"
                    //placeholder="example@yahoo.com"
                    aria-describedby="user-name"
                    aria-invalid="false"
                    onChange={handleInput} className="form-control" />
              <label className="form-label" htmlFor="user-username">Full Name</label>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                  type="password"
                  id="oldpassword"
                  name="oldpassword"
                  aria-describedby="user-password"
                  aria-invalid="false"
                  onChange={handleInput} className="form-control" />
              <label className="form-label" htmlFor="oldpassword">Old password</label>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                  type="password"
                  id="password"
                  name="password"
                  aria-describedby="user-password"
                  aria-invalid="false"
                  onChange={handleInput} className="form-control" />
              <label className="form-label" htmlFor="password">New password</label>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
            <input type="password" name="rpassword" id="rpassword" onChange={handleInput} className="form-control" />
            <label className="form-label" htmlFor="rpassword">Repeat your password</label>
          </div>          
            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4 w-100">Save</button>
        </form>
    </div>
    </>
  );
};

export default Dashboard;