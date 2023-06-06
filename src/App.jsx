import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ShowPage from './pages/ShowPage';
import BookPage from './pages/BookPage';
import { useState } from 'react';

function App() {
  const [searchBarValue,setSearchBarValue]=useState("");
  return (
    <>
        <Routes>
          <Route element={<Navbar searchBarValue={searchBarValue} setSearchBarValue={setSearchBarValue}/>}>
            <Route path="/" element={<HomePage searchQuery={searchBarValue}/>} />
            <Route path="/show/:id/book" element={<BookPage/>} />
            <Route path="/show/:id" element={<ShowPage/>} />
          </Route>
        </Routes>
    </>
  )
}

export default App
