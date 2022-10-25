const margin4 = {top: 30, right: 15, bottom: 55, left: 70},
    width4 = 450 - margin4.left - margin4.right,
    height4 = 400 - margin4.top - margin4.bottom;

// append the svg object to the body of the page
var svg4 = d3.select("#scores2")
  .append("svg")
    .attr("width", 1250) /*width + margin.left + margin.right)*/
    .attr("height", 600)/*height + margin.top + margin.bottom)*/
  .append("g")
    .attr("transform",
          "translate(" + margin4.left + "," + margin4.top + ")");

// Parse the Data
const fetch4Text=async (url)=> {
        const response=await fetch(url);
        return await response.text()
}

;
const csv4Url="https://raw.githubusercontent.com/lloydy8/SpaceInvaders/main/barline.csv"


fetch4Text(csv4Url).then(text=> {
                const data=d3.csvParse(text);

// X axis


var x4 = d3.scaleBand()
  .range([ 0, width4 ])
  .padding(0.2);
var x4Axis = svg4.append("g")
  .attr("transform", `translate(0,${height4})`);

x4.domain(data.map(d => d.episode));
x4Axis.call(d3.axisBottom(x4));

 
// Add Y axis
var y4 = d3.scaleLinear()
  .domain([0, 1600])
  .range([ height4, 0]);
svg4.append("g")
  .call(d3.axisLeft(y4));


// Bars
svg4.selectAll("bar")
  .data(data)
  .enter().append("rect")
  .attr("class","bar")
  .attr("x", function(d) { return x4(d.episode); })
  .attr("y", function(d) { return y4(d.score2); })
  .attr("width", x4.bandwidth())
  .attr("height", function(d) { return height4 - y4(d.score2); })
  .attr("fill", "#98DF8AFF")
  .on("click" , function(d,i){
    d3.select('#episode2').attr('src' , '2episode'+i.episode+'.gif')
    d3.select(this).attr("fill", "#98DF8AFF");
  })
  .on('mouseover' , function(){
    d3.select("#tooltip").style("opacity", 1)
})
.on('mousemove' , function(d , i){
    d3.select("#tooltip").style("opacity", 1)
    .html("Episode: " + i.episode +  "<br/>" + "Score: " + i.score2+  "<br/>" + "Reward: " + i.rewards2 + "<br/>" + "Length: " + i.length2)
    .style("left", (d.pageX + 10) + "px")
    .style("top", (d.pageY - 15) + "px");
})
.on('mouseout' , function(){
    d3.select("#tooltip").style("opacity", 0)
})


var yR4 = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.rewards2; })])
      .domain([0,100])
      .range([ height4, 0 ]);


svg4.append("g")				
        .attr("class", "y axis")	
        .attr("transform", "translate(" + width4 + " ,0)")		
        .call(d3.axisRight(yR4));



var line4 = d3.line()
        .x(function(d) { return x4(d.episode) + 17 })
        .y(function(d) { return yR4(d.rewards2) })


    // Add the line
svg4.append("path")
       .datum(data)
       .attr("fill", "none")
       .attr("stroke", "green")
       .attr("stroke-width", 4)
       .attr("d", line4);
       //.attr("height", function(d) { return height - yR(d.rewards1); });


svg4.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", function (d) { return x4(d.episode) + 17 } )
        .attr("cy", function (d) { return yR4(d.rewards2)})
        .attr("r", 5)
        .style("fill", "black");


svg4.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", 180)
    .attr("y", 350)
    .text("Episodes")
    .style("font-size","1.2rem");
    

svg4.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("dy", "-45")
    .attr("x", -140)
    .attr("transform", "rotate(-90)")
    .text("Score")
    .style("font-size","1.2rem");

svg4.append("text")
    .attr("class", "y label")
    .attr("text-anchor", 'start')
    .attr("dy", "-41rem")
    .attr("x", 135)
    .attr("transform", "rotate(-270)")
    .text("Reward")
    .style("font-size","1.2rem");

svg4.append("circle")
      .attr("cx", -30)
      .attr("cy", 390)
      .attr("r", 5);
svg4.append("text")
      .attr("x", -15)
      .attr("y", 392)
      .text("Total Episode Reward")
      .attr("alignment-baseline","middle")
      .style("font-size", "15px")

svg4.append("rect")
      .attr("x", -35)
      .attr("y", 420)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", "#98DF8AFF")
      .style("opacity", "0.8");
svg4.append("text")
      .attr("x", -15)
      .attr("y", 425)
      .text("Total Episode Score")
      .attr("alignment-baseline","middle")
      .style("font-size", "15px");


})