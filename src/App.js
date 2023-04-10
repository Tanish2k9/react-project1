
import './App.css';
import {  Route, Routes} from 'react-router-dom';
import Home from './component/home/Home';
import Single from './component/singlepage/Single';
import Search from './component/search/Search';
import { useState } from 'react';
import Navbar from './component/navbar/Navbar';

function App() {
  const [text,setText] = useState("");
 
  return (
    <div className="App">
       
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home text = {text} setText={setText}/>}/>
        <Route path="/:id" element= {<Single/>} />
        <Route path="/search" element = {<Search text={text}/>} />
      </Routes>
      
    </div>
  );
}

export default App;
