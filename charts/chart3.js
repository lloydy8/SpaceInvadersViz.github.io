const margin3 = {top: 30, right: 15, bottom: 55, left: 70},
    width3 = 450 - margin3.left - margin3.right,
    height3 = 400 - margin3.top - margin3.bottom;

// append the svg object to the body of the page
const svg3 = d3.select("#scores1")
  .append("svg")
    .attr("width", 1250) /*width + margin.left + margin.right)*/
    .attr("height", 600)/*height + margin.top + margin.bottom)*/
  .append("g")
    .attr("transform",
          "translate(" + margin3.left + "," + margin3.top + ")");

// Parse the Data
const fetch3Text=async (url)=> {
        const response=await fetch(url);
        return await response.text()
}

;
const csv3Url="https://raw.githubusercontent.com/lloydy8/SpaceInvaders/main/barline.csv"


fetch3Text(csv3Url).then(text=> {
                const data=d3.csvParse(text);

// Add X axis
var x3 = d3.scaleBand()
  .range([ 0, width3 ])
  .padding(0.2);
var x3Axis = svg3.append("g")
  .attr("transform", `translate(0,${height3})`);

x3.domain(data.map(d => d.episode));
x3Axis.call(d3.axisBottom(x3));

 
// Add Y axis
var y3 = d3.scaleLinear()
  .domain([0, 1600])
  .range([ height3, 0]);
svg3.append("g")
  .call(d3.axisLeft(y3));


// Bars
svg3.selectAll("bar")
  .data(data)
  .enter().append("rect")
  .attr("class","bar")
  .attr("x", function(d) { return x3(d.episode); })
  .attr("y", function(d) { return y3(d.score1); })
  .attr("width", x3.bandwidth())
  .attr("height", function(d) { return height3 - y3(d.score1); })
  .attr("fill", "rgb(163, 213, 191)")
  .on("click" , function(d,i){
    d3.select('#episode1').attr('src' , '1episode'+i.episode+'.gif')
  })
  .on('mouseover' , function(){
    d3.select("#tooltip").style("opacity", 1)
})
.on('mousemove' , function(d , i){
    d3.select("#tooltip").style("opacity", 1)
    .html("Episode: " + i.episode +  "<br/>" + "Score: " + i.score1+  "<br/>" + "Reward: " + i.rewards1 + "<br/>" + "Length: " + i.length1)
    .style("left", (d.pageX + 180) + "px")
    .style("top", (d.pageY + 800) + "px");
})
.on('mouseout' , function(){
    d3.select("#tooltip").style("opacity", 0)
})


var yR3 = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.rewards1; })])
      .domain([0,100])
      .range([ height3, 0 ]);


svg3.append("g")				
        .attr("class", "y axis")	
        .attr("transform", "translate(" + width3 + " ,0)")		
        .call(d3.axisRight(yR3));



var line3 = d3.line()
        .x(function(d) { return x3(d.episode) + 17 })
        .y(function(d) { return yR3(d.rewards1) })


    // Add the line
svg3.append("path")
       .datum(data)
       .attr("fill", "none")
       .attr("stroke", "rgb(19, 179, 110)")
       .attr("stroke-width", 4)
       .attr("d", line3);

svg3.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x3(d.episode) + 17 } )
        .attr("cy", function (d) { return yR3(d.rewards1)})
        .attr("r", 5)
        .style("fill", "black");


svg3.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", 180)
    .attr("y", 350)
    .text("Episodes")
    .style("font-size","1.2rem");
    

svg3.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("dy", "-45")
    .attr("x", -140)
    .attr("transform", "rotate(-90)")
    .text("Score")
    .style("font-size","1.2rem");

svg3.append("text")
    .attr("class", "y label")
    .attr("text-anchor", 'start')
    .attr("dy", "-41rem")
    .attr("x", 135)
    .attr("transform", "rotate(-270)")
    .text("Reward")
    .style("font-size","1.2rem");


svg3.append("circle")
      .attr("cx", -30)
      .attr("cy", 390)
      .attr("r", 5);
svg3.append("text")
      .attr("x", -15)
      .attr("y", 392)
      .text("Total Episode Reward")
      .attr("alignment-baseline","middle")
      .style("font-size", "15px")

svg3.append("rect")
      .attr("x", -35)
      .attr("y", 420)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", "rgb(163, 213, 191)")
      .style("opacity", "0.8");
svg3.append("text")
      .attr("x", -15)
      .attr("y", 425)
      .text("Total Episode Score")
      .attr("alignment-baseline","middle")
      .style("font-size", "15px");

})
