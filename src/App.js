import React from 'react';
import About from './components/About.js'
import Home from './components/Home.js'
import TetrisGrid from './components/Tetris.js';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function NoMatch() {
  return (
    <div>
      <h1>Lost?</h1>
      <Link to="/" className='link-child'>Let me take you home :)</Link>
    </div>
  );
}

function ScavengerLandingPage() {
  return (
    <div>
      <h2>I hope you're enjoying that chai :)</h2>
      <h2>I have a bunch of today's hints set up on this website.</h2>
      <h2>For the rest of the day, unless I say otherwise, the code hints will be URLs on the website like this one.</h2>
      <h2>Here, let's do this first one together.</h2>
      <h2>The next hint is the first letter of each sentence :)</h2>
    </div>
  )
} 

function PennsylvaniaStreetFlowerBushHint() {
  return (
    <div>
      <h2>Okay nice! Starting out nice and casual. Next up:</h2>
      <hr/> 
      <h2>A big climb ahead, but which direction to go?</h2>
      <h2>A stately street where violet flowers grow!</h2>
    </div>
  )
} 

function GiantsHint() {
  return (
    <div >
      <img style={{width: '80vw'}} src='IMG_8188.jpeg' alt=''/>
      <h2>Find an iron giant who went face to face with bats</h2>
      <h2>Our next web address, pointed to by stats!</h2>
      <h3>(separate with dashes!)</h3>
    </div>
  );
}


function HarbourCourtHint() {
  return (
    <div >
      <h2>i <u>Harbour</u> feelings for you, but the ball's in your <u>Court</u></h2>
      <h2>now remind me where we got picked up to taste a wonderful port?</h2>
    </div>
  );
}

function ExploratoriumHint() {
  return (
    <div >
      <img style={{width: '80vw'}} src='IMG_8074.jpeg' alt=''/>
      <h1>I bet you're dying to open that lock!</h1>
      <h2>How many hole-y banners are out front?</h2>
      <h2>How many pumps can a firefighter use here?</h2>
      <h2>What month was this picture taken?</h2>
    </div>
  );
}

function App() {
  return (
    <div className='parent'>
      <div className='center'>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/scavenger" component={ScavengerLandingPage} />
            <Route path="/iifht" component={PennsylvaniaStreetFlowerBushHint} />
            <Route path="/stagecoachgreens" component={GiantsHint} />
            <Route path="/302-2992-10881-2062-3283-523-140-660-1903-1464-1526-387-557" component={HarbourCourtHint} />
            <Route path="/explore" component={ExploratoriumHint} />
            <Route path="/tetris" component={TetrisGrid} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
