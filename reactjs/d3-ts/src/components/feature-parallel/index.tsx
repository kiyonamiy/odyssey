import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface FeatureParallelProps {
  height: number;
  width: number;
  color: string;
}

interface FeatureItem {
  Petal_Length: string;
  Petal_Width: string;
  Sepal_Length: string;
  Sepal_Width: string;
  Species: string;
}

function drawChart(
  divElement: HTMLDivElement,
  totalWidth: number,
  totalHeight: number,
  color: string
) {
  const margin = { top: 30, right: 10, bottom: 10, left: 0 };
  const CONTENT_WIDTH = totalWidth - margin.left - margin.right;
  const CONTENT_HEIGHT = totalHeight - margin.top - margin.bottom;

  const content = d3
    .select(divElement)
    .append("svg")
    .attr("width", totalWidth)
    .attr("height", totalHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const divSelection = d3.select(divElement);
  const svgSelection = divSelection.select("svg");
  const gSelection = d3.select(divElement).select("svg").select("g");
  console.log(divSelection, divElement);
  console.log(svgSelection);
  console.log(gSelection);

  d3.csv<keyof FeatureItem>("./parallel_data.csv").then(
    (data: d3.DSVRowArray<keyof FeatureItem>) => {
      const dimensions = data.columns.filter((item) => item != "Species");

      const yMap = new Map<string, d3.ScaleLinear<number, number>>();
      for (const dimension of dimensions) {
        const scale = d3
          .scaleLinear()
          .domain(
            d3.extent<d3.DSVRowString<keyof FeatureItem>, number>(
              data,
              (d: d3.DSVRowString<keyof FeatureItem>) =>
                parseFloat(d[dimension] as string)
            ) as [number, number]
          )
          .range([CONTENT_HEIGHT, 0]);
        yMap.set(dimension, scale);
      }

      // Build the X scale -> it find the best position for each Y axis
      const xAxis = d3
        .scalePoint()
        .domain(dimensions)
        .range([0, CONTENT_WIDTH])
        .padding(1);

      // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
      const pathFn = function (d: d3.DSVRowString<keyof FeatureItem>) {
        const line = d3.line();
        const xyList: [number, number][] = dimensions.map((dimension) => {
          const yAxis = yMap.get(dimension) as d3.ScaleLinear<number, number>;
          const x = xAxis(dimension) as number;
          const y = yAxis(parseFloat(d[dimension] as string));
          return [x, y];
        });
        return line(xyList);
      };

      // Draw the lines
      content
        .selectAll()
        .data(data)
        .enter()
        .append("path")
        .attr("d", pathFn)
        .style("fill", "none")
        .style("stroke", color)
        .style("opacity", 0.5);

      // Draw the axis
      content
        .selectAll()
        .data(dimensions)
        .enter()
        .append("g")
        .attr("transform", (d) => `translate(${xAxis(d)})`)
        .each(function (d) {
          d3.select(this).call(
            d3.axisLeft(yMap.get(d) as d3.ScaleLinear<number, number>)
          );
        })
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text((d) => d)
        .style("fill", "black");
    }
  );
}

const FeatureParallel: React.FunctionComponent<FeatureParallelProps> = function (
  props
) {
  const { height, width, color } = props;
  const parallelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parallelRef.current == null) {
      return;
    }
    drawChart(parallelRef.current, width, height, color);
  }, []);

  return <div ref={parallelRef}></div>;
};

export default FeatureParallel;
