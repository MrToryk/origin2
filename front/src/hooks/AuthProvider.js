import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { properties as url } from '../properties.js';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  let site = JSON.parse(localStorage.getItem('site'));
  const [user, setUser] = useState(site?.user || {});
  const [token, setToken] = useState(site?.token || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await fetch(url.api.user.login, {
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      if (res.user) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("site", JSON.stringify(res));
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
      const response = await fetch(url.api.user.register, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.status === "ok") {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("site", JSON.stringify(res));
        navigate("/dashboard");
        return;
      } 
      throw new Error(res.message);
    } catch (err) {
      alert(err.message);
      console.error(err);
      
    }
  };
  const changeAction = async (data) => {
    try{
      let site = JSON.parse(localStorage.getItem('site'));
      const response = await fetch(url.api.user.update, {
        method: "POST",
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          "x-token": site?.token,
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.status === "ok") {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("site", JSON.stringify(res));
        return;
      } 
      throw new Error(res.message);
    } catch (err) {
      alert(err.message);
      console.error(err);
      
    }
  }
  const logOut = () => {
    setUser({});
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, registerAction, loginAction, changeAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};