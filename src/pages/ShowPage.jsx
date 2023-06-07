import React, { useState,useEffect } from 'react';
import "./ShowPage.css";
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ShowPage() {
    const {id:movieid}=useParams();
    const [movieFetchResult, setMovieFetchResult] = useState({});
    const [errorMessage,setErrorMessage]=useState(null);
    useEffect(() => {
        //to cancel the request incase the component unmounts
        setErrorMessage(null);
        const abortfetchmovies = new AbortController();
        async function fetchMovie() {
            try {
                let response = await axios.get(`https://api.tvmaze.com/shows/${movieid}`, { signal: abortfetchmovies.signal });
                setMovieFetchResult(response.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    //request was cancelled, do nothing
                }
                else
                {
                    setErrorMessage(error.message);
                }
            }
        }
        fetchMovie();

        return () => {
            //if component has unmounted, cancel the fetch
            abortfetchmovies.abort();
        }
    }, []);
    const {name,language,image,genres,rating,runtime,status,type,summary}=movieFetchResult;
  return (
    <div className="showpage">
        {errorMessage&&
        <div style={{color:"red","textAlign":"center"}}>{errorMessage}</div>}
        <div className="showbanner">
            {(image?.original) ? <div className="showimage" style={{backgroundImage:`url(${image?.original})`}} /> :
            <div className="showimage">No image available</div>}
            <div className="showheadings">
                <div>
                    <div className="showtitle">{name}</div>
                    <div className="showlanguage">{language}</div>
                </div>
                <div>
                    {genres &&
                    <div className="showgenres">
                        {genres.map((genre)=>
                        <span key={genre} className="showgenre">{genre}</span>
                        )}
                    </div>
                    }
                    {rating?.average &&
                    <div className="showstars">
                        {rating.average}/10
                    </div>}
                </div>
                <div>
                    {runtime &&
                    <div className="showruntime">
                        {runtime}m
                    </div>
                    }
                    {status &&
                    <div className="showstatus">
                        {status}
                    </div>
                    }
                    {type &&
                    <div className="showtype">
                        Type:{type}
                    </div>
                    }
                </div>
                <NavLink className="showbookbutton" to={`/show/${movieid}/book`}>Book</NavLink>
            </div>
            
        </div>
        {summary &&
        <div className="showcontent">
            <div className="showcontenttitle">Summary</div>
            <div className="showcontentbody" dangerouslySetInnerHTML={{__html:summary}} />
        </div>}
    </div>
  )
}
