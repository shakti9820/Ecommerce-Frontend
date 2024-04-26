import React, { useState ,useEffect} from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import backgroundImg from '../background.png'; 
import axios from 'axios';

function Login() {
  const location = useLocation();
  const userType = location.state ? location.state.userType : null;
  console.log('User type:', userType);
   
  const navigate = useNavigate();

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  useEffect(()=>{
     if(userType==null) navigate("/");
  },[])


  const handleLogin = () => {
    // Validation logic
    if (email.trim() === '' || password.trim() === '') {
      setError('Email and password are required');
      return;
    }

    // API call for login
    axios.post(`${process.env.REACT_APP_API_URL}/${userType}/login`, {
      username:email,
      password
    })
    .then(response => {
      // Check if login is successful
      if (response.data && response.data.id && response.data.username && response.data.name) {
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify({ ...response.data, userType }));
        // Redirect to user type home page
        // console.log(`${userType}home`);
        navigate(`/${userType}home`);
      } else {
        setError('Incorrect email or password');
      }
    })
    .catch(error => {
      console.error('Login failed:', error);
      setError('Login failed. Please try again later.');
    });
  };

  // Check if user is already logged in
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.id && userData.username && userData.name && userType===userData.userType) {
      navigate(`/${userType}Home`);
    }
  }, [userType, navigate]);
   
  const handleClick = () => {
    if(userType === 'admin')
      navigate('/register', { state: { userType: 'admin' } });
    else 
      navigate('/register', { state: { userType: 'user' } });
  };

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
