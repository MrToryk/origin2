import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    
    if (input.username !== "" && input.password !== "") {
      console.log(input.password);
      //dispatch action from hooks
      auth.loginAction(input);
      return;
    }
    alert("please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
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
  
  
    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4 w-100">Sign in</button>
  
    <div className="text-center">
      <p>Not a member? <a href="#!">Register</a></p>
    </div>
  </form>
  </div>
  </>
  );
};

export default Register;