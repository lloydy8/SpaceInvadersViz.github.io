const margin6 = {top: 30, right: 30, bottom: 0, left: 40},
  width6 = 500 - margin6.left - margin6.right,
  height6 = 560 - margin6.top - margin6.bottom;
// append the svg object to the body of the page
const svg6 = d3.select("#stats")
  .append("svg")
    .attr("width", width6 + margin6.left + margin6.right)
    .attr("height", height6 + margin6.top + margin6.bottom)
  .append("g")
    .attr("transform", `translate(${margin6.left},${margin6.top})`);

// Initialize the X axis
const x6 = d3.scaleBand()
  .range([ 0, width6 ])
  .padding(0.2);
const x6Axis = svg6.append("g")
.attr("transform", `translate(0,${height6})`);
   

// Initialize the Y axis
const y6 = d3.scaleLinear()
  .range([ height6, 0]);
const y6Axis = svg6.append("g")
  .attr("class", "myYaxis");

const colour = d3.scaleOrdinal()
    .domain(["agent1","agent2","agent3" ])
    .range(["rgb(25, 193, 190)", "green","goldenrod"])


// A function that create / update the plot for a given variable:
function update(selectedVar) {

  // Parse the Data
  d3.csv("https://raw.githubusercontent.com/lloydy8/SpaceInvaders/main/stats.csv").then( function(data) {

    // X axis
    x6.domain(data.map(d => d.agent));
    x6Axis.transition().duration(1000).call(d3.axisBottom(x6));

    // Add Y axis
    y6.domain([0, d3.max(data, d => +d[selectedVar])]);
    y6Axis.transition().duration(1000).call(d3.axisLeft(y6))
    y6.nice();

    // variable u: map data to existing bars
    const p = svg6.selectAll("rect")
      .data(data)

    // update bars
    p.join("rect")
      .transition()
      .duration(1000)
        .attr("x", d => x6(d.agent))
        .attr("y", d => y6(d[selectedVar]))
        .attr("width", x6.bandwidth())
        .attr("height", d => height6 - y6(d[selectedVar]))
        .attr("fill", function(d) { return colour(d.agent); })

})

}

// Initialize plot
update('mean_score')