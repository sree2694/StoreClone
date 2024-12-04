import React from 'react';

const FilterBar = ({ setFilters }) => {
  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="filter-bar">
      <select name="category" onChange={handleFilterChange}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>
      <select name="price" onChange={handleFilterChange}>
        <option value="">No Price Limit</option>
        <option value="50">Under $50</option>
        <option value="100">Under $100</option>
        <option value="500">Under $500</option>
      </select>
    </div>
  );
};

export default FilterBar;
