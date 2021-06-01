import React from 'react';
import Graph from './Graph';

import 'bulma/css/bulma.min.css';

const App = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-menu">
          <div className="navbar-start"></div>
        </div>
      </nav>
      <Graph />
    </>
  );
};

export default App;
