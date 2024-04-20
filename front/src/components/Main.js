//import { useEffect } from 'react';
import Product from "./Product";
import { properties as url } from '../properties.js';
import useFetch from "../hooks/useFetch.js";

const Main = () => {
    const { data: products, isloading, message} = useFetch(url.api.products);
    return (
        <div className="row">
          <div className="col-3">
              <h1>Categories</h1>
          </div>
          <div className="col">
              {products && products.map((product)=>(<Product />))}
          </div>
        </div>
      );
    };
    

export { Main };