import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BarChart = ({ student }) => {
  //CREDIT: https://www.youtube.com/watch?v=hOzKr8H_438 modified for my project

  const [data] = useState(student.attendance.split(",").map(Number)); 
  const svgRef = useRef();

  useEffect(() => {
    const w = 300;
    const h = 200;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible");
      
    //.style("margin-top", "500px");

    const xScale = d3
      .scaleBand()
      .domain(data.map((val, i) => i))
      .range([0, w])
      .padding(0.5);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)]) 
      .range([h, 0]);
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append("g").call(xAxis).attr("transform", `translate(0,${h})`);
    svg.append("g").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("x", (v, i) => xScale(i))
      .attr("y", (val) => yScale(val))
      .attr("width", xScale.bandwidth())
      .attr("height", (val) => h - yScale(val))
      .attr("class", "bar")
      .style("fill", "#fb7185");  
  }, [data]);

  return (
    <div>
      <div className="flex justify-center items-center flex-col mt-[370px]">
        <h1 className="relative top-16 text-3xl mb-24 text-center">
          Student Attendance
        </h1>
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
};

export default BarChart;
