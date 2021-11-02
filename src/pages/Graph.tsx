import React from 'react';

import ScatterPlot from '../components/ScatterPlot';
import XAxis from '../components/XAxis';

const Graph = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <ScatterPlot width={500} height={200}>
            <XAxis />
          </ScatterPlot>
        </div>
      </div>
    </section>
  );
};

export default Graph;
