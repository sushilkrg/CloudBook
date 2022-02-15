import './App.css';
// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is Alert" />
          <div className="container">
            {/* Here I have used react router dom v6 structure */}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
