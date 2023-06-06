import React from 'react';
import "./Navbar.css";
import { NavLink, Outlet } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Navbar({searchBarValue,setSearchBarValue}) {
  return (
    <>
        <nav className='navbar'>
            <div className='navtitles'>
                <NavLink className='navtitle' to={"/"}>Movies Guide</NavLink>
                <span className='navsubtitle'>What do you wanna watch today?</span>
            </div>
            <SearchBar value={searchBarValue} setValue={setSearchBarValue}/>
        </nav>
        <Outlet/>
    </>
    
  )
}
