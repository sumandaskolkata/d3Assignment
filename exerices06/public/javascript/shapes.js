var loadShapes = function(){
    d3.select("body").append("path")
        .attr("d",d3.symbol().type(d3.symbolCircle))
}
window.onload = loadShapes;