import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import backgroundImg from '../background.png';
import axios from 'axios';
import { loginRequest, loginSuccess, loginFailure } from '../redux/action/userAction';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {  error } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   

  const findUserDetails = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).jwt;
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user-details`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      
    } catch (error) {
      console.log('Error fetching user details', error);
      
    }
  };




  useEffect(() => {
    const userType = localStorage.getItem('UserType');
    const userToken = JSON.parse(localStorage.getItem('token'));
    if (userToken && userType) {
      navigate(`/${userType}Home`);
    }
    else if(!userType){
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      dispatch(loginFailure('Email and password are required'));
      return;
    }

    dispatch(loginRequest());

    try {
      const userType = localStorage.getItem('UserType');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/${userType}/login`, {
        username: email,
        password,
        role:userType,
      });
      if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data));
        findUserDetails();
        dispatch(loginSuccess(response.data));
        navigate(`/${userType}Home`);
      } else {
        dispatch(loginFailure('Incorrect email or password'));
      }
    } catch (error) {
      dispatch(loginFailure('Login failed. Please try again later.'));
    }
  };

  const handleClick = () => {
    navigate('/register');
  };

  // const token=JSON.parse(localStorage.getItem('token'));
  // if(token) findUserDetails();

  return (
    <SignupContainer>
      <SignupForm>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Title style={{ color: '#ff5722' }}> <span style={{ color: '#4caf50' }}>People Mart</span></Title>
        </Link>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SmallButton onClick={handleLogin}>Login</SmallButton>
        <SignupLink onClick={handleClick}>Don't have an account? Sign up</SignupLink>
      </SignupForm>
    </SignupContainer>
  );
}

export default Login;

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
`;

const SignupForm = styled.div`
  background-color: rgba(255, 255, 255, 0.5); /* Adjust the opacity here */
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
  text-decoration: none; 
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 16px;
`;

const SmallButton = styled.button`
  width: 50%;
  padding: 10px;
  background-color: #8bc34a; /* Light green color */
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 14px; /* Reduced font size */
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 0 auto; /* Center button */

  &:hover {
    background-color: #689f38; /* Darker shade of green on hover */
  }
`;

const SignupLink = styled.button`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #333333;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  width: 100%; /* Make the button full width */
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
`;
