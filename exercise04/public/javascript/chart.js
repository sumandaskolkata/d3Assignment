var numbers = [1,2,3,4,5,6,7,8,9,10];
var tableTitles = ["Title","n","n square","log(n)","log(n) rounded"];

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

var selectNthChildOfTableAndAppendData = function(nth_child,scale){
    var tr = d3.select("table tr:nth-child("+nth_child+")");
    var tds = tr.selectAll('td').data(numbers,function(d){return d;})
        .enter().append('td')
    tds.text(function(d){return scale(d)});
}
    
var loadTable = function(){
    createTable();
    selectNthChildOfTableAndAppendData(1,d3.scaleLinear().domain([1,10]).range([1,10]));
    selectNthChildOfTableAndAppendData(2,d3.scaleLinear().domain([1,10]).range([1,10]));
    selectNthChildOfTableAndAppendData(3,d3.scalePow().domain([1,10]).range([1,100]));
    selectNthChildOfTableAndAppendData(4,d3.scaleLog());
    selectNthChildOfTableAndAppendData(5,d3.scaleLog().rangeRound([0,1]));
}

window.onload = loadTable;