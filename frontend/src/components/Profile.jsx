import React, { useState, useEffect } from 'react';
import ProductChart from './ProductChart';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const auth = JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState([]);
  const [selectedProduct, setselectedProduct] = useState(null);

  const getUserDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/profile/${id}`, {
        method: 'get',
        headers: {
          'authorization': `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });

      const data = await response.json();
      setUserDetails(data);
      //console.log(data);
    } catch (error) {
      console.error('Error fetching user details', error);
    }
  };

  const fetchProducts = async (uid) => {
    try {
      if (!uid) {
        //console.log('User ID not available yet');
        return;
      }

      const list = await fetch("http://localhost:4000/products", {
        method: "get",
        headers: {
          "authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });

      const products = await list.json();
      const filteredProducts = products.filter(product => product.userId === uid);

      if (filteredProducts.length > 0) {
        setProducts(filteredProducts);
      } else {
        console.log('No Products Found by this User');
      }

      console.log(filteredProducts);

    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleProductClick = (clickedProduct) => {
   // console.log('Clicked Product:', clickedProduct);
    setselectedProduct(clickedProduct);
    // You can navigate to a detailed view or display more information here
  };

  useEffect(() => {
    getUserDetails(auth._id);
  }, [auth._id]);

  useEffect(() => {
    fetchProducts(userDetails._id);
  }, [userDetails._id]);

  return (
    <>
      <div className='profilecss'>
        <h1>User Profile</h1>
        <p>Name: {userDetails.name}</p>
        <p>Email: {userDetails.email}</p>
        <p>User ID: {userDetails._id}</p>
        <p>Password: {userDetails.password}</p>
      </div>

      <div className='profilecss'>
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
  );
};

export default Profile;
