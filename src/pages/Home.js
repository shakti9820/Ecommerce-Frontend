import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from '../background.png'; // Import the background image

const Background = styled.div`
  position: relative;
  background-image: url(${backgroundImg}); // Use the imported background image
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black overlay
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #fff;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home = () => {
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    // setUserType('admin');
    const type=localStorage.getItem('UserType');
    if(type!=="admin"){
    localStorage.clear();
    localStorage.setItem('UserType', 'admin');
    }
    
    navigate('/login');
  };

  const handleCustomerClick = () => {
    // setUserType('user');
    const type=localStorage.getItem('UserType');
    if(type!=="user"){
    localStorage.clear();
    localStorage.setItem('UserType', 'user');
    }
    navigate('/login');
  };

  return (
    <Background>
      <Overlay />
      <Content>
        <Title>People Mart</Title>
        <div>
          <Button onClick={handleAdminClick}>Admin</Button>
          <Button onClick={handleCustomerClick}>Customer</Button>
        </div>
      </Content>
    </Background>
  );
};

export default Home;
