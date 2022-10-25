var margin = {top: 50, right: 10, bottom: 120, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#overview_chart")
  .append("svg")
    .attr("width", 1250) /*width + margin.left + margin.right)*/
    .attr("height", 600)/*height + margin.top + margin.bottom)*/
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
const fetchText=async (url)=> {
        const response=await fetch(url);
        return await response.text()
}

;
const csvUrl='https://raw.githubusercontent.com/lloydy8/lloydy8.github.io/main/datasets/overview.csv'


fetchText(csvUrl).then(text=> {
                const data=d3.csvParse(text);

// X axis

var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.timestep; }))
  .padding(0.2);
svg.append("g")
 .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
 


// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 1600])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));


// Bars
svg.selectAll("bar")
  .data(data)
  .enter().append("rect")
  .attr("class","bar")
  .attr("x", function(d) { return x(d.timestep); })
  .attr("y", function(d) { return y(d.eplength); })
  .attr("width", x.bandwidth())
  .attr("height", function(d) { return height - y(d.eplength); })
  .attr("fill", "#69b3a2")
  .on('mouseover' , function(){
    d3.select("#tooltip").style("opacity", 1)
})
.on('mousemove' , function(d , i){
    d3.select("#tooltip").style("opacity", 1)
    .html("Timestep: " + i.timestep +  "<br/>" + "Episode Length: " + i.eplength+  "<br/>" + "Score: " + i.mean )
    .style("left", (d.pageX + 350) + "px")
    .style("top", (d.pageY  + 400) + "px");
})
.on('mouseout' , function(){
    d3.select("#tooltip").style("opacity", 0)
});



var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.mean; })])
      .domain([0,1000])
      .range([ height, 0 ]);
svg.append("g")				
        .attr("class", "y axis")	
        .attr("transform", "translate(" + width + " ,0)")		
        .call(d3.axisRight(y));



var line = d3.line()
        .x(function(d) { return x(d.timestep) + 5.5 })
        .y(function(d) { return y(d.mean) })


    // Add the line
svg.append("path")
       .datum(data)
       .attr("fill", "none")
       .attr("stroke", "steelblue")
       .attr("stroke-width", 4)
       .attr("d", line);


svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.timestep) +5.5 } )
        .attr("cy", function (d) { return y(d.mean)})
        .attr("r", 5)
        .style("fill", "black");


//labels

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width-600)
    .attr("y", height+65)
    .text("Timesteps")
    .style("font-size","1.5rem");
    
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("dy", "-4.8rem")
    .attr("x", -170)
    .attr("transform", "rotate(-90)")
    .text("Episode Length")
    .style("font-size","1.5rem");

svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", 'start')
    .attr("dy", "-117.5rem")
    .attr("x", 200)
    .attr("transform", "rotate(-270)")
    .text("Score")
    .style("font-size","1.5rem");


//Circles    

svg.append("circle")
      .attr("cx", 853.5)
      .attr("cy", 150)
      .attr("r", 7)
      .style("fill","green");

svg.append("circle")
      .attr("cx", 952.5)
      .attr("cy", 240)
      .attr("r", 7)
      .style("fill","goldenrod");

svg.append("circle")
      .attr("cx", 600)
      .attr("cy", 176)
      .attr("r", 7)
      .style("fill","rgb(25, 193, 190)");


//Legend    

svg.append("circle")
      .attr("cx", 60)
      .attr("cy", 5)
      .attr("r", 6);
svg.append("text")
      .attr("x", 78)
      .attr("y", 7)
      .text("Mean Score of 10 Simulations")
      .attr("alignment-baseline","middle")
      .style("font-size", "15px");

svg.append("rect")
      .attr("x", 54)
      .attr("y", 30)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", "#69b3a2")
      .style("opacity", "0.8");
svg.append("text")
      .attr("x", 78)
      .attr("y", 37)
      .text("Mean Length of 10 Simulations")
      .attr("alignment-baseline","middle")
      .style("font-size", "15px");

svg.append("circle")
      .attr("cx", 60)
      .attr("cy", 65)
      .attr("r", 6)
      .style("fill","rgb(25, 193, 190)");
svg.append("text")
      .attr("x", 78)
      .attr("y", 66)
      .text("Agent of Interest @ 2,150,000")
      .attr("alignment-baseline","middle")
      .style("font-size", "15px");

svg.append("circle")
      .attr("cx", 60)
      .attr("cy", 90)
      .attr("r", 6)
      .style("fill","green");
svg.append("text")
      .attr("x", 78)
      .attr("y", 92)
      .text("Agent of Interest @ 3,050,000")
      .attr("alignment-baseline","middle")
      .style("font-size", "15px");

svg.append("circle")
      .attr("cx", 60)
      .attr("cy", 115)
      .attr("r", 6)
      .style("fill","goldenrod");
svg.append("text")
      .attr("x", 78)
      .attr("y", 118)
      .text("Agent of Interest @ 3,400,000")
      .attr("alignment-baseline","middle")
      .style("font-size", "15px");


});
