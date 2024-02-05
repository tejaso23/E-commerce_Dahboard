import React from 'react'
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [email,setemail] = useState();
    const [password,setpassword] = useState();
    const navigate = useNavigate();

    const logindata= async ()=>{
        console.warn(email,password);
        let result = await fetch("http://localhost:4000/login",{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
           
        });
        result = await result.json(); 
      
        console.log(result);
        if(result.token){
            localStorage.setItem( 'user',JSON.stringify(result.user));
            localStorage.setItem( 'token',JSON.stringify(result.token));
            navigate("/");
        }else{
            
            alert("Enter correct details");
        }
       }

       useEffect(()=>{
        const auth = localStorage.getItem('user');
       
        if(auth){
              navigate('/'); 
        }
      },[navigate]);
     
      


  return (
    <div className='login'><h1>Login</h1>
            
             <input className = "input" type ="text"  placeholder="Email"
             onChange={(e)=>setemail(e.target.value)} value={email} ></input>


            <input className = "input" type ="password"  placeholder="Password" 
             onChange={(e)=>setpassword(e.target.value)}  value={password}
            ></input>


            <button className="button" onClick={logindata}>Login</button>
    </div>
  )
}

export default Login
