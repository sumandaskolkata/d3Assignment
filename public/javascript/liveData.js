var _data = [20,4,10,6,23,7,10,5,55,9];

const NUMBER_OF_DATA = 10

const WIDTH = 900;
const HEIGHT = 600;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

var translate = function(x, y){
	return "translate("+x+","+y+")";
};

var _xScale = d3.scaleLinear()
  .domain([0,_data.length-1])
  .range([0,INNER_WIDTH]);

var _yScale = d3.scaleLinear()
  .domain([1,100])
  .range([INNER_HEIGHT,0]);

var _line = d3.line()
  .x(function(entry,index){return _xScale(index)})
  .y(function(entry){return _yScale(entry)});



var generateChart = function(){

  //adding svg
  var svg = d3.select('.container').append('svg')
  .attr("height",HEIGHT)
  .attr("width",WIDTH-MARGIN)

  var xAxis = d3.axisBottom(_xScale).ticks(10);
  var yAxis = d3.axisLeft(_yScale).ticks(10);
  //adding yAxis
  svg.append('g')
    .attr('transform', translate(MARGIN,MARGIN))
    .call(yAxis)
  //adding xAxis
  svg.append('g')
    .attr('transform', translate(MARGIN,HEIGHT-MARGIN))
    .call(xAxis)
    
  var g = svg.append('g')
    .attr('transform', translate(MARGIN,MARGIN))
    .classed("line_chart",true);
  
  //creating bars
  // g.selectAll('rect').data(data)
  //   .enter().append('rect')
  //   .attr('fill','skyblue')
  //   .attr('width',7)    
  //   .attr('x',function(entry,index){return _xScale(index)})
  //   .attr('y',function(entry){return _yScale(entry)})    
  //   .attr('height',function(entry){return INNER_HEIGHT - _yScale(entry)} );

  //creating path  
  g.append('path')
    .classed("line",true)
    .datum(_data)
    .attr('d',_line);

    setInterval(update,850);
}

var updateChart = function(){
  _data.push(_.random(1,100));

  d3.select('svg .line_chart')
  .select('path').datum(_data)
    .attr('d',_line)
    .attr('transform',null)
    .transition()
    .duration(800)
    .ease(d3.easeLinear)
    .attr('transform',translate(_xScale(-1),0));

  _data.shift();

  // //data binding
  // var rects = g.selectAll('rect').data(data);
  // //enter
  // rects.enter().append('rect')
  //   .attr('width',7);
  // //update  
  // rects.attr('fill','skyblue')
  //   .attr('x',function(entry,index){return _xScale(index)})
  //   .attr('y',function(entry){return _yScale(entry)})    
  //   .attr('height',function(entry){return INNER_HEIGHT - _yScale(entry)} )
  // //remove
  // rects.exit().remove();
}

var update = function(){
  updateChart();
}

window.onload = generateChart;
