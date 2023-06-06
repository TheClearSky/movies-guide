import React from 'react';
import "./MovieCard.css";
import { NavLink } from 'react-router-dom';

export default function MovieCard({movieid,name,imageurl,stars,genres}) {
    
  return (
    <div className='moviecard' >
        {(imageurl) ? <div className="moviecardimage" style={{backgroundImage:`url(${imageurl})`}} /> :
        <div className="moviecardimage">No image available</div>}
        <div className="moviedetails">
            <div className="leftpane">
                <span className="moviename">{name}</span>
                {genres &&
                    <div className="genres">
                        {genres.slice(0,2).map((genre)=>
                        <span key={genre} className="genre">{genre}</span>
                        )}
                    </div>
                }
                <NavLink className='moviesummarybutton' to={`/show/${movieid}`}>Open</NavLink>
            </div>
            <div className="rightpane">
                {stars &&
                <div className="stars">{`${stars}/10`}</div>}
            </div>
        </div>
    </div>
  )
}
