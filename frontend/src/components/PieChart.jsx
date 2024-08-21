import axios from "axios";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

const PieChart = ({ student }) => {
  const svgRef = useRef();
  const radius = 130;
  const totalWidth = radius * 2;
  const pieData = [
    { label: "Good", value: student.positive },
    { label: "Bad", value: student.negative },
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const color = ["#fb7185", "#9f1239"];

    const pie = d3.pie().value((d) => d.value);
    const dataReady = pie(pieData);

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    svg
      .selectAll(".mySlices")
      .data(dataReady)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (d, i) => color[i])
      .attr("opacity", 1)
      .attr("transform", `translate(${radius},${radius})`);

    svg
      .selectAll(".mySlices")
      .data(dataReady)
      .enter()
      .append("text")
      .text((d) => d.data.label + " : " + d.data.value)
      .attr("text-anchor", "middle")
      .attr("font-size", 17)
      .attr("fill", "white")  
      .attr(
        "transform",
        (d) =>
          `translate(${arcGenerator.centroid(
            d
          )}) translate(${radius},${radius})`
      );
  }, [student]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="relative top-16 text-3xl mt-5 text-center">
        Student's Behavior
      </h1>
      <div className=" absolute top-40">
        <svg
          ref={svgRef}
          width={totalWidth}
          height={totalWidth}
        ></svg>
      </div>
    </div>
  );
};

export default PieChart;
