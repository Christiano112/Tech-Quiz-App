import './App.css';
import Quiz from './components/quiz';
import ErrorPage from './components/error';
import DashBoard from './components/dashboard';
import Settings from './components/settings';
import Form from './components/form';
import SignIn from './components/signin';
import Layout from './components/layout';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='min-h-[100vh] h-[100vh] scroll-smooth'>
      <Routes>
        <Route index path="/" element={<Layout />} />
        <Route path="/signin" element={<SignIn  />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/dashBoard" element={<DashBoard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/update" element={<Form />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
