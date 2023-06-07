import React, { useState,useEffect } from 'react';
import "./BookPage.css";
import "./ShowPage.css";
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';


export default function BookPage() {
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
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    useEffect(()=>{
        const firstNameFromLocalStorage=localStorage.getItem("firstName");
        if(firstNameFromLocalStorage) setFirstName(firstNameFromLocalStorage);
        const lastNameFromLocalStorage=localStorage.getItem("lastName");
        if(lastNameFromLocalStorage) setLastName(lastNameFromLocalStorage);
    },[]);

    function handleFirstNameChange(e)
    {
        setFirstName(e.target.value);
        localStorage.setItem("firstName",e.target.value);
    }
    function handLastNameChange(e)
    {
        setLastName(e.target.value);
        localStorage.setItem("lastName",e.target.value);
    }
    function handleBook()
    {
        const bookList=localStorage.getItem("bookList");
        if(bookList)
        {
            const parsedBookList=JSON.parse(bookList);
            if(parsedBookList.includes(movieid))
            {
                return;
            }
            parsedBookList.push(movieid);
            localStorage.setItem("bookList",JSON.stringify(parsedBookList));
        }
        else
        {
            localStorage.setItem("bookList",JSON.stringify([movieid]));
        }
    }
    const {name,language,runtime}=movieFetchResult;
  return (
    <div className="bookpage">
        {errorMessage&&
        <div style={{color:"red"}}>{errorMessage}</div>}
        <div>
            <div className="bookpagetitle">
                Booking Movie: {name}
            </div>
            {language&&
            <div className='bookpagelanguage'>Language: {language}</div>}
            {runtime&&
            <div className='bookpageruntime'>Runtime: {runtime}m</div>}
        </div>
        <div>
            <label>
                Your first name:
                <input name="firstName" value={firstName} onChange={handleFirstNameChange} />
            </label>
            <label>
                Your last name:
                <input name="lastName" value={lastName} onChange={handLastNameChange}/>
            </label>
        </div>
        <NavLink className="bookpagebutton" to={"/booked"} onClick={handleBook}>Book</NavLink>
    </div>
  )
}
