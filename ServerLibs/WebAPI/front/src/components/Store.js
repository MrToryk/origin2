import Product from "./Product";
import { Link, useParams } from "react-router-dom";


const Store = ({categories, products, cart, onAddToCart}) => {
    const params = useParams();
    //console.log(categories, products);
    const menu = categories && categories.map(item => 
      <li className="nav-item" key={item.id}>
        <Link className="nav-link" aria-current="page" to={"/category/" + item.id}>{item.label}</Link>
      </li>
    );

    const getLastInStock = (id) => {
      let [product] = products.filter(product => product.id === id);
      return product.amount - (cart[id] || 0);
    }

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
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/"}>All</Link>
              </li>   
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
            {products && products.filter(product => !params.slug || Number.parseInt(params.slug) === product.category.id)
              .map(product =>                 
                  <div className="row justify-content-center mb-3" key={product.id}>
                    <Product 
                        product={product} 
                        lastInStock={getLastInStock(product.id)}
                        onAddToCart={onAddToCart} 
                    />
                  </div>
              )
            }
          </div>
        </div>
      );
    };
    
export default Store;