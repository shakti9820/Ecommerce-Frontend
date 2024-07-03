import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import UserNavbar from '../Components/UserNavbar';
import ProductView from './ProductView';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { setProducts, setProductsLoading, setProductsError } from '../redux/action/productsAction'; // Adjust the imports based on your file structure

const UserHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('token'));
    const userType = localStorage.getItem('UserType');
    if (!userData || userType !== 'user') {
      console.log('Redirecting to home from userhome because user is not user');
      navigate('/');
    }
  }, [navigate]);

  const fetchProducts = async () => {
    dispatch(setProductsLoading(true));
    try {
      const token = JSON.parse(localStorage.getItem('token')).jwt;
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(setProducts(response.data));
     
    } catch (error) {
      dispatch(setProductsError('Error fetching products'));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };

  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, [dispatch]);

  return (
    <AdminHomeContainer>
      <UserNavbar />
      <ProductList>
        {/* <h1>Hello Everyone</h1> */}
        {loading && <p>Loading products...</p>}
        {error && <p>Error fetching products: {error}</p>}
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductView key={index} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </ProductList>
    </AdminHomeContainer>
  );
};

export default UserHome;

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
