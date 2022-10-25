const margin5 = {top: 30, right: 15, bottom: 55, left: 70},
    width5 = 450 - margin5.left - margin5.right,
    height5 = 400 - margin5.top - margin5.bottom;

// append the svg object to the body of the page
var svg5 = d3.select("#scores3")
  .append("svg")
    .attr("width", 1250) /*width + margin.left + margin.right)*/
    .attr("height", 600)/*height + margin.top + margin.bottom)*/
  .append("g")
    .attr("transform",
          "translate(" + margin5.left + "," + margin5.top + ")");

// Parse the Data
const fetch5Text=async (url)=> {
        const response=await fetch(url);
        return await response.text()
}

;
const csv5Url="https://raw.githubusercontent.com/lloydy8/SpaceInvaders/main/barline.csv"


fetch4Text(csv5Url).then(text=> {
                const data=d3.csvParse(text);

// X axis


var x5 = d3.scaleBand()
  .range([ 0, width5 ])
  .padding(0.2);
var x5Axis = svg5.append("g")
  .attr("transform", `translate(0,${height5})`);

x5.domain(data.map(d => d.episode));
x5Axis.call(d3.axisBottom(x5));

 
// Add Y axis
var y5 = d3.scaleLinear()
  .domain([0, 1600])
  .range([ height5, 0]);
svg5.append("g")
  .call(d3.axisLeft(y5));


// Bars
svg5.selectAll("bar")
  .data(data)
  .enter().append("rect")
  .attr("class","bar")
  .attr("x", function(d) { return x5(d.episode); })
  .attr("y", function(d) { return y5(d.score3); })
  .attr("width", x5.bandwidth())
  .attr("height", function(d) { return height5 - y5(d.score3); })
  .attr("fill", "#e7cb94")
  .on("click" , function(d,i){
    d3.select('#episode3').attr('src' , '3episode'+i.episode+'.gif')
    d3.select(this).attr("fill", "#e7cb94");
  })
  .on('mouseover' , function(){
    d3.select("#tooltip").style("opacity", 1)
})
.on('mousemove' , function(d , i){
    d3.select("#tooltip").style("opacity", 1)
    .html("Episode: " + i.episode +  "<br/>" + "Score: " + i.score3+  "<br/>" + "Reward: " + i.rewards3 + "<br/>" + "Length: " + i.length3)
    .style("left", (d.pageX + 180) + "px")
    .style("top", (d.pageY + 1100) + "px");
})
.on('mouseout' , function(){
    d3.select("#tooltip").style("opacity", 0)
})


var yR5 = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.rewards3; })])
      .domain([0,100])
      .range([ height5, 0 ]);


svg5.append("g")				
        .attr("class", "y axis")	
        .attr("transform", "translate(" + width5 + " ,0)")		
        .call(d3.axisRight(yR5));



var line5 = d3.line()
        .x(function(d) { return x5(d.episode) + 17 })
        .y(function(d) { return yR5(d.rewards3) })


    // Add the line
svg5.append("path")
       .datum(data)
       .attr("fill", "none")
       .attr("stroke", "goldenrod")
       .attr("stroke-width", 4)
       .attr("d", line5);
       //.attr("height", function(d) { return height - yR(d.rewards1); });


svg5.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("id", "circleBasicTooltip")
        .attr("cx", function (d) { return x5(d.episode) + 17 } )
        .attr("cy", function (d) { return yR5(d.rewards3)})
        .attr("r", 5)
        .style("fill", "black");


svg5.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", 180)
    .attr("y", 350)
    .text("Episodes")
    .style("font-size","1.2rem");
    

svg5.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("dy", "-45")
    .attr("x", -140)
    .attr("transform", "rotate(-90)")
    .text("Score")
    .style("font-size","1.2rem");

svg5.append("text")
    .attr("class", "y label")
    .attr("text-anchor", 'start')
    .attr("dy", "-41rem")
    .attr("x", 135)
    .attr("transform", "rotate(-270)")
    .text("Reward")
    .style("font-size","1.2rem");

svg5.append("circle")
      .attr("cx", -30)
      .attr("cy", 390)
      .attr("r", 5);
svg5.append("text")
      .attr("x", -15)
      .attr("y", 392)
      .text("Total Episode Reward")
      .attr("alignment-baseline","middle")
      .style("font-size", "15px")

svg5.append("rect")
      .attr("x", -35)
      .attr("y", 420)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", "#e7cb94")
      .style("opacity", "0.8");
svg5.append("text")
      .attr("x", -15)
      .attr("y", 425)
      .text("Total Episode Score")
      .attr("alignment-baseline","middle")
      .style("font-size", "15px");

})
