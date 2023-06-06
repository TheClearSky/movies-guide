import React from 'react';
import "./SuccessFullyBookedPage.css";
import { NavLink } from 'react-router-dom';

export default function SuccessFullyBookedPage() {
  return (
    <div className="successfullybooked">
        <div className="successfullybookedtitle">Your movie was successfully booked!!</div>
        <div className="successfullybookedbuttons">
            <NavLink className="successfullybookedbutton" to={"/"}>Go back to home</NavLink>
            <NavLink className="successfullybookedbutton" to={"/booklist"}>Check out booked movies</NavLink>
        </div>
    </div>
  )
}
