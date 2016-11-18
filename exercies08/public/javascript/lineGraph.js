var points = [{x:0,y:5},{x:1,y:9},{x:2,y:7},{x:3,y:5},{x:4,y:3},{x:6,y:4},{x:7,y:2},{x:8,y:3},{x:9,y:2}];

var loadAxis = function(svg,xScale,yScale){
    var xAxis = d3.axisBottom(xScale).ticks(10);
	var yAxis = d3.axisLeft(yScale).ticks(10);
	svg.append('g')
		.attr('transform', 'translate(0,430)')
		.call(xAxis);
	svg.append('g')
		.attr('transform', 'translate(30,0)')
		.call(yAxis);
}

var loadSineGraph = function(svg,xScale,yScale){
    var sinValue  = new Array(10);
    var sinLine = d3.line()
        .x(function(d,i){return xScale(i/10); })
        .y(function(d,i){return yScale((Math.sin(i)/10)+0.5) });

    svg.append("path").datum(sinValue)
        .classed("sinGraph",true)
        .attr("d",sinLine);
}

var loadLineGraph = function(svg,xScale,yScale){
    var line = d3.line()
    .x(function(d){return xScale(d.x/10); })
    .y(function(d){return yScale(d.y/10); });

     svg.append("path").datum(points)
        .classed("line",true)
        .attr("d",line);
}

var createLineDataPoints = function(svg,xScale,yScale){
    var paths = svg.append("g").selectAll("path").data(points).enter().append("path");
    paths
        .classed("data_points",true)
        .attr("d",d3.symbol().size(100).type(d3.symbolCircle))
        .attr("transform",function(d){
            return "translate("+xScale(d.x/10)+","+yScale(d.y/10)+")"
        })
}

var createSinDataPoints = function(svg,xScale,yScale){
    var paths = svg.append("g").selectAll("path").data(sinValue).enter().append("path");
    paths
        .classed("data_points",true)
        .attr("d",d3.symbol().size(100).type(d3.symbolCircle))
        .attr("transform",function(d,i){
            return "translate("+xScale(i/10)+","+yScale((Math.sin(i)/10)+.5)+")"
        })
}
var loadGraph = function(){
    var xScale = d3.scaleLinear().domain([0,1]).range([30,430]);
    var yScale = d3.scaleLinear().domain([0,1]).range([430,30]);
    var svg = d3.select("body").append("svg")
        .attr("height","500")
        .attr("width","500");
    loadAxis(svg,xScale,yScale);
    loadSineGraph(svg,xScale,yScale);
    loadLineGraph(svg,xScale,yScale);
    createLineDataPoints(svg,xScale,yScale);
    createSinDataPoints(svg,xScale,yScale);
}

window.onload = loadGraph;