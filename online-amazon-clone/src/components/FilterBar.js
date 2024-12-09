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
          <select onChange={(e) => setFilters((prev) => ({...prev, priceRange: e.target.value}))}>
              <option value="">Price Range</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-200">$101 - $200</option>
              <option value="200-1000">$200+</option>
          </select>

      </div>
  );
};

export default FilterBar;
