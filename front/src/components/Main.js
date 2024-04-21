//import { useEffect } from 'react';
import Product from "./Product";
import { properties as url } from '../properties.js';
import { useFetchType} from "../hooks/useFetch.js";
import { Link } from "react-router-dom";

const Main = () => {
    const {result: categories, message: messageC} = useFetchType("category", url.api.category);
    const {result: products, message: messageP} = useFetchType("products", url.api.products);

    const menu = categories && categories.map(item => 
      <li className="nav-item" key={item.id}>
        <Link className="nav-link" aria-current="page" to={"/category/" + item.id}>{item.label}</Link>
      </li>
    );

    return (
        <div className="row h-100 mt-4">
          <div className="col-md-3">
              <h2>Categories</h2>
              {(!categories) &&
                <div className="container d-flex align-items-center justify-content-center h-100">
                  <div className="spinner-border" style={{width: "4rem", height:"4rem",}} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
            <ul className="nav flex-column">
              {menu}
            </ul>
          </div>
          <div className="col-md-9">
              {(!products) &&
                <div className="container d-flex align-items-center justify-content-center h-100">
                  <div className="spinner-border" style={{width: "4rem", height:"4rem",}} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
              {products && products.map(item=> 
                
                <div className="row justify-content-center mb-3" key={item.id}>
                  <Product product={item} />
                </div>
              )}
          </div>
        </div>
      );
    };
    
export { Main };