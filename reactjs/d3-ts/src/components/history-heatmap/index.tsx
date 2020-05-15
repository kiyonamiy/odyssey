import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface HistoryHeatmapProps {
  height: number;
  width: number;
  color: string;
}

interface HistoryItem {
  group: string;
  variable: string;
  value: number;
}

function drawChart(
  divElement: HTMLDivElement,
  totalWidth: number,
  totalHeight: number,
  color: string
) {
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };
  const CONTENT_WIDTH = totalWidth - margin.left - margin.right;
  const CONTENT_HEIGHT = totalHeight - margin.top - margin.bottom;

  const content = d3
    .select(divElement)
    .append("svg")
    .attr("width", totalWidth)
    .attr("height", totalHeight)
    .append("g")
    // 宽高可以靠子元素撑起来，不需要设置
    .attr("width", CONTENT_WIDTH)
    .attr("height", CONTENT_HEIGHT)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Labels of row and columns
  let myGroups: string[] = [];
  const myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"];
  const prefixList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  for (let i = 1; i <= 5; i++) {
    myGroups.push(...prefixList.map((item) => `${item}${i}`));
  }

  // Build X scales and axis:
  // 定义域 domain；值域 range
  const x: d3.ScaleBand<string> = d3
    .scaleBand()
    .domain(myGroups)
    .range([0, CONTENT_WIDTH])
    .padding(0.05);
  // content
  //   .append("g")
  //   .attr("transform", `translate(0, ${CONTENT_HEIGHT})`)
  //   .call(d3.axisBottom(x));

  // Build Y scales and axis:
  const y: d3.ScaleBand<string> = d3
    .scaleBand()
    .domain(myVars)
    .range([CONTENT_HEIGHT, 0])
    .padding(0.05);
  content.append("g").call(d3.axisLeft(y));

  // Build color scale
  const myColor: d3.ScaleLinear<string, string> = d3
    .scaleLinear<string>()
    .domain([1, 100])
    .range(["white", color]);
  d3.csv<keyof HistoryItem>("/heatmap_data.csv").then(
    (data: d3.DSVRowArray<"group" | "variable" | "value">) => {
      content
        .selectAll()
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.group as string) as number)
        .attr("y", (d) => y(d.variable as string) as number)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", (d) =>
          myColor(parseFloat(d.value as string) * Math.random())
        );
    }
  );
}

const HistoryHeatmap: React.FunctionComponent<HistoryHeatmapProps> = function (
  props
) {
  const { height, width, color } = props;
  const heatmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heatmapRef.current == null) {
      return;
    }
    drawChart(heatmapRef.current, width, height, color);
  }, []);

  return <div ref={heatmapRef}></div>;
};

export default HistoryHeatmap;
