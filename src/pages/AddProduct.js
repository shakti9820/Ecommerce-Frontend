import React, { useState } from 'react';
import styled from 'styled-components';
import backgroundImg from '../background.png'; // Import your background image
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const BackgroundContainer = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333333;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #8bc34a;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #689f38;
  }
`;
const SmallButton = styled(Button)`
  width: 40%;
  padding: 8px 12px;
  margin-top :20px;
  font-size: 12px;
  align-item : center;
`;
const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
`;

const AddProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [highlights, setHighlights] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [adminId, setAdminId] = useState('');
  const [error, setError] = useState('');



  const findUserId=async()=>{
    try {
      const token = JSON.parse(localStorage.getItem('token')).jwt;
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user-id`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAdminId(response.data);
    } catch (error) {
      console.log('Error fetching products');
    } 
  };


  const addproducts=async()=>{
    try{
      const token = JSON.parse(localStorage.getItem('token')).jwt;
      const userType = localStorage.getItem('UserType');
      if(adminId==='') findUserId();

      const response=await axios
      .post(`${process.env.REACT_APP_API_URL}/${userType}/addproduct`, {
        name : productName,
        highlights,
        description,
        price,
        imageUrl:imgUrl,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Adminid' : `${adminId}`
        }
      }
        );
      navigate(`/${userType}Home`);

    }
    catch(error) {
      console.error('Product addition failed:', error);
      setError('Product addition failed. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validation logic
    if (productName.trim() === '' || description.trim() === '' || price.trim() === '' || imgUrl.trim() === '') {
      setError('All fields are required');
      return;
    }

    // API call
   
      addproducts();
  };

  const handleGoToHome = () => {
    navigate('/adminhome');
  };

  return (
    <BackgroundContainer>
      <FormContainer>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Title style={{ color: '#ff5722' }}> <span style={{ color: '#4caf50' }}>People Mart</span></Title>
        </Link>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Title>Add Product</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Highlights"
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            type="url"
            placeholder="Image URL"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <Button type="submit">Add Product</Button>
        </form>
        <SmallButton onClick={handleGoToHome}>Go to Home</SmallButton>
      </FormContainer>
    </BackgroundContainer>
  );
};

export default AddProduct;
