import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import { Nav } from "./components/Nav";
import './App.css';
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/route";
import { Main } from "./components/Main";

function App() {
  return (
     <div className="app-container bg-light">
      <Nav />
      <Router>
        <AuthProvider>
          <Routes>
          <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/dashboard" element={<Dashboard />} />

            </Route>
            {            
            }
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
