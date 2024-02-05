import Nav from "./components/Nav.jsx";
import "./App.css";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Signup from "./components/Signup.jsx";
import PrivateComponent from "./components/PrivateComponent.jsx";
import Login from "./components/Login.jsx";
import Product from "./components/Product.jsx"
import Productlist from "./components/Productlist.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import Profile from "./components/Profile.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
     <Routes>

      <Route  element={<PrivateComponent/>}>
        <Route path  ="/" element={<Productlist></Productlist>}></Route>
      <Route path  ="/add"  element={<Product></Product>}></Route>
      <Route path  ="/update/:id"  element={<UpdateProduct></UpdateProduct>}></Route>
      <Route path  ="/logout"  element={<h1>Logout</h1>}></Route>
      <Route path  ="/profile/:id"  element={<Profile></Profile>}></Route>

      </Route>
      
      <Route path  ="/signup" element={<Signup></Signup>}></Route>
      <Route path  ="/login" element={<Login></Login>}></Route>
     
     </Routes>

     
      </BrowserRouter>

      <Footer></Footer>
    </div>
  );
}

export default App;
