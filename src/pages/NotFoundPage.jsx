import React from 'react';
import "./NotFoundPage.css";
import { NavLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='notfoundpage'>
        <div>The page you're looking for doesn't exist</div>
        <NavLink className="notfoundpagebutton" to={"/"}>Go to Home</NavLink>
    </div>
  )
}
