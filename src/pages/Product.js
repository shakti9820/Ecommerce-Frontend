

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../Components/AdminNavbar';
import UserNavbar from '../Components/UserNavbar';

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProductImage = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 20px;
`;

const ProductName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const ProductHighlights = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #8bc34a;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #689f38;
  }
`;

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const userType = JSON.parse(localStorage.getItem('user')).userType;
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product data from the backend
    axios.get(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then(response => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [productId]);

  const handleAddToCart = () => {
    // API call to add product to cart


    if (userType === 'user') {
        axios.post(`${process.env.REACT_APP_API_URL}/user/add_to_cart?customerId=${userId}`, {
            //  product
            name:product.name,
            id:product.id,
            highlights:product.highlights,
            description:product.description,
            price:product.price
          })
          .then(response => {
            alert('Item added to cart');
            navigate('/userHome');
          })
          .catch(error => {
            console.error('Error adding item to cart:', error);
          });
      } else {
        alert('Only users can add products to cart. Please login as a user.');
      }

   
  };

  const handleBuyNow = productId => {
    // Logic to handle buying the product
    const userId = JSON.parse(localStorage.getItem('user')).id;
    axios.post(`${process.env.REACT_APP_API_URL}/user/place_order?customerId=${userId}&productId=${productId}`)
      .then(res => {
        alert('Order Placed');
      })
      .catch(err => {
        console.error(err);
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {userType==='admin'?<AdminNavbar />:<UserNavbar/>}
    <ProductContainer>
      <ProductImage src={product.imageUrl} alt={product.name} />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>₹{product.price}</ProductPrice>
      <ProductHighlights>{product.highlights}</ProductHighlights>
      <ProductDescription>{product.description}</ProductDescription>
     
      <ButtonContainer>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
        <Button onClick={() => handleBuyNow(product.id)}>Buy Now</Button>
      </ButtonContainer>
    </ProductContainer>
    </>
  );
};

export default Product;

