import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom" ;
import ProductChart from './ProductChart';

const Productlist = () => {

    const [products,setproducts] = useState([]);
    const [selectedProduct, setselectedProduct] = useState(null);
    const productlist = async ()=>{
      
        let list = await fetch("http://localhost:4000/products",{
           method:"get",
          
           headers:{
              "authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
           }
        });
        let products =await list.json();
        setproducts(products);
       
     }
     
     
     useEffect(() => {
       productlist();
      }, []); 
     
      const deleteproduct=async (id)=>{
       console.log(id);
       let result = await fetch(`http://localhost:4000/product/${id}`,{
        method:"DELETE",
        headers:{
          "authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
       }
       });
           result = await result.json();

           if(result){
            alert("record deleted");
            productlist();
           }
      };
      

      const searchhandle = async (event)=>{
             const key =   event.target.value;

             if(key){
               let result = await fetch(`http://localhost:4000/search/${key}`,{
                headers:{
                  "authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
               }
               });
               result = await result.json();
               if(result){
                 setproducts(result);
               }
             }else{
               productlist();
             }


      }


      const handleProductClick = (clickedProduct) => {
        console.log('Clicked Product:', clickedProduct);
        setselectedProduct(clickedProduct);
        // You can navigate to a detailed view or display more information here
      };

  return (
    <>
    <div className='product-list'>
       <h1>Product List</h1>
       <input placeholder='search products... ' type='input' className='search-box' onChange={searchhandle}></input>
       <ul>
        <li>S.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
       </ul>
       {
       
       products.length > 0  ? products.map((item,index)=>(
         
        <ul key = {index}> 
         <li>{index+1}</li>
        <li>{item.name}</li>
         <li>{item.price}</li>
         <li>{item.category}</li>
         <li>{item.company}</li>
         <li>
            <Link to={"/update/"+ item._id}>Update</Link><button onClick={()=>{deleteproduct(item._id)}}>Delete</button></li>
         </ul>
       )): <h1>No Products Found</h1>}
    </div>

    <div className='productscss'>
        {/* Chart Section */}
        <ProductChart products={products} onProductClick={handleProductClick} />

        {selectedProduct && (
          <div>
            <h2>Selected Product</h2>
            <p>Name: {selectedProduct.name}</p>
            <p>Category: {selectedProduct.category}</p>
            <p>Company: {selectedProduct.company}</p>
            <p>Price: {selectedProduct.price}</p>
          </div>
        )}
      </div>



    </>
  )
}

export default Productlist

