import React, { useState } from 'react';
import './search.css';

function Search({ setSearchval }) {
  const [search, setSearch] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchval(value);
  };

  return (
    <>
      <div className="serachbox">
        <input
          type="search"
          placeholder="Search"
          className="search1"
          value={search}
          onChange={handleInputChange}
        />
        <img
          src="https://www.bankconnect.online/assets/merchants/img/search.svg"
          alt=""
          className="icon"
          style={{ cursor: "pointer" }}
        />
      </div>
    </>
  );
}

export default Search;
