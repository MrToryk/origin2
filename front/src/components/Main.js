//import { useEffect } from 'react';
import Product from "./Product";
import { properties as url } from '../properties.js';

const Main = () => {
    const getProducts = () => {    
        try {
            const response =  fetch(url.api.products, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-token": localStorage.getItem("token"),
            },
            
            });
            const res =  response.json();
            return;
            throw new Error(res.message);
            } catch (err) {
                alert(err.message);
                console.error(err);
            
            }
    }   
    return (
        <div className="row">
          <div className="col-3">
              <h1>Categories</h1>
          </div>
          <div className="col">
              <Product />
          </div>
        </div>
      );
    };
    

export { Main };