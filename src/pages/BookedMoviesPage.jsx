import React, { useEffect, useState } from 'react';
import "./BookedMoviesPage.css";
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import Pages from '../components/Pages';

//To do
//Handle no booked movies
//Handle fetch errors
let pagesize=10;
export default function BookedMoviesPage() {
    const [bookList,setBookList]=useState([]);
    useEffect(()=>{
        const bookListFromLocalStorage=localStorage.getItem("bookList");
        if(bookListFromLocalStorage)
        {
            setBookList(JSON.parse(bookListFromLocalStorage));
        }
    },[]);

    const [fetchedMovies,setFetchedMovies]=useState([]);
    useEffect(() => {
        //to cancel the request incase the component unmounts
        setFetchedMovies([]);
        const abortfetchmovies = new AbortController();
        async function fetchMovie(id) {
            try {
                let response = await axios.get(`https://api.tvmaze.com/shows/${id}`, { signal: abortfetchmovies.signal });
                setFetchedMovies((prevData)=>[...prevData,response.data]);
            } catch (error) {
                if (axios.isCancel(error)) {
                    //request was cancelled, do nothing
                }
                else
                {

                }
            }
        }
        bookList.forEach(movieid=>fetchMovie(movieid));

        return () => {
            //if component has unmounted, cancel the fetch
            abortfetchmovies.abort();
        }
    }, [bookList]);

    const [pageNumber,setPageNumber]=useState(1);

  return (
    <div className="bookedmovies">
        {(fetchedMovies.length>0)?
        <>
            <div className="bookedmoviestitle">
                The movies you have booked!!
            </div>
            <div className="bookedmovieslist">
            {
                fetchedMovies.slice((pageNumber-1)*pagesize,pageNumber*pagesize).map(({id,name,image,genres,rating})=>
                    <MovieCard key={id} movieid={id} name={name} imageurl={image?.medium} stars={rating?.average} genres={genres} />)
            }
            </div>
        </>:
        <div className="bookedmovieslist">No results</div>}
        {(fetchedMovies.length>pagesize)&&
        <Pages pageNumber={pageNumber} setPageNumber={setPageNumber} pageSize={pagesize} fetchedArray={fetchedMovies}/>}
    </div>
  )
}
