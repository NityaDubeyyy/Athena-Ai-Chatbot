import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatBox from './components/ChatBox';
import { Route, Routes, useLocation } from 'react-router-dom';
import Credits from './pages/Credits';
import Login from './pages/Login';
import Loading from './pages/Loading';
import Community from './pages/Community';
import Profile from './pages/Profile';
import { assets } from './assets/assets';
import './assets/prism.css';
import { useAppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';

const App = () => {

  const { user, loadingUser, theme, mood } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  if (pathname === "/loading" || loadingUser) return <Loading />

  // Dynamic Mood Styles
  const getBackgroundGradient = () => {
    if (theme === 'dark') {
      if (mood === 'energetic') return "bg-gradient-to-br from-[#3b0764] via-[#701a75] to-[#9a3412] text-white"; // Vibrant energetic
      if (mood === 'calm') return "bg-gradient-to-br from-[#020617] via-[#083344] to-[#172554] text-white"; // Deep Sea
      return "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white"; // Neutral
    } else {
      if (mood === 'energetic') return "bg-gradient-to-br from-[#fff7ed] via-[#fef3c7] to-[#ede9fe] text-gray-950";
      if (mood === 'calm') return "bg-gradient-to-br from-[#eff6ff] via-[#ecfeff] to-[#f0f9ff] text-gray-950";
      return "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#ffffff] text-gray-950"; // Neutral
    }
  };

  return (
    <>
      <Toaster />

      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className="absolute top-4 left-4 w-6 invert dark:invert-0 md:hidden cursor-pointer z-50"
          onClick={() => setIsMenuOpen(true)}
          alt="menu"
        />
      )}

      <div className={`h-screen w-screen overflow-hidden transition-colors duration-1000 relative ${getBackgroundGradient()}`}>
        {/* Light Mode Aura Blobs */}
        {theme === "light" && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-200/50 blur-[120px] animate-pulse"></div>
            <div className="absolute top-[10%] -right-[10%] w-[45%] h-[45%] rounded-full bg-indigo-200/40 blur-[100px] animate-pulse delay-700"></div>
            <div className="absolute -bottom-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-pink-200/40 blur-[110px] animate-pulse delay-1000"></div>
          </div>
        )}

        <div className="flex h-full w-full relative z-10">
          {user && <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
          <div className="flex-1 overflow-hidden">
            <Routes>
              {user ? (
                <>
                  <Route path="/" element={<ChatBox />} />
                  <Route path="/credits" element={<Credits />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/profile" element={<Profile />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<Login />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
