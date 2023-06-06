import React from 'react';
import "./SearchBar.css";

export default function SearchBar({value,setValue}) {
  return (
    <div>
        <input className='searchbar' value={value} onChange={(e)=>setValue(e.target.value)} type="text" placeholder='Search' />
    </div>
  )
}
