import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProductContainer = styled.div`
  width: 300px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease;
  margin: 10px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 10px;
`;

const ProductName = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const ProductView = ({ product }) => {
    // console.log(product.name,product.highlights,product.price);
  return (
    <ProductContainer>
      <Link to={`/productdetails/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

        <ProductImage src={product.imageUrl} alt={product.name} />
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>₹{product.price}</ProductPrice>
        </ProductInfo>
      </Link>
    </ProductContainer>
  );
};

export default ProductView;
