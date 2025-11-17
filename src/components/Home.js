import React from 'react';
import Nav from './Nav.js';

export default function Home() {
  return (
    <div>
      <h1>Yoav <span id='name-text'>Arbiv</span></h1>
      <p className='above-line-text'>Software developer with a strong interest in distributed systems.</p>
      <p className='above-line-text'>Computer Engineering gradute, class of 2022 at UWaterloo.</p>
      <Nav/>
    </div>
  );
}
