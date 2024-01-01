import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Post from './pages/Post';
import NotFound from './components/NotFound';
import Home from "./pages/Home";

function App() {
  return (
      <Router>
          <div className="App">
              <Header />
              <main className="container">
                  <Routes>
                      <Route exact path="/" element={<Home />} />
                      <Route path="/post/:id" element={<Post />} />
                      <Route path="/about" element={<About />} />
                      <Route path="*" element={<NotFound />} />
                  </Routes>
              </main>
              <Footer />
          </div>
      </Router>
);
}

export default App;