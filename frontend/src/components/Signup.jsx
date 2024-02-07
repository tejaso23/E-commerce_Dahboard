import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API_URL from '../config';

const Signup =()=>{
   const [name,setname] = useState("");
   const [email,setemail] = useState("");
   const [password,setpassword] = useState("");
   const navigate = useNavigate();
   
  



   const signupdata= async ()=>{
    console.warn(name,email,password);
    let result = await fetch(`${API_URL}/signup`,{
        method:"post",
        body:JSON.stringify({name,email,password}),
        headers:{
            'Content-Type':'application/json'
        }
       
    });
    result = await result.json(); 
   localStorage.setItem( 'user',JSON.stringify(result.result));
   localStorage.setItem( 'token',JSON.stringify(result.token));
    console.log(result);
    if(result){
        navigate("/");
    }
   }

   useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
          navigate('/'); 
    }
  },[navigate]);
 
  const loginlink=()=>{
    navigate("/login");
  }

  
    return(
        <>
        <div className="Register"><h1>Register</h1>
            
            
            <input className = "input" type ="text" placeholder="Name" value = {name} onChange={(e)=>setname(e.target.value)}></input>
            <input className = "input" type ="text"  placeholder="Email" value = {email} onChange={(e)=>setemail(e.target.value)}></input>
            <input className = "input" type ="password"  placeholder="Password" value = {password} onChange={(e)=>setpassword(e.target.value)}></input>
            
            <button className="button"  onClick={signupdata} >Sign up</button>
            
            
            <button className="button"  onClick={loginlink} >Login</button>
            </div>
            </>
    )
}

export default Signup;