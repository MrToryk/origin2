import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

const Login = () => {
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
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="user-username">Username:</label>
        <input
          type="username"
          id="user-username"
          name="username"
          //placeholder="example@yahoo.com"
          aria-describedby="user-username"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-username" className="sr-only">
          Please enter a valid username. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-password" className="sr-only">
          your password should be more than 6 character
        </div>
      </div>
      <button className="btn-submit">Submit</button>
    </form>
  );
};

export default Login;