var numbers = [0,1,2,3,4,5,6,7,8,9,10];


var fontScale = d3.scaleLinear().domain([0,10]).range([12,120])
var loadNumbers = function(){
    d3.select(".container").selectAll("div")
        .data(numbers).enter()
        .append("div")
        .text(function(d){return d; })
        .classed("number",true)
        .style("font-size",function(d){return fontScale(d)+"px";})
}

window.onload = loadNumbers;