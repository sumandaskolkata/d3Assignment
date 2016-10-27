var data = [20,4,10,6,23,7,10,5,55,9];

const NUMBER_OF_DATA = 10

const WIDTH = 800;
const HEIGHT = 600;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);


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

var translate = function(x, y){
	return "translate("+x+","+y+")";
};

var _xScale = d3.scaleLinear()
  .domain([0,NUMBER_OF_DATA-1])
  .range([0,INNER_WIDTH]);

var _yScale = d3.scaleLinear()
  .domain([1,100])
  .range([INNER_HEIGHT,0]);

var _line = d3.line()
  .x(function(entry){return _xScale(entry['index'])})
  .y(function(entry){return _yScale(entry['value'])});



var generateChart = function(){
  var svg = d3.select('.container').append('svg')
  .attr("height",HEIGHT)
  .attr("width",WIDTH);
  var xAxis = d3.axisBottom(_xScale).ticks(10);
  var yAxis = d3.axisLeft(_yScale).ticks(10);

  svg.append('g')
    .attr('transform', translate(MARGIN,MARGIN))
    .call(yAxis)
    .attr("class","yAxis");

  svg.append('g')
    .attr('transform', translate(MARGIN,HEIGHT-MARGIN))
    .call(xAxis)
    .attr("class","xAxis");
    
  
  var g = svg.append('g')
    .attr('transform', translate(MARGIN,MARGIN))
    .classed("path",true);

  g.selectAll('rect').data(dataObjects)
    .enter().append('rect')
    .attr('fill','black')
    .attr('width',2)    
    .attr('x',function(entry){return _xScale(entry['index'])})
    .attr('y',function(entry){return _yScale(entry['value'])})    
    .attr('height',function(entry){return INNER_HEIGHT - _yScale(entry['value'])} );

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
    .attr('width',2);
  //update  
  rects.attr('fill','black')
    .attr('x',function(entry){return _xScale(entry['index'])})
    .attr('y',function(entry){return _yScale(entry['value'])})    
    .attr('height',function(entry){return INNER_HEIGHT - _yScale(entry['value'])} )
  //remove
  rects.exit().remove();
}

var callback = function(){
  generateNewDataObject();
  updateChart();
}

window.onload = generateChart;
