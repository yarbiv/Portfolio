import React from 'react';
import About from './components/About.js'
import Home from './components/Home.js'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function NoMatch() {
  return (
    <div>
      <h1>Lost?</h1>
      <Link to="/" className='link-child'>Let me take you home :)</Link>
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


function ExploratoriumHint() {
  return (
    <div >
      <img style={{width: '80vw'}} src='IMG_8074.jpeg' alt=''/>
      <h1>It's been a little bit, let's open this lock!</h1>
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
            <Route path="/302-2992-10881-2062-3283-523-140-660-1903-1464-1526-387-557" component={HarbourCourtHint} />
            <Route path="/stagecoachgreens" component={GiantsHint} />
            <Route path="/explore" component={ExploratoriumHint} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
