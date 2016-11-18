var points = [{x:0,y:5},{x:1,y:9},{x:2,y:7},{x:3,y:5},{x:4,y:3},{x:6,y:4},{x:7,y:2},{x:8,y:3},{x:9,y:2}];

var xScale = d3.scaleLinear().domain([0,1]).range([30,430]);

var yScale = d3.scaleLinear().domain([0,1]).range([430,30]);

var line = d3.line()
    .x(function(d){return xScale(d.x/10); })
    .y(function(d){return yScale(d.y/10); });


var sinLine = d3.line()
    .x(function(d){return xScale(d.x/10); })
    .y(function(d){return yScale((Math.sin(d.x)/10)+0.5) });

var loadAxis = function(svg){
    var xAxis = d3.axisBottom(xScale).ticks(10);
	var yAxis = d3.axisLeft(yScale).ticks(10);

	svg.append('g')
		.attr('transform', 'translate(0,430)')
		.call(xAxis);

	svg.append('g')
		.attr('transform', 'translate(30,0)')
		.call(yAxis);
}

var loadSineGraph = function(svg){
    svg.append("path").datum(points)
        .classed("sinGraph",true)
        .attr("d",sinLine);
}
var loadLineGraph = function(svg){
     svg.append("path").datum(points)
        .classed("line",true)
        .attr("d",line);
}
var loadGraph = function(){
    var svg = d3.select("body").append("svg")
        .attr("height","500")
        .attr("width","500");
    loadAxis(svg);
    loadSineGraph(svg);
    loadLineGraph(svg);
}


window.onload = loadGraph;