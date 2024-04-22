
const Product = ({product, amount=0, lastInStock=0, cartView=false, onAddToCart, onChangeAmount, onRemoveFromCart}) => {
    const changeAmount = (m) => {
      let newAmount = amount + m;

      if (product.amount < newAmount) {
        newAmount = product.amount;
      }
      if (newAmount < 1) {
        newAmount = 1;
      }

      console.log("amount changed by ", amount, "+", m, "=", newAmount);
      handleChangeAmount(newAmount);
    }

    const handleAddToCart = () => {
      onAddToCart(product.id, 1);
    }

    const handleChangeAmount = (value) => {
      if (cartView) {
        onChangeAmount(product.id, value);
      }
    }

    const remove = (id) => {
      if (cartView) {
        onRemoveFromCart(id)
        console.log("delete id ", id)
      }
    } 

    const shopViewPrice = () => {
      return <>
      {/* <h6 className="text-success">Free shipping</h6> */}
      <div className="d-flex flex-column mt-4">
        <button data-mdb-button-init data-mdb-ripple-init disabled={lastInStock < 1} className="btn btn-primary btn-sm" type="button" onClick={handleAddToCart}>Add to Cart</button>
        {/* <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary btn-sm mt-2" type="button">
          Add to wishlist
        </button> */}
      </div>
    </>};

    const shopViewDescription = () => {
      return <>
        <div className="d-flex flex-row">{/* 
          <div className="text-danger mb-1 me-2">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
        <span>310</span>*/}
        </div>
        <div className="mt-1 mb-0 text-muted small">{/*
          <span>100% cotton</span>
          <span className="text-primary"> • </span>
          <span>Light weight</span>
          <span className="text-primary"> • </span>
          <span>Best finish<br /></span>
        */}</div>
        
        <div className="mb-2 text-muted small">
          <span>{product.category.label}</span>{/* 
          <span className="text-primary"> • </span> */}
        </div> 
        <p className="text-truncate mb-4 mb-md-0">
          {product.description}
        </p>
    </>}

    return (
          <div className="card shadow-0 border rounded-3">
            <div className="card-body">
              <div className="row">
                <div className="col-3">
                  <div className="bg-image hover-zoom ripple rounded ripple-surface" style={{ width: "90px", }}>
                    <img src={product.image} className="w-100" alt={product.name} />
                    <a href="#!">
                      <div className="hover-overlay">
                        <div className="mask" style={{'backgroundColor': 'rgba(253, 253, 253, 0.15)'}}></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-6">
                  <h5>{product.name}</h5>
                  {cartView ? <>
                    
                  </> : shopViewDescription()}
                </div>
                <div className="col-3 border-sm-start-none border-start">
                  <div className="d-flex flex-row align-items-center mb-1">
                    <i className="bi bi-currency-euro"></i>
                    <h4 className="mb-1 me-1">{(product.discounted ? product.discounted : product.price).toFixed(2)}</h4>
                    {product.discounted &&
                    <span className="text-danger"><s>{product.price.toFixed(2)}</s></span>}
                  </div>
                  { cartView 
                    ?  <>
                      <div className="input-group mb-3">
                        <button onClick={() => changeAmount(-1)} className="btn btn-outline-secondary" type="button" id="button-less"><i className="bi bi-chevron-left"></i></button>
                        <input onChange={(event) => handleChangeAmount(event.target.value)} type="text" className="form-control" aria-label="Amount" aria-describedby="amount" value={amount}/>
                        <button onClick={() => changeAmount(1)} className="btn btn-outline-secondary" type="button" id="button-more"><i className="bi bi-chevron-right"></i></button>
                        <button onClick={() => remove(product.id)} className="btn btn-danger" test={product.id} type="button" id="button-more"><i className="bi bi-trash"></i></button>
                      </div>
                    </> : shopViewPrice()
                  } 
                  <div className="mt-1 mb-0 text-muted small">
                    <span>Last in stock: {lastInStock}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  };
  
export default Product;
