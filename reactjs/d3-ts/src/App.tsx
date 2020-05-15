import React from "react";
import HistoryHeatmap from "./components/history-heatmap";
import FeatureParallel from "./components/feature-parallel";

function App() {
  return (
    <div>
      <HistoryHeatmap width={2000} height={400} color={"rgb(105, 154, 71)"} />
      <HistoryHeatmap width={2000} height={400} color={"rgb(201, 111, 50)"} />
      <FeatureParallel width={500} height={400} color={"rgb(105, 154, 71)"} />
      <FeatureParallel width={500} height={400} color={"rgb(201, 111, 50)"} />
    </div>
  );
}

export default App;
