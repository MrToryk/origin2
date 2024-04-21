import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import { Nav } from "./components/Nav";
import './App.css';
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/route";
import { Main } from "./components/Main";
import Categories from "./components/Categories";
import Product from "./components/Product";
import Register from "./components/Register";

function App() {
  return (
    <>
      <AuthProvider>
        <Nav />
        <div className="container h-100">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
