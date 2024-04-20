//import { useEffect } from 'react';
import Product from "./Product";
import { properties as url } from '../properties.js';
import useFetch from "../hooks/useFetch.js";

const Main = () => {
    const { data: products, isLoading, message} = useFetch(url.api.products);
    return (
        <div className="row h-100">
          <div className="col-3">
              <h2>Categories</h2>
          </div>
          <div className="col">
              {isLoading && <><div class="text-center allign-middle">
                <div>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            </div></>}
              {products && products.map((item)=>(<div className="card mb-3 w-100" key={item.id}><Product product={item} /></div>))}
          </div>
        </div>
      );
    };
    

export { Main };