import React from 'react';
import "./ShowPage.css";
import { useParams } from 'react-router-dom';

export default function ShowPage() {
    const {id:movieid}=useParams();
  return (
    <div>ShowPage:{movieid}</div>
  )
}
