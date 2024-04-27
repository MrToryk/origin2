import Product from "./Product";
import { useState, useEffect, useCallback } from 'react';


const Cart = ({products, cart, onUpdateToCart, onRemoveFromCart}) => {
  const [total, setTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [checkTotal, setCheckTotal] = useState(false);

  const updateTotals = useCallback(() => {
    setTotalDiscount(products && products
      .filter(product => product.id in cart)
      .map(product => Number.parseFloat(product.discounted ? product.discounted : product.price) * Number.parseFloat(cart[product.id]))
      .reduce((a, b) => a += b, 0));

    setTotal(products && products
      .filter(product => product.id in cart)
      .map(product => Number.parseFloat(product.price) * Number.parseFloat(cart[product.id]))
      .reduce((a, b) =>  a += b, 0));
  }, [products, cart])

  useEffect(() => {
    updateTotals();
    if (checkTotal) {
      setCheckTotal(false);
    }    
  }, [products, cart, checkTotal, updateTotals]);


  const handleChangeAmount = (id, amount) => {
    onUpdateToCart(id, amount);
    setCheckTotal(true);
    updateTotals();
  }

  const handleRemoveFromCart = (id) => {
    onRemoveFromCart(id);
    updateTotals();
  }

  const deleteAll = () => {
    Object.keys(cart).map(productId => handleRemoveFromCart(productId));
  }

  const getLastInStock = (id) => {
    let [product] = products.filter(product => product.id === id);
    return product.amount - cart[id];
  }

  let showDiscount = (total - totalDiscount) > 0;
  return (
    <>
      <h1>Cart</h1>
      {products && products.map(product => {
        if (product.id in cart) {
          return <div className="row justify-content-center mb-3" key={product.id}>
           <Product
              product={product} 
              amount={cart[product.id]} 
              cartView={true} 
              lastInStock={getLastInStock(product.id)}
              onChangeAmount={handleChangeAmount} 
              onRemoveFromCart={handleRemoveFromCart} />
          </div>
        }
        return null
      })}
      {(Object.keys(cart).length > 0) 
      ? <>
      <div className="row justify-content-center mb-3">
        <div className="card shadow-0 border rounded-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 col-lg-9 col-xl-9">
                <div className="text-end text-muted align-right">{showDiscount && "Total Before Dicount:"}</div>
                <div className="text-end">{showDiscount && "Total Dicount:"}</div>
                <div className="text-end">Total:</div>
              </div>  
              {}
              <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                <div className="text-muted">
                  { showDiscount 
                    ? <s><i className="bi bi-currency-euro"></i> {total}</s>
                    : <><i className="bi bi-currency-euro"></i> {total}</>
                  }
                </div>
                <div className="text-danger">
                  { showDiscount && <>
                    <i className="bi bi-currency-euro"></i> 
                    {total - totalDiscount}
                  </>
                  } 
                </div>
                <div className="">
                  { showDiscount &&
                  <b>
                    <i className="bi bi-currency-euro"></i> 
                    {totalDiscount}
                  </b>
                  }
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>
      <div className="row justify-content-evenly p-4">
        <div className="col-4 text-center justify-content-center">
          <button type="button" onClick={() => deleteAll()} className="btn btn-danger w-50">Clean cart</button>
        </div>
        <div className="col-4 text-center justify-content-center">
          <button type="submit" className="btn btn-success w-50">Checkout</button>
        </div>
      </div>
      </>
      : <div className="row"><div className="text-center">No products in the cart yet.</div></div>}
    </>
  );
};

export default Cart;