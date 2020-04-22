import React from "react";
import HistoryHeatmap from "./components/history-heatmap";

function App() {
  return (
    <div>
      <HistoryHeatmap height={400} width={2000} color={"rgb(105, 154, 71)"} />
      <HistoryHeatmap height={400} width={2000} color={"rgb(201, 111, 50)"} />
    </div>
  );
}

export default App;
