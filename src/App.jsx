import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';  // Import useLocation
import Navbar from './components/Navbar/Navbar';  
import Sidebar from './components/Sidebar/Sidebar';  
import Home from './page/video/Home/Home';
import Video from './page/video/Video';
import Recommended from './components/Recommended/Recommended';

const App = () => {
  const [sidebar, setSidebar] = useState(true);  
  const location = useLocation(); 
  const hideSidebar = location.pathname.includes('/video/');

  return (
    <div className="app-container">
      <Navbar setSidebar={setSidebar} sidebar={sidebar} /> 
      
      
      {!hideSidebar && <Sidebar sidebar={sidebar} />} 
      

      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/youtube--clone' element={<Home sidebar={sidebar} />} /> 
        <Route path='/youtube--clone/video/:categoryId/:videoId' element={<Video />} />
      </Routes>
    </div>
  );
};

export default App;
