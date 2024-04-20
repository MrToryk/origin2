import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { Link } from "react-router-dom";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    name: "",
    password: "",
    rpassword: "",
  });
  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    console.log(input);
    if (input.username === "" || input.password === "" || input.rpassword === "") {
        alert("please fill all fields");    
        return;
    } else if ( input.password !== input.rpassword) {
        alert("passwords are not match")
        return;
    }
    auth.registerAction(input);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex justify-content-center">
    <form className="w-25" onSubmit={handleSubmitEvent}>
    <div data-mdb-input-init className="form-outline mb-4">
      <input           type="username"
          id="user-username"
          name="username"
          //placeholder="example@yahoo.com"
          aria-describedby="user-username"
          aria-invalid="false"
          onChange={handleInput} className="form-control" />
      <label className="form-label" htmlFor="user-username">Username</label>
    </div>
  
    <div data-mdb-input-init className="form-outline mb-4">
      <input           type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput} className="form-control" />
      <label className="form-label" htmlFor="password">Password</label>
    </div>
    <div className="form-outline mb-4">
        <div data-mdb-input-init className="form-outline flex-fill mb-0">
            <input type="password" name="rpassword" id="rpassword" onChange={handleInput} className="form-control" />
            <label className="form-label" htmlFor="rpassword">Repeat your password</label>
    </div>
        </div>
  
    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4 w-100">Sign in</button>
  
    <div className="text-center">
      <p>Already a member? <Link to="/login">Login</Link></p>
    </div>
  </form>
  </div>
  );
};

export default Register;