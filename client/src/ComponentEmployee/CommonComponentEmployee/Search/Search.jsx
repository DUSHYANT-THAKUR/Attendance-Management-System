import React from "react";
import { FaSearch } from 'react-icons/fa';
import "./Search.css"

const Search = ({serchItem,setSearchItem}) => {
    const handleInputChange = (e) => {
        setSearchItem(e.target.value);
      };
    return (
        <div className="d-flex">
        <div className="input-group search-input-group" style={{ width: "220px" }}>
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search"
          value={serchItem}
          onChange={handleInputChange}
          style={{borderRadius:"20px",backgroundColor: "#e4e4ff"}}
        />
        <FaSearch className="search-icon" />
      </div>
        </div>
    )
}

export default Search;