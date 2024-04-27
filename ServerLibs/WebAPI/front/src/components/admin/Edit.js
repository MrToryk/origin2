
import { useParams } from "react-router-dom";
import { useFetchType } from "../../hooks/useFetch";
import { properties as url} from "../../properties";
import { useState } from "react";

const Edit = ({isNew=false})=>{ 
    const emptyProduct = {
        name: "",
        amount: "",
        price: "",
        discounted: "",
        description: "",
        category: ""
      }
    const [input, setInput] = useState(emptyProduct);
    const params = useParams();
    //console.log(products);
    let url_ = url.api.admin.product.edit + params.slug;
    let {result: product} =useFetchType("product", url_);
if (isNew){product = emptyProduct}
 const {result: categories, } = useFetchType("category", url.api.cart.categories);
    //const [product] = products && products.filter(product=>product.id===Number.parseInt(params.slug))
    const handleInput = (e) => {
        const { name, value } = e.target;
        console.log(e.target,e.target.name,e.target.value)
        setInput((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      const handleSubmitEvent = (e) => {
        //console.log(input, JSON.parse(localStorage.getItem("site")).token);
        e.preventDefault();
        // const specialurl = url.api.admin.product.edit + product.id;
            if(isNew){url_ = url.api.admin.product.new}
            return fetch(url_, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-token": JSON.parse(localStorage.getItem("site")).token
              },
              body: JSON.stringify(input),
            }).then((response)=>response.json())
              .then(res => {
                    // const res = response.json()
                    alert(res.message)
                    console.log(res)
                }
            ).catch((response)=>{
                const res = response.json()
                alert(res.message)
                console.log(res)
            });
            
      };

  return(<>
    {product &&
    <form onSubmit={handleSubmitEvent} className="text-center h-100">
        <div className="row d-flex justify-content-center">
            <div>
                <label className="col-3 text-start">Name:</label>
                <input onChange={handleInput} className="col-3" placeholder="Name" defaultValue={product.name} type="text" name="name"/>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div>
                <label className="col-3 text-start">Amount:</label>
                <input onChange={handleInput} className="col-3" placeholder="Amount" defaultValue={product.amount} type="int" name="amount"/>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div>
                <label className="col-3 text-start">Price:</label>
                <input onChange={handleInput} className="col-3" placeholder="Price" defaultValue={product.price} type="int" name="price"/>    
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div>
                <label className="col-3 text-start">Discounted Price:</label>
                <input onChange={handleInput} className="col-3" placeholder="Discounted price" defaultValue={product.discounted? product.discounted : product.price} type="text" name="discounted"/>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
        <div className="">
                <label className="col-3 text-start">Category:</label>
                <select onChange={handleInput} className="col-3" aria-label="Default select example" name="category">
                <option>---</option>
                {
                    categories && categories.map(category=>
                    <option selected={category.id === product.category.id} value={category.id}key={category.id}>{category.label}</option>)
                }
                </select>
        </div>
        </div>
        <div className="row d-flex justify-content-center ">
            <div className="">
                <label className="text-start col-6">Description:</label>
            </div>
        </div>
        <div className="row d-flex justify-content-center h-50">
            <div className="">
                <textarea onChange={handleInput} className="h-100 col-6" placeholder="Description:" defaultValue={product.description} name="description"></textarea>
            </div>
        </div>
        <div className="row justify-content-center">
            <button type="submit" className="btn btn-success col-3">save</button>
        </div>
    </form>}
  </>);  
};
export default Edit;