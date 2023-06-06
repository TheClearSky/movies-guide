import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ShowPage from './pages/ShowPage';
import BookPage from './pages/BookPage';

function App() {

  return (
    <>
        <Routes>
          <Route element={<Navbar/>}>
            <Route path="/" element={<HomePage/>} />
            <Route path="/show/:id/book" element={<BookPage/>} />
            <Route path="/show/:id" element={<ShowPage/>} />
          </Route>
        </Routes>
    </>
  )
}

export default App
