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

function App() {
  return (
    <div className='parent'>
      <div className='center'>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
