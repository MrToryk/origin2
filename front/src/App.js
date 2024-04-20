import { Navigate, Route, Routes } from "react-router-dom";
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
        <AuthProvider>
          <Routes>
          <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
              <Route ute element={<PrivateRoute />}>

              <Route path="/cart" element={<Cart />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            {            
            }
          </Routes>
        </AuthProvider>
    </div>
  );
}

export default App;
