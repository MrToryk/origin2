
const Product = ({product}) => {
    return (
        
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
        </div>


    );
  };
  
  export default Product;