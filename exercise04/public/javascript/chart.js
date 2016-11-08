var numbers = [1,2,3,4,5,6,7,8,9,10];
var tableTitles = ["Title","n","n square","log(n)","log(n) rounded"];
var squareScale = d3.scalePow()
        .exponent(2)
        .domain([1,10])
        .range([1,100]);

var logScale = d3.scaleLog()

var logRoundScale = d3.scaleLog()
        .rangeRound([0,1])

var createTable = function(){
    var table = d3.select('.chart').append('table');
    table.classed("numberTable",true);
    tableTitles.forEach(function(value){
        var tr = table.append("tr");
        tr.classed(value,true);
        var td = tr.append('td').text(value)
            .style("font-weight","bold");
    })
}

var selectNthChildOfTableAndAppendData = function(nth_child){
    var tr = d3.select("table tr:nth-child("+nth_child+")");
    var tds = tr.selectAll('td').data(numbers,function(d){return d;})
        .enter().append('td')
    return tds;
}

var addHeaders = function(){
    var tds = selectNthChildOfTableAndAppendData(1);
    tds.text(function(d){return d})
    .style("font-weight","bold");
}

var addValueOfN = function(){
    var tds = selectNthChildOfTableAndAppendData(2);
        
    tds.text(function(d){return d});
}

var addValueOfN_square = function(){
      var tds = selectNthChildOfTableAndAppendData(3);
    tds.text(function(d){return squareScale(d)});
}

var addValueOfLogN = function(){
    var tds = selectNthChildOfTableAndAppendData(4);
    tds.text(function(d){return logScale(d)});
}

var addValueOfLogRoundN = function(){
    var tds = selectNthChildOfTableAndAppendData(5);
        tds.text(function(d){return logRoundScale(d)});
}

var loadTable = function(){
    createTable();
    addHeaders();
    addValueOfN();
    addValueOfN_square();
    addValueOfLogN();
    addValueOfLogRoundN();
}

window.onload = loadTable;