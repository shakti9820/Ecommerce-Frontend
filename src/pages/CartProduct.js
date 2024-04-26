import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UserNavbar from '../Components/UserNavbar';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserNavbarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #ffffff;
  height: 60px;
  border-bottom: 1px solid #ddd;
`;

const CartProductsContainer = styled.div`
  width: 90%;
  max-width: 600px;
  margin-top: 20px;
`;

const ProductContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 5px;
  margin-right: 20px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  background-color: ${({ danger }) => (danger ? '#ff5555' : '#8bc34a')};
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ danger }) => (danger ? '#ff0000' : '#689f38')};
  }
`;

const CartProduct = () => {
  const [cartProducts, setCartProducts] = useState([]);

  
  const fetchCartProducts = () => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    axios.get(`${process.env.REACT_APP_API_URL}/user/get_cart_products?customerId=${userId}`)
      .then(response => {
        setCartProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart products:', error);
      });
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const handleDeleteProduct = productId => {
    // Logic to delete the product
    const userId = JSON.parse(localStorage.getItem('user')).id;
    axios.delete(`${process.env.REACT_APP_API_URL}/user/delete_cart_product?customerId=${userId}&productId=${productId}`)
    .then(res=>{
       alert('Item deleted');
       fetchCartProducts();
    }).catch(err=>{
        console.error(err);
    });
    // console.log('Deleting product:', productId);
  };

  const handleBuyNow = productId => {
    // Logic to handle buying the product
    const userId = JSON.parse(localStorage.getItem('user')).id;
    axios.delete(`${process.env.REACT_APP_API_URL}/user/cart_to_order?customerId=${userId}&productId=${productId}`)
    .then(res=>{
       alert('Item added to order'+res.data);
       fetchCartProducts();
    }).catch(err=>{
        console.error(err);
    });

    // console.log('Buying product:', productId);
  };


  

  

  return (
    <PageContainer>
      <UserNavbarContainer>
        <UserNavbar />
      </UserNavbarContainer>
      <CartProductsContainer>
        <h2>Cart Products</h2>
        {cartProducts.map((product ,index)=> (
          <ProductContainer key={index}>
            <ProductImage src={product.imageUrl} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>₹{product.price}</ProductPrice>
              <ButtonContainer>
                <Button onClick={() => handleDeleteProduct(product.id)} danger>Delete</Button>
                <Button onClick={() => handleBuyNow(product.id)}>Buy Now</Button>
              </ButtonContainer>
            </ProductInfo>
          </ProductContainer>
        ))}
      </CartProductsContainer>
    </PageContainer>
  );
};

export default CartProduct;
