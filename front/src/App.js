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

function App() {
  return (
    <div className="">
          <AuthProvider>
          <Nav />
          <div className="container">
            <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/categories" element={<Categories />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
            </div>
          </AuthProvider>
      </div>
  );
}

export default App;
