import React, { useState ,useEffect} from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImg from '../background.png'; 

function Signup() {
  const location = useLocation();
  const userType = location.state ? location.state.userType : null;
  console.log('User type:', userType);

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  
   
  // console.log(`${process.env.REACT_APP_API_URL}`);
  const handleSignup = () => {
    // Validation logic
    if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      setError('All fields are required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // API call
    axios.post(`${process.env.REACT_APP_API_URL}/${userType}/signup`, {
      name,
      username:email,
      password
    })
      .then(response => {
        console.log('Signup successful:', response.data);
        // Save user data to local storage
        localStorage.setItem('user', JSON.stringify({ ...response.data, userType }));
        // Redirect to user type home page
        navigate(`/${userType}Home`);
      })
      .catch(error => {
        alert('Signup failed:', error);
        setError('Signup failed. Please try again later.');
      });
  };
   
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.id && userData.username && userData.name && userType===userData.userType) {
      navigate(`/${userType}Home`);
    }
  }, [userType, navigate]);

  const handleClick = () => {
    if(userType === 'admin')
      navigate('/login', { state: { userType: 'admin' } });
    else 
      navigate('/login', { state: { userType: 'user' } });
  };

  return (
    <SignupContainer>
      <SignupForm>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Title style={{ color: '#ff5722' }}> <span style={{ color: '#4caf50' }}>People Mart</span></Title>
        </Link>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <SmallButton onClick={handleSignup}>Signup</SmallButton>
        <SignupLink onClick={handleClick}>Already have an account? Login</SignupLink>
      </SignupForm>
    </SignupContainer>
  );
}

export default Signup;

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
