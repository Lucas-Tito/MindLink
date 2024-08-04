import React, { useState } from "react";
import "./style.css"; // Estilo CSS para o campo de busca

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Chama a função de busca passada como prop
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="search  Search messages"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
