import React from 'react';
import "./Navbar.css";
import { Outlet } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
        <div>Navbar</div>
        <Outlet/>
    </>
    
  )
}
