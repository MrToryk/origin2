import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard";
import {default as AdminDashboard} from "./components/admin/Dashboard";
import { default as Sales } from "./components/admin/Sales";
import { default as Users } from "./components/admin/Users";
import { Nav } from "./components/Nav";
import AuthProvider from "./hooks/AuthProvider";
import {default as PrivateRoute, AdminRoute} from "./router/route";
import Store from "./components/Store.js";
import Product from "./components/Product";
import Register from "./components/Register";
import { useState, useEffect, useCallback } from 'react';
import { useFetchType } from "./hooks/useFetch.js";
import { properties as url } from './properties.js';
import Cart from "./components/Cart.js";
import Products from './components/admin/Products.js';
import {default as Edit} from './components/admin/Edit.js';

function App() {
  var site = JSON.parse(localStorage.getItem("site")) || {};
  const [cart, setCart] = useState(site?.cart || {});
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);

  const {result: categories_, } = useFetchType("category", url.api.cart.categories);
  const {result: products_, } = useFetchType("products", url.api.cart.products);
  //console.log("app", site, cart);

  const handleAddToCart = (productId, amount) => {
      let _cart = cart;
      if (productId in _cart) {
        _cart[productId] += Number.parseInt(amount);
      } else {
        _cart[productId] = Number.parseInt(amount);
      }

      //console.log("app handleAddToCart", cart, productId, amount, _cart);
      setCart(_cart);
      cartCalc();
  }

  const handleUpdateToCart = (productId, amount) => {
      let _cart = cart;
      _cart[productId] = Number.parseInt(amount)

      //console.log("app handleUpdateToCart", cart, productId, amount, _cart);
      setCart(_cart);
      cartCalc();
  }

  const handleRemoveFromCart = (productId) => {
    let _cart = cart;
    delete _cart[productId];

    //console.log("app handleRemoveFromCart", cart, productId, _cart);
    setCart(_cart);
    cartCalc();
  }

  const cartCalc = useCallback(() => {
    let count = 0;
    Object.keys(cart).forEach(item => {
      count += cart[item];
    })
    setCartCount(count);
    site["cart"] = cart || {};
    localStorage.setItem("site", JSON.stringify(site));
    //console.log("app cartCalc", site, cart, count);
  }, [cart, site]);

  useEffect(() => {    
    categories_ && setCategories(categories_);
    products_ && setProducts(products_);
    cartCalc();
    //console.log("cart", cart);
  }, [categories_, products_, cartCalc, cart]);


  return (
    <>
      <AuthProvider>
        <Nav cart={cartCount} />
        <div className="container h-100">
          <Routes>
            <Route path="/" element={<Store 
                categories={categories} 
                products={products} 
                cart={cart}
                onAddToCart={handleAddToCart} 
            />} />
            <Route path="/category/:slug" element={<Store 
                categories={categories} 
                products={products} 
                cart={cart}
                onAddToCart={handleAddToCart} 
            />} />
            <Route path="/cart" element={<Cart 
                products={products} 
                cart={cart} 
                onUpdateToCart={handleUpdateToCart} 
                onRemoveFromCart={handleRemoveFromCart}
            />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>     
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
              <Route path="/admin/sales" element={<Sales />}/>
              <Route path="/admin/Products" element={<Products />}/>
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/products/edit/:slug" element={<Edit/>}/>
              <Route path="/admin/products/new" element={<Edit isNew={true}/>}/>
            </Route>           
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
