import React from 'react';
import './App.css';
import Link from './components/Link.js'

function App() {
  return (
    <div class='center'>
      <h1>Yoav <span id='name-text'>Arbiv</span></h1>
      <p className='above-line-text'>Fullstack developer.</p>
      <p className='above-line-text'>Computer Engineering, class of 2022 at UWaterloo.</p>
      <hr id='line'></hr>
      <div class='link-parent'>
        <Link url="https://github.com/yarbiv">GITHUB</Link>
        <Link url="https://linkedin.com/in/yarbiv">LINKEDIN</Link>
        <Link url={'/resume.pdf'} target="_blank">RESUME</Link>
        <Link url="https://google.com">ABOUT</Link>
        <Link url="mailto:yoav.arbiv@gmail.com">CONTACT</Link>
      </div>
    </div>
  );
}

export default App;
