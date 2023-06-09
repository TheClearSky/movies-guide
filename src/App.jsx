import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ShowPage from './pages/ShowPage';
import BookPage from './pages/BookPage';
import { useState } from 'react';
import SuccessFullyBookedPage from './pages/SuccessFullyBookedPage';
import BookedMoviesPage from './pages/BookedMoviesPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [searchBarValue,setSearchBarValue]=useState("");
  return (
    <>
        <Routes>
          <Route element={<Navbar searchBarValue={searchBarValue} setSearchBarValue={setSearchBarValue}/>}>
            <Route path="/" element={<HomePage searchQuery={searchBarValue}/>} />
            <Route path="/show/:id/book" element={<BookPage/>} />
            <Route path="/show/:id" element={<ShowPage/>} />
            <Route path="/booked" element={<SuccessFullyBookedPage/>} />
            <Route path="/booklist" element={<BookedMoviesPage/>} />
            <Route path="*" element={<NotFoundPage/>} />
          </Route>
        </Routes>
    </>
  )
}

export default App
