const margin1 = {top: 30, right: 50, bottom: 20, left: 50},
  width1 = 1100 - margin1.left - margin1.right,
  height1 = 550 - margin1.top - margin1.bottom;

// append the svg object to the body of the page
const svg2 = d3.select("#parallel")
.append("svg")
  .attr("width", width1 + margin1.left + margin1.right)
  .attr("height", height1 + margin1.top + margin1.bottom)
.append("g")
  .attr("transform",
        `translate(${margin1.left},${margin1.top})`);


d3.csv("https://raw.githubusercontent.com/lloydy8/lloydy8.github.io/main/datasets/parallel.csv").then( function(data1) {

  // Color scale: give me a specie name, I return a color
  const color = d3.scaleOrdinal()
    .domain(["agent1","agent2","agent3" ])
    .range(["rgb(25, 193, 190)", "green","goldenrod"])

  // Here I set the list of dimension manually to control the order of axis:
  dimensions = ["score", "length", "noop", "fire", "right","left","right-fire","left-fire"]

  // For each dimension, I build a linear scale. I store all in a y object
  const y1 = {}
  for (j in dimensions) {
    
    y1["score"] = d3.scaleLinear()
       .domain([0,1400])
       .range([height1, 0])
    y1["length"] = d3.scaleLinear()
       .domain([0,2500])
       .range([height1, 0])
    y1["noop"] = d3.scaleLinear()
       .domain([0,0.5])
       .range([height1, 0])
    y1["fire"] = d3.scaleLinear()
       .domain([0,0.5])
       .range([height1, 0])
    y1["right"] = d3.scaleLinear()
       .domain([0,0.5])
       .range([height1, 0])
    y1["left"] = d3.scaleLinear()
       .domain([0,0.5])
       .range([height1, 0])
    y1["right-fire"] = d3.scaleLinear()
       .domain([0,0.5])
       .range([height1, 0])
    y1["left-fire"] = d3.scaleLinear()
       .domain([0,0.5])
       .range([height1, 0])

  }
  

  // Build the X scale -> it find the best position for each Y axis
  x1 = d3.scalePoint()
    .range([0, width1])
    .domain(dimensions);

  // Highlight the specie that is hovered
  const highlight = function(event, d1){

    selected_episode = d1.model

    // first every group turns grey
    d3.selectAll(".line")
      .transition().duration(200)
      .style("stroke", "lightgrey")
      .style("opacity", "0.2")
    // Second the hovered specie takes its color
    d3.selectAll("." + selected_episode)
      .transition().duration(200)
      .style("stroke", color(selected_episode))
      .style("opacity", "1")
  }

  // Unhighlight
  const doNotHighlight = function(event, d1){
    d3.selectAll(".line")
      .transition().duration(200).delay(1000)
      .style("stroke", function(d1){ return( color(d1.model))} )
      .style("opacity", "1")
  }


  const selected = function(event, d1){

    selected_episode = d1.model

    d3.selectAll(".line")
      .transition().duration(200)
      .style("opacity", "0")
  }
  const unselect = function(event, d1){
    d3.selectAll(".line")
      .transition().duration(200).delay(1000)
      .style("stroke", function(d1){ return( color(d1.model))} )
      .style("opacity", "1")
  }
  
  // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
  function path(d1) {
      return d3.line()(dimensions.map(function(p1) { return [x1(p1), y1[p1](d1[p1])]; }));
  }
  // Draw the lines
  svg2
    .selectAll("myPath")
    .data(data1)
    .join("path")
      .attr("class", function (d1) { return "line " + d1.model} ) 
      .attr("d",  path)
      .attr("stroke-width", 2.0)
      .style("fill", "none" )
      .style("stroke", function(d1){ return( color(d1.model))}) 
      .style("opacity", 1)
      .on("mouseover", highlight)
      .on("mouseleave", doNotHighlight )

  // Draw the axis:
  svg2.selectAll("myAxis")
    // For each dimension of the dataset I add a 'g' element:
    .data(dimensions).enter()
    .append("g")
    .attr("class", "axis")
    // I translate this element to its right position on the x axis
    .attr("transform", function(d1) { return `translate(${x1(d1)})`})
    // And I build the axis with the call function
    .each(function(d1) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y1[d1])); })
       .style("font-size", "1.2rem")
    // Add axis title
    .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .style("font-size", "1.8rem")
      .style("font-weight", "550")
      .style("text-transform", "capitalize")
      .text(function(d1) { return d1; })
      .style("fill", "black")

  svg2.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", 180)
    .attr("y", 540)
    .text("Agent at Timestep 2,150,000")
    .style("font-size","1.8rem")
    .style("fill", "rgb(25, 193, 190)");

  svg2.append("rect")
      .attr("x", 30)
      .attr("y", 528)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", "rgb(25, 193, 190)");
 
  svg2.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", 500)
    .attr("y", 540)
    .text("Agent at Timestep 3,050,000")
    .style("font-size","1.8rem")
    .style("fill", "green");
  
  svg2.append("rect")
      .attr("x", 345)
      .attr("y", 528)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", "green");

  svg2.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", 830)
    .attr("y", 540)
    .text("Agent at Timestep 3,400,000")
    .style("font-size","1.8rem")
    .style("fill", "goldenrod");
  
  svg2.append("rect")
      .attr("x", 675)
      .attr("y", 528)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", "goldenrod");

})
