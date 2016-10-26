var data = [20,4,10,6,23,7,10,5,55,9];

const WIDTH = 1000;
const HEIGHT = 600;
const MARGIN = 20;
const INNER_WIDTH = WIDTH - MARGIN;
const INNER_HEIGHT = HEIGHT - MARGIN;


var createDataObject = function(data){
  return _.map(data ,function(entry,index){
    return {'index':index,'value':entry};
  })
}

var dataObjects = createDataObject(data);

var generateNewDataObject = function(){
  var newData = _.random(1,100);
  data.push(newData);
  data.shift();
  dataObjects = createDataObject(data);
}


var _xScale = d3.scaleLinear()
  .domain([1,10])
  .range([MARGIN,INNER_WIDTH]);

var _yScale = d3.scaleLinear()
  .domain([1,100])
  .range([INNER_HEIGHT,MARGIN]);

var _line = d3.line()
  .x(function(entry){return _xScale(entry['index'])})
  .y(function(entry){return _yScale(entry['value'])});
var translate = function(x, y){
	return "translate("+x+","+y+")";
};


var generateChart = function(){
  var svg = d3.select('.container').append('svg')
  .attr("height",HEIGHT)
  .attr("width",WIDTH);
  var xAxis = d3.axisBottom(_xScale).ticks(10);
  var yAxis = d3.axisLeft(_yScale).ticks(10);

  svg.append('g')
    .attr('transform', 'translate(20,0)')
    .call(yAxis)
    .attr("class","yAxis");

  svg.append('g')
    .attr('transform', 'translate(0,580)')
    .call(xAxis)
    .attr("class","xAxis");
    
  
  var g = svg.append('g')
    .attr('transform', 'translate(106,0)')
    .classed("path",true);

  g.selectAll('rect').data(dataObjects)
    .enter().append('rect')
    .attr('fill','red')
    .attr('width',2)    
    .attr('x',function(entry){return _xScale(entry['index'])})
    .attr('y',function(entry){return _yScale(entry['value'])})    
    .attr('height',function(entry){return 580 - _yScale(entry['value'])} );

  g.append('path')
    .classed("line",true)
    .attr('d',_line(dataObjects));

    setInterval(callback,250);
}

var updateChart = function(){
  var g = d3.selectAll('svg .path');
  //data binding
  var path = g.selectAll('path').data(dataObjects);

  //enter
  path.enter().append();

  //update
  path.classed("line",true)
    .attr('d',_line(dataObjects));

  //remove  
  path.exit().remove();


  //data binding
  var rects = g.selectAll('rect').data(dataObjects);
  //enter
  rects.enter().append('rect')
    .attr('width',1);
  //update  
  rects.attr('fill','red')
    .attr('x',function(entry){return _xScale(entry['index'])})
    .attr('y',function(entry){return _yScale(entry['value'])})    
    .attr('height',function(entry){return 580 - _yScale(entry['value'])} )
  //remove
  rects.exit().remove();
}

var callback = function(){
  generateNewDataObject();
  updateChart();
}

window.onload = generateChart;
