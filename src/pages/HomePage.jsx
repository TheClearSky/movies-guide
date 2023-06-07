import React, { useEffect, useState } from 'react';
import "./HomePage.css";
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { NavLink } from 'react-router-dom';
import Pages from '../components/Pages';

//To do

//Display fetch error
let pagesize=20;
export default function HomePage({ searchQuery }) {
    const [moviesFetchResult, setMoviesFetchResult] = useState([]);
    const [pageNumber,setPageNumber]=useState(1);
    useEffect(() => {
        //to cancel the request incase the component unmounts
        const abortfetchmovies = new AbortController();
        async function fetchMovies() {
            setPageNumber(1);
            try {
                let response;
                if(searchQuery)
                {
                    response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchQuery}`, { signal: abortfetchmovies.signal });
                    setMoviesFetchResult(response.data.map(arrelement=>arrelement.show));
                }
                else 
                {
                    response = await axios.get("https://api.tvmaze.com/shows", { signal: abortfetchmovies.signal });
                    setMoviesFetchResult(response.data);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    //request was cancelled, do nothing
                }
                else
                {

                }
            }
        }
        fetchMovies();

        return () => {
            //if component has unmounted, cancel the fetch
            abortfetchmovies.abort();
        }
    }, [searchQuery]);
    return (
        <div>
            <div className="gotobooked">Wanna check booked movies? Click <NavLink className="gotobookedbutton" to={"/booklist"}>Booked Movies</NavLink></div>

            {(moviesFetchResult.length>0)?
            <div className="movieslist">
            {
                moviesFetchResult.slice((pageNumber-1)*pagesize,pageNumber*pagesize).map(({id,name,image,genres,rating})=>
                    <MovieCard key={id} movieid={id} name={name} imageurl={image?.medium} stars={rating?.average} genres={genres} />)
            }
            </div>:
            <div className="movieslist">No results</div>}

            {(moviesFetchResult.length>pagesize)&&
            <Pages pageNumber={pageNumber} setPageNumber={setPageNumber} pageSize={pagesize} fetchedArray={moviesFetchResult}/>}
        </div>
    )
}
