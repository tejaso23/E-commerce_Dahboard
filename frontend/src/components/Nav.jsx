import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const handleUpdateClick = () => {
    // Add logic to handle the update link click
    alert("First select the Product");
  };


  const logout = () => {
    localStorage.clear();

    navigate("/signup");
  };

  return (
    <div className="navi">
      <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/06/apple.png?auto=format&q=60&fit=max&w=930" className="logo" alt="none"></img>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Product</Link>
          </li>
          <li>
            <Link to="/" onClick={handleUpdateClick}>Update Product</Link>
          </li>
          <li>
            <Link to="/profile/:id">Profile</Link>
          </li>
          <li>
            <Link to="/signup" onClick={logout}>
              Logout({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <li>
            <Link to="/signup">Signup</Link>
          </li>{" "}
          <li>
            <Link to="/login">Login</Link>
          </li>{" "}
        </ul>
      )}
    </div>
  );
};

export default Nav;
