import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import axios from 'axios';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  flex: 0.8; /* Allow the search bar to take up remaining space */
  position: relative; /* Set position relative for absolute positioning */
`;

const SearchInput = styled.input`
  padding: 8px 36px 8px 12px; /* Adjust padding for the icon */
  font-size: 16px;
  border: none; /* Remove border */
  border-radius: 5px;
  background-color: transparent; /* Make background transparent */
  color: #fff; /* Text color is white */
  flex: 1; /* Allow the input to take up remaining space */
`;

const SearchButton = styled.button`
  position: absolute; /* Position the button */
  right: 8px; /* Adjust right position */
  padding: 8px;
  font-size: 16px;
  background-color: transparent; /* Make background transparent */
  color: #fff; /* Set icon color to white */
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SearchBar = ({ setProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Perform search operation based on searchTerm
    console.log(searchTerm);
    axios.get(`${process.env.REACT_APP_API_URL}/search/product/${searchTerm}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error searching products:', error);
      });
  };

  return (
    <SearchContainer>
      <SearchInput 
        type="text" 
        placeholder="Search products..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <SearchButton onClick={handleSearch}><FaSearch /></SearchButton> {/* Replace text with search icon */}
    </SearchContainer>
  );
};
 
export default SearchBar;
