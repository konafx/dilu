import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Graph from './pages/Graph';

import 'bulma/css/bulma.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Home
              </Link>
              <Link className="navbar-item" to="/graph">
                Graph
              </Link>
              <Link className="navbar-item" to="/users">
                Users
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Switch>
        <Route path="/graph">
          <Graph />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

function Home() {
  return <h2 className="title">Home</h2>;
}

function Users() {
  return <h2 className="title">Users</h2>;
}
