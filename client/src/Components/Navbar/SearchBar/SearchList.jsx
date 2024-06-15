import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchList.css';

function SearchList({ TitleArray, handleSelect }) {
  return (
    <div className="Container_SearchList">
      {TitleArray.map(title => (
        <p 
          key={title}
          onClick={() => handleSelect(title)}
          className='titleItem'
        >
          <FaSearch/>
          {title}
        </p>
      ))}
    </div>
  );
}

export default SearchList;
