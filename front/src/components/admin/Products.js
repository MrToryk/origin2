import { useFetchType } from "../../hooks/useFetch";
import { properties as url } from '../../properties.js';
import { Link } from "react-router-dom";

const Products = () => {

const {result: categories, } = useFetchType("category", url.api.cart.categories);
const {result: products, } = useFetchType("products", url.api.cart.products);
const categoryList = () => {
    return categories && categories.map(category => {
        return <li key={category.id} className="row justify-content-between gap-1 p-2">
            <div className="col">{category.id} {category.label}</div>
            <div className="col-3 btn-group btn-group-sm" role="group">
                <Link className="btn btn-primary btn-sm" to={"/admin/products/edit/" + category.id}><i className="bi bi-pencil-square"></i></Link>
                <button className="btn btn-danger btn-sm"><i className="bi bi-trash"></i></button>
            </div></li>
    })
};
const handleOnDelete = (product) => {
    if(window.confirm("Are you sure, You want to delete this product: " + product.name)){
    fetch(url.api.admin.product.delete + product.id, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(localStorage.getItem("site")).token,
        },

    }).then(response => {
        return response.json()
    })
    .then(res => {
        // const res = response.json()
        alert(res.message)
        console.log("success: "+res)
    })
    .catch((res)=>{
        // const res = response.json()
        alert("error: "+res.message)
        console.log(res)
    });
}
}
return(
    <div className="row h-100 mt-4">
      <div className="col-md-3">
        <h2>Categories <button type="button" className="btn btn-primary btn-sm"><i className="bi bi-plus-circle"></i></button></h2>
        {(!categories) &&
          <div className="container d-flex align-items-center justify-content-center h-100">
            <div className="spinner-border" style={{width: "4rem", height:"4rem",}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
        <ul className="">
            {categoryList()}
        </ul>
      </div>
      <div className="col-md-9">
        <h2>Products <Link to="/admin/products/new" type="button" className="btn btn-primary btn-sm"><i className="bi bi-plus-circle"></i></Link> </h2>
        {(!products) &&
          <div className="container d-flex align-items-center justify-content-center h-100">
            <div className="spinner-border" style={{width: "4rem", height:"4rem",}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
        {products && products.map(product =>              
            <div className="row justify-content-between gap-1 p-2" key={product.id}>
                <div className="col">{product.name}</div>
                <div className="col-1 btn-group btn-group-sm" role="group">
                    <Link className="btn btn-primary" to={"/admin/products/edit/" + product.id}><i className="bi bi-pencil-square"></i></Link>
                    <button onClick={()=> handleOnDelete(product)} className="btn btn-danger"><i className="bi bi-trash"></i></button>
                </div>
            </div>
          )
        }
      </div>
    </div>
);
};

export default Products;
