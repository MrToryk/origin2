//import { useEffect } from 'react';
import Product from "./Product";
import { properties as url } from '../properties.js';
import useFetch from "../hooks/useFetch.js";

const Main = () => {
    const { data: products, isLoading, message} = useFetch(url.api.products);
    console.log(products);
    return (
        <div className="row">
          <div className="col-3">
              <h1>Categories</h1>
          </div>
          <div className="col">
              {products && products.map((item)=>(<Product product={item} />))}
          </div>
        </div>
      );
    };
    

export { Main };