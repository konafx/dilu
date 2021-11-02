import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Graph from './pages/Graph';
import Temperature from './pages/Temperature';
import Theshold from './pages/ThresholdExample';
import Example from './pages/DotExample';

import 'bulma/css/bulma.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar">
          <div className="container">
            <div className="navbar-menu">
              <div className="navbar-start">
                <Link className="navbar-item" to="/graph">
                  Graph
                </Link>
                <Link className="navbar-item" to="/threshold">
                  Example (Threshold)
                </Link>
                <Link className="navbar-item" to="/dots">
                  Example (Dots)
                </Link>
                <Link className="navbar-item" to="/temp">
                  Temperature
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <hr />

        <Switch>
          <Route path="/graph">
            <Graph />
          </Route>
          <Route path="/temp">
            <Temperature width={1000} height={700} />
          </Route>
          <Route path="/threshold">
            <Theshold width={1000} height={700} />
          </Route>
          <Route path="/dots">
            <Example width={1000} height={700} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const Home = () => {
  return <h2 className="title">Home</h2>;
};

export default App;
