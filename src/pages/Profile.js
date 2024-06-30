import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ProfileContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const ProfileHeading = styled.h2`
  font-size: 24px;
  color: #333333;
  margin-bottom: 20px;
`;

const ProfileInfo = styled.div`
  font-size: 18px;
  color: #666666;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Profile = () => {

  const [userDetails,setUserDetails]=useState();
  const navigate = useNavigate();
  const UserType = (localStorage.getItem('UserType'));



  const findUserDetails=async()=>{
    try {
      const token = JSON.parse(localStorage.getItem('token')).jwt;
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user-details`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
     setUserDetails(response.data);
     console.log(userDetails);
    } catch (error) {
      console.log('Error fetching products', error);
    } 
  };

  useEffect(()=>{
    findUserDetails();
   
  },[]);


  const goToHome = () => {
    if (UserType === 'admin') {
      navigate('/adminhome');
    } else {
      navigate('/userhome');
    }
  };


  //  const {name,username}=userDetails;
  //  console.log(username);
  //  console.log(name);
  return (
    <CenteredContainer>
      <ProfileContainer>
        <ProfileHeading>User Profile</ProfileHeading>
        {/* <ProfileInfo>User Type: {UserType}</ProfileInfo>
        <ProfileInfo>Name: {name}</ProfileInfo>
        <ProfileInfo>Username: {username}</ProfileInfo>
        <Button onClick={goToHome}>Go to Home</Button> */}
      </ProfileContainer>
    </CenteredContainer>
  );
};

export default Profile;
