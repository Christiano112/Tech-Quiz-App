import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Register from './components/register';
import Login from './components/login';
import Quiz from './components/quiz';
import ErrorPage from './components/error';
import Footer from './components/footer';
import Navbar from './components/navbar';
import DashBoard from './components/dashboard';

function App() {
  return (
    <div className='min-h-[100vh] h-[100%]'>
      <Navbar />

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/dashBoard" element={<DashBoard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
