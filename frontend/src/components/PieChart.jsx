import axios from "axios";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

const PieChart = ({ student }) => {
  const [data] = useState([
    { property: `positive - ${student.positive}`, value: student.positive },
    { property: `negative - ${student.negative}`, value: student.negative },
  ]);
  const svgRef = useRef();

  useEffect(() => {
    const w = 280;
    const h = 280;
    const radius = w / 2;

    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin-top", "260px");
    const formatData = d3.pie().value((d) => d.value)(data);
    const arcGenerator = d3.arc().innerRadius(5).outerRadius(radius);
    const color = d3.scaleOrdinal().range(d3.schemeSet2);

    svg
      .selectAll()
      .data(formatData)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.value))
      .style("opacity", 0.7);
    svg
      .selectAll()
      .data(formatData)
      .join("text")
      .text((d) => d.data.property)
      .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
      .style("text-anchor", "middle");
  }, data);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="relative top-16 text-3xl mt-5 text-center">Student's Behavior</h1>
      <div className="w-[0%] fixed top-6">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default PieChart;
