import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { properties as url } from '../properties.js';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch(url.api.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.user) {
        setUser(res.user.name);
        setToken(res.token);
        localStorage.setItem("site", res);
        navigate("/main");
        return;
      } 
      throw new Error(res.message);
    } catch (err) {
      alert(err.message);
      console.error(err);
      
    }
  };
  const registerAction = async (data) => {
    try {
      const response = await fetch(url.api.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.status === "ok") {
        setUser(res.user.name);
        setToken(res.token);
        localStorage.setItem("site", res);
        navigate("/dashboard");
        return;
      } 
      throw new Error(res.message);
    } catch (err) {
      alert(err.message);
      console.error(err);
      
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, registerAction, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};