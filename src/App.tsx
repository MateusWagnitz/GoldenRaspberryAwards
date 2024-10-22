import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import MoviesList from './components/MoviesList';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <div className="flex">
        <nav className="w-1/5 bg-gray-800 min-h-screen p-4">
          <ul>
            <li className="mb-4">
              <Link to="/" className="text-white">Dashboard</Link>
            </li>
            <li>
              <Link to="/movies" className="text-white">List</Link>
            </li>
          </ul>
        </nav>
        <div className="w-4/5 p-4 bg-gray-900 text-white">
          <header className="mb-8">
            <h1 className="text-3xl">Frontend React Test</h1>
          </header>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movies" element={<MoviesList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
