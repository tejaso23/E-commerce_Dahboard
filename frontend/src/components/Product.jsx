import React, {useState} from 'react'

const Product = () => {

     const [name,setname] = useState("");
    const [price,setprice] = useState("");
    const [category,setcategory] = useState("");
   
    const [company,setcompany] = useState("");
    const [error,seterror] = useState("");

    
   const addproduct =async ()=>{

    if(!name || !price || !category || !company){
        seterror(true);
        return false;
    }

    const userId = JSON.parse(localStorage.getItem('user'))._id; 
    let result = await fetch("http://localhost:4000/add-product",{
       method:"post",
       body:JSON.stringify({name,price,category,company,userId}),
       headers:{
        'Content-Type':'application/json',
        "authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
       }
    });
    result = result.json();
    console.log(result);
   
    alert("Product Added");

   }

   

  return (
    <div className="add-product"><h3>Product</h3>
         
         
         <input className = "input" type ="text" placeholder="Name" value = {name} onChange={(e)=>setname(e.target.value)}></input>
         
         {error && !name &&<span className='invalid-input'>Enter valid Name</span>}

            <input className = "input" type ="text"  placeholder="Price" value = {price} onChange={(e)=>setprice(e.target.value)}></input>
          
           {error && !price && <span className='invalid-input' >Enter valid Price</span>}
          

            <input className = "input" type ="text"  placeholder="Category" value = {category} onChange={(e)=>setcategory(e.target.value)}></input>
            {error && !category &&<span className='invalid-input'>Enter valid Category</span>}

            <input className = "input" type ="text"  placeholder="company" value = {company} onChange={(e)=>setcompany(e.target.value)}></input>
            {error && !company &&<span className='invalid-input'>Enter valid Company</span>}
           
       <button className="button" onClick={addproduct}>Add Procuct</button>


      
  
    </div>
  )
}

export default Product
