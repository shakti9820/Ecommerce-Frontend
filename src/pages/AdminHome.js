
import React, { useState, useEffect } from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import ProductView from './ProductView';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import backgroundImg from '../background.png'; 

const AdminHome = () => {
  const navigate=useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user'));
    if(!userData || userData.userType!=='admin'){
      navigate("/");
    }
  },[])

  useEffect(() => {
    // Fetch products from the server only once when the component mounts
    axios.get(`${process.env.REACT_APP_API_URL}/products`)
      .then(response => {
        console.log(response.data);
        setProducts(response.data); // Assuming response.data is an array of products
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <AdminHomeContainer>
      <AdminNavbar />
      <ProductList>
        {products.map((product,index) => (
          <ProductView key={index} product={product} />
        ))}
      </ProductList>
    </AdminHomeContainer>
  );
};

export default AdminHome;

const AdminHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
 
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;