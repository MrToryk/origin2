
const Product = ({product}) => {
    return (
          <div className="card shadow-0 border rounded-3">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                  <div className="bg-image hover-zoom ripple rounded ripple-surface">
                    <img src={product.image} className="w-100" alt={product.name} />
                    <a href="#!">
                      <div className="hover-overlay">
                        <div className="mask" style={{'background-color': 'rgba(253, 253, 253, 0.15)'}}></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6">
                  <h5>{product.name}</h5>
                  {/* <div className="d-flex flex-row">
                    <div className="text-danger mb-1 me-2">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </div>
                    <span>310</span>
                  </div>
                  <div className="mt-1 mb-0 text-muted small">
                    <span>100% cotton</span>
                    <span className="text-primary"> • </span>
                    <span>Light weight</span>
                    <span className="text-primary"> • </span>
                    <span>Best finish<br /></span>
                  </div>*/}
                  <div className="mb-2 text-muted small">
                    <span>{product.category.label}</span>{/* 
                    <span className="text-primary"> • </span> */}
                  </div> 
                  <p className="text-truncate mb-4 mb-md-0">
                    {product.description}
                  </p>
                </div>
                <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                  <div className="d-flex flex-row align-items-center mb-1">
                    <i class="bi bi-currency-euro"></i>
                    <h4 className="mb-1 me-1">{(product.discounted ? product.discounted : product.price).toFixed(2)}</h4>
                    {product.discounted &&
                    <span className="text-danger"><s>{product.price.toFixed(2)}</s></span>}
                  </div>
                  {/* <h6 className="text-success">Free shipping</h6> */}
                  <div className="d-flex flex-column mt-4">
                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-sm" type="button">Buy</button>
                    {/* <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary btn-sm mt-2" type="button">
                      Add to wishlist
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>


        /* 
        <div className="row g-0">
            <div className="col-md-4">
            <img src={product.image} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><small className="text-body-secondary">{product.category} {product.discounted ? product.discounted : product.price}</small></p>
            </div>
            </div>
        </div> */


    );
  };
  
  export default Product;