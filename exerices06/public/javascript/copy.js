
const HEIGHT = 100;
const WIDTH  = 100; 
const MARGIN = 50;
const MARGIN_TOP = 20;




var line = function(group , index,xScale){
    var x1 = xScale(index);
    var x2 = x1+WIDTH;
    group.append("line")
        .attr("x1",x1)
        .attr("y1",HEIGHT+MARGIN_TOP)
        .attr("x2",x2)
        .attr("y2",MARGIN_TOP)
        .classed("line",true);
}

var circle = function(group,index,xScale){
    var cx = xScale(index)+(WIDTH/2);
    var cy = HEIGHT/2+MARGIN_TOP;
    var radius = HEIGHT/2;
    group.append("circle")
        .attr("cx",cx)
        .attr("cy",cy)
        .attr("r",radius)
        .classed("circle",true); 
}

var rectangle = function(group,index,xScale){
    var x = xScale(index);

    group.append("rect")
        .attr("x",x)
        .attr("y",MARGIN_TOP)
        .attr("height",HEIGHT)
        .attr("width",WIDTH)
        .classed("rect",true);
}
var triangle = function(group,index,xScale){
    var x1 = xScale(index);
    var x2 = x1 + WIDTH/2;
    var x3 = x1 + WIDTH;
    group.append("polygon")
        .attr("points",x1+","+(HEIGHT+MARGIN_TOP)+","+x2+","+MARGIN_TOP+","+x3+","+(HEIGHT+MARGIN_TOP))
        .classed("triangle",true);
}

var shapes = [line,circle,rectangle,triangle]
var loadShapes = function(){
    var svg = d3.select(".container").append("svg")
        .attr("height","500px")
        .attr("width","900px");
    var g = svg.append("g");
    var totalWidthWithMargin = WIDTH + MARGIN;
    var xScale = d3.scaleLinear()                   
    .domain([0,shapes.length])
    .range([MARGIN,shapes.length * totalWidthWithMargin+MARGIN]);
    shapes.forEach(function(shape,index){
        shape(g,index,xScale);
    })
}



window.onload = loadShapes;

