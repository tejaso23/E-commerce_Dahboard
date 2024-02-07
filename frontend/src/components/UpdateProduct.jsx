import React, {useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import API_URL from '../config';


const UpdateProduct = () => {

     const [name,setname] = useState("");
    const [price,setprice] = useState("");
    const [category,setcategory] = useState("");
   
    const [company,setcompany] = useState("");
    
   const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
     
      getProductDetails();
    },);


    const getProductDetails= async ()=>{
      let result = await fetch(`${API_URL}/product/${params.id}`,{
        headers:{
          "authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
       }
      });
    result = await result.json();
    console.log(result);
    setname(result.name);
    setprice(result.price);
    setcategory(result.category);
    setcompany(result.company);
    
        
}


   const updateproduct =async ()=>{
  //console.log(params,name,price,category,company);
  let result = await fetch(`${API_URL}/product/${params.id}`,{
  method:"put",
  body:JSON.stringify({name,price,category,company}),
  headers:{
    'Content-Type':"application/json",
    "authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
  }
   }) ;

   result = await result.json();
   if(result){
    navigate("/");
   }else{
    alert("something wrong");
   }
   }

   
  return (
    <div className="update-product"><h3>Update Product</h3>
         
        
         <input className = "input" type ="text" placeholder="Name" value = {name} onChange={(e)=>setname(e.target.value)}></input>
         
        

            <input className = "input" type ="text"  placeholder="Price" value = {price} onChange={(e)=>setprice(e.target.value)}></input>
          
           
          

            <input className = "input" type ="text"  placeholder="Category" value = {category} onChange={(e)=>setcategory(e.target.value)}></input>
           

            <input className = "input" type ="text"  placeholder="company" value = {company} onChange={(e)=>setcompany(e.target.value)}></input>
            
           
       <button className="button" onClick={updateproduct}>Update Product</button>


      
  
    </div>
  )
}

export default UpdateProduct;
