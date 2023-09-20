import React, { useState } from 'react';
import axios from 'axios';

function BookSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/books/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      {searchResults.map((book) => (
        <div key={book._id}>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          {/* Other book details */}
        </div>
      ))}
    </div>
  );
}

export default BookSearch;
