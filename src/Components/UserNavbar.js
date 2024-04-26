import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #003366;
  padding: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 24px;
  color: #ffffff;
`;

const NavMenu = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-right: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #ffffff;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  background-color: #ffffff; /* Set background color */
  padding: 10px; /* Add padding */
  width: 150px; /* Set width */
`;

function UserNavbar({ setProducts }) {
  const navigate=useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const dropdownRef = useRef(null);


  useEffect(()=>{
    if(!isLoggedIn){
      localStorage.removeItem('user');
      navigate('/');
    }
  },[isLoggedIn])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || userData.userType!=='user') {
      navigate("/");
    }
    if (userData.userType==='user') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Perform logout actions
    setIsLoggedIn(false);
   
  };

  return (
    <div>
      <Header>
        <NavbarContainer>
          <Brand>People Mart</Brand>
          <SearchBar setProducts={setProducts} /> {/* Include the SearchBar component */}
          <NavMenu>
            <NavItem>
              <NavLink to="/userhome">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/user/cart">Cart</NavLink>
            </NavItem>
            <NavItem ref={dropdownRef}>
              <DropdownButton onClick={handleDropdownToggle}>
               Account
                <DropdownMenu>
                  <DropdownContent open={isDropdownOpen} >
                    {isLoggedIn ? (
                      <>
                        <NavLink to="/profile"><h5 style={{color : "black"}}>Profile</h5></NavLink>
                        <NavLink to="/user/orders"><h5 style={{color : "black"}}>Order</h5></NavLink>
                        <NavLink onClick={handleLogout}><h5 style={{color : "black"}}>Logout</h5></NavLink>
                      </>
                    ) : (
                      <NavLink to="/login"><h5 style={{color : "black"}}>Login</h5></NavLink>
                    )}
                  </DropdownContent>
                </DropdownMenu>
              </DropdownButton>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Header>
      
      <div style={{ marginTop: '70px', padding: '20px' }}>
        {/* <h2>Welcome to People Mart!</h2> */}
      </div>
    </div>
  );
}

export default UserNavbar;
