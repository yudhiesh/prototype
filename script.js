var vis = d3.select("#chart").append("g")
var pi = Math.PI;

var line = d3.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; });

var lines = []



var breakPoints = 100;
var angleArr = [];
var arcArr = [];

//angleArr[0] = -pi/2; 

var colorScale = d3.scaleLinear()
    .domain([-pi/2, -pi/3,30*pi/180,pi/2])
    .range(['lightgreen', 'lightgreen', 'yellow','red']);
    
	
var angleScale = d3.scaleLinear()
    .range([-pi/2,pi/2])
    .domain([0,breakPoints - 1]);	
	

var prevAngle = -pi/2;	
for(var i = 0; i < breakPoints; i++) {
	angleArr[i] = angleScale(i);
	var singleArrow = [{"x":(150*Math.sin(angleArr[i])), "y":-(150*Math.cos(angleArr[i]))},{ "y":-(170*Math.cos(angleArr[i])), "x":(170*Math.sin(angleArr[i]))}];
	//var subArc = {"start": prev, "end":0};
	var subArc = {};
	lines.push(singleArrow);
	subArc["start"] = prevAngle;
	subArc["end"] = angleArr[i];
	prevAngle = angleArr[i];
	arcArr.push(subArc);
}

	
var arc = d3.arc()
    .innerRadius(160)
    .outerRadius(170)
    .startAngle(-(pi/2)) //converting from degs to radians
    .endAngle(pi/2) //just radians
    
vis.attr("width", "400").attr("height", "400") // Added height and width so arc is visible
    .append("g")
    .attr("transform", "translate(200,200)");

vis.selectAll("line")
   .data(lines)
   .enter()
   .append("path").attr("class","arrow").attr("d", line).attr("stroke",function(d,i) { 
	return colorScale(angleArr[i])}).attr("transform", "translate(200,200)");	

vis.selectAll("arcs")
   .data(arcArr)
   .enter()
   .append("path").attr("class","arc").attr("d", function(d,i) {
   return d3.arc()
    .innerRadius(160)
    .outerRadius(170)
    .startAngle(d.end)
    .endAngle(d.start)()}).attr("fill",function(d,i) { 
	return colorScale(angleArr[i])}).attr("transform", "translate(200,200)");	
	  
  </script>