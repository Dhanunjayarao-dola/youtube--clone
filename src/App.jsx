import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './page/video/Home/Home';
import Video from './page/video/Video';

const App = () => {
  const [sidebar, setsidebar] = useState(true); 

  return (
    <div className="app-container">
      <Navbar setsidebar={setsidebar} sidebar={sidebar} />
      <div className={`sidebar ${sidebar ? '' : 'small-sidebar'}`}> 
      </div>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
      </Routes>
    </div>
  );
};

export default App;
