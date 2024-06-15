import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';
import { BsMicFill } from "react-icons/bs";
import { FaSearch, FaTimes } from 'react-icons/fa';
import SearchList from './SearchList';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [seachListA, setSeachList] = useState(false);
  const TitleArray = useSelector(s => s?.videoReducer)
    ?.data?.filter(q => q?.videoTitle.toUpperCase().includes(searchQuery?.toUpperCase()))
    .map(m => m?.videoTitle);

  const searchBarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setSeachList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef]);

  const handleSelect = (title) => {
    setSearchQuery(title);
    setSeachList(false);
    navigate(`/seacrh/${title}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSeachList(false);
      navigate(`/seacrh/${searchQuery}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSeachList(false);
    navigate('/');
  };

  return (
    <div className='SearchBar_Container'>
      <div className='SearchBar_Container2' ref={searchBarRef}>
        <div className='Search_div'>
          <input 
            type="text" 
            className='iBox_SearchBar' 
            placeholder="Search...."
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
            onKeyDown={handleKeyDown}
            onClick={e => setSeachList(true)}
          />
          {searchQuery && 
            <FaTimes 
              className="clearIcon_SearchBar" 
              onClick={handleClearSearch} 
            />
          }
          <FaSearch 
            className="searchIcon_SearchBar" 
            onClick={e => {
              setSeachList(false);
              navigate(`/seacrh/${searchQuery}`);
            }}
          />
          <BsMicFill className='Mic_SearchBar' />
          {searchQuery && seachListA &&
            <SearchList
              handleSelect={handleSelect}
              TitleArray={TitleArray}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
