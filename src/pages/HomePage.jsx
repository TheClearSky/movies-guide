import React, { useEffect, useState } from 'react';
import "./HomePage.css";
import axios from 'axios';
import MovieCard from '../components/MovieCard';

//To do

//Display fetch error
//Handle no search results
//Pagination
export default function HomePage({ searchQuery }) {
    const [moviesFetchResult, setMoviesFetchResult] = useState([]);
    useEffect(() => {
        //to cancel the request incase the component unmounts
        const abortfetchmovies = new AbortController();
        async function fetchMovies() {
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
            <div className="movieslist">
            {
                moviesFetchResult.slice(0,20).map(({id,name,image,genres,rating})=>
                    <MovieCard key={id} movieid={id} name={name} imageurl={image?.medium} stars={rating?.average} genres={genres} />)
            }
            </div>
        </div>
    )
}
