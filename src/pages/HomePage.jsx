import React, { useEffect, useState } from 'react';
import "./HomePage.css";
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { NavLink } from 'react-router-dom';

//To do

//Display fetch error
//Handle no search results
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
    console.log(moviesFetchResult);
    function goToNextPage()
    {
        if(pageNumber*pagesize<moviesFetchResult.length)
        {
            setPageNumber(prevPageNumber=>prevPageNumber+1);
        }
    }
    function goToPreviousPage()
    {
        if(pageNumber>1)
        {
            setPageNumber(prevPageNumber=>prevPageNumber-1);
        }
    }
    return (
        <div>
            <div className="gotobooked">Wanna check booked movies? Click <NavLink className="gotobookedbutton" to={"/booklist"}>Booked Movies</NavLink></div>
            <div className="movieslist">
            {
                moviesFetchResult.slice((pageNumber-1)*20,pageNumber*20).map(({id,name,image,genres,rating})=>
                    <MovieCard key={id} movieid={id} name={name} imageurl={image?.medium} stars={rating?.average} genres={genres} />)
            }
            </div>
            {(moviesFetchResult.length>20)&&
            <>
                <div className="pages">
                    <div className="previouspage" onClick={goToPreviousPage} >{"<<"}</div>
                    <div className="pagenumber">Page: {pageNumber}</div>
                    <div className="nextpage" onClick={goToNextPage} >{">>"}</div>
                </div>
            </>
            }
        </div>
    )
}
