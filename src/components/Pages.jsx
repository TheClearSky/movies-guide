import React from 'react';
import "./Pages.css";

export default function Pages({pageNumber,setPageNumber,fetchedArray,pageSize}) {
    function goToNextPage()
    {
        if(pageNumber*pageSize<fetchedArray.length)
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
    <div className="pages">
        <div className="previouspage" onClick={goToPreviousPage} >{"<<"}</div>
        <div className="pagenumber">Page: {pageNumber}</div>
        <div className="nextpage" onClick={goToNextPage} >{">>"}</div>
    </div>
  )
}
