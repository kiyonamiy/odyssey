import React from 'react';
import LineChart from './components/line-chart';
import EchartsBar from './components/echarts-bar';
import CorrelationGraph from './components/correlation-graph';

const App: React.FC = () => {
  return (
    // <div style={{ width: `100%`, height: 260 }}>
    //   <LineChart />
    // </div>
    // <div style={{ width: `100%`, height: 500 }}>
    //   <EchartsBar />
    // </div>
    <div style={{ width: 800, height: 670 }}>
      <CorrelationGraph />
    </div>
  );
};

export default App;
