import React from 'react';
import "./Navbar.css";
import { Outlet } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Navbar({searchBarValue,setSearchBarValue}) {
  return (
    <>
        <nav className='navbar'>
            <div className='navtitles'>
                <span className='navtitle'>Movies Guide</span>
                <span className='navsubtitle'>What do you wanna watch today?</span>
            </div>
            <SearchBar value={searchBarValue} setValue={setSearchBarValue}/>
        </nav>
        <Outlet/>
    </>
    
  )
}
