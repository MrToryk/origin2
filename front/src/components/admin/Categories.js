
import { useParams } from "react-router-dom";
import { useFetchType } from "../../hooks/useFetch";
import { properties as url} from "../../properties";
import { useState } from "react";

const CategoryEdit = ({isNew=false})=>{ 
    const emptyCategory = {
        label: "",
      }
    const [input, setInput] = useState(emptyCategory);
    const params = useParams();
    //console.log(products);
    let url_ = url.api.admin.category.edit + params.slug;
    let {result: product} =useFetchType("category", url_);
if (isNew){product = emptyCategory}
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
            if(isNew){url_ = url.api.admin.category.new}
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
                <input onChange={handleInput} className="col-3" placeholder="Name" defaultValue={product.label} type="text" name="label"/>
            </div>
        </div>
        <div className="row justify-content-center">
            <button type="submit" className="btn btn-success col-3">save</button>
        </div>
    </form>}
  </>);  
};
export default CategoryEdit;