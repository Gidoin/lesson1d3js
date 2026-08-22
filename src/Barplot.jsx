import React from "react";
import * as d3 from "d3";

function measureTextWidth(text, fontSize) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = `${fontSize}px sans-serif`;
  return ctx.measureText(text).width;
}

const Barplot = ({ data }) => {
  const width = 500;
  const height = 400;
  const marginLeft = 100; // Adjust the left margin to accommodate the country names
  const labelSpace = marginLeft - 10; // Space for the labels on the left side
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .padding(0.2)
    .range([0, height]);
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students)])
    .range([0, width - marginLeft]); // Adjust the range to account for the left margin
  const idealFontSize = 12;
  return (
    <svg style={{ border: "1px solid black" }} width={width} height={height}>
      {data.map((d, i) => {
        const measuredWidth = measureTextWidth(d.country, idealFontSize);
        const fontSize = Math.min(
          idealFontSize,
          idealFontSize * (labelSpace / measuredWidth),
        );
        return (
          <g key={i}>
            <rect
              x={marginLeft}
              y={yScale(d.country)}
              width={xScale(d.students)}
              height={yScale.bandwidth()}
              rx={4}
              fill="steelblue"
            ></rect>
            <text
              x={labelSpace}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={fontSize}
            >
              {d.country}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default Barplot;
