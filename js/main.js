/*
*    main.js for Patient profile
*/
/*
d3.select("svg")
    .append("text")
    .attr("x", 10)
    .attr("y", 10)
    .text("Hello");
*/

var margin = { left:200, right:10, top:50, bottom:100 };
var t = d3.transition().duration(750);
var gradesColour = d3.scaleOrdinal(d3.schemePastel1);
var tip = d3.tip()
    .attr('class', 'd3-tip').html(function(d){
        var text = "<strong>AE: </strong><span style='color: red'>"+ d.AEDECOD + "</span><br>";
        text += "<strong>AE start day </strong><span style='color: red'>"+ d.ASTDY + "</span><br>";
        text += "<strong>AE end day </strong><span style='color: red'>"+ d.AENDY + "</span><br>";
        return text;
    });


var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
   
var g = d3.select("#chart-area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
g.call(tip);

var aeType = $("#aeType-select").val();

//var data =  d3.json("data/df_ae.json");
var data = [{"AEDECOD":"NEUTROPENIA","ASTDT":"2014-03-17","AENDT":"2014-03-23","ASTDY":118,"AENDY":124,"AETOXGRN":1},
{"AEDECOD":"PERIPHERAL SENSORY NEUROPATHY","ASTDT":"2014-04-06","AENDT":"2014-04-22","ASTDY":138,"AENDY":154,"AETOXGRN":2},
{"AEDECOD":"ABDOMINAL PAIN","ASTDT":"2014-08-14","AENDT":"2014-08-15","ASTDY":3,"AENDY":4,"AETOXGRN":1},
{"AEDECOD":"ABDOMINAL PAIN","ASTDT":"2014-08-16","AENDT":"2014-08-21","ASTDY":5,"AENDY":10,"AETOXGRN":2},
{"AEDECOD":"INSOMNIA","ASTDT":"2014-09-07","AENDT":"2014-09-12","ASTDY":27,"AENDY":32,"AETOXGRN":1}] 

var data = data.filter(function(d){
    if (aeType == "all") {return true;}
    else {
        return d.grade > 1;
    }

})
//d3.json("data/df_ae.json").then(function(data){
// X Scale
var y = d3.scaleBand()
   .domain(data.map(d=> d.AEDECOD))
   .range([0, height])
   .padding(0.2);

 // Y Scale
 var x = d3.scaleLinear()
 .domain([1, d3.max(data, function(d) { return d.AENDY })])
 .range([0, width]);

//var bars =d3.select("svg")
var bars = g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr('x', d => x(d.ASTDY) )
    .attr('y',  d => y(d.AEDECOD) +12)
    .attr('width', 0 )
    .attr('height', 20)
    .attr('fill-opacity', 0)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .attr('fill', d=> gradesColour(d.AETOXGRN))
    .transition(t)
        .attr('width', d => x(d.AENDY - d.ASTDY + 1) )
        .attr("fill-opacity", 1)

// Y Axis
var yAxis = d3.axisLeft().scale(y);
g.append("g")
.call(yAxis);

// X Axis
var xAxis = d3.axisBottom().scale(x);
g.append("g")
.call(xAxis)
.attr("id", "xAxisG");

d3.selectAll("#xAxisG")
.attr("transform", "translate(0, 250)");

// Legend group to be displayed at bottom right
var grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4"]
var legend = g.append("g")
    .attr("transform", "translate(360,160)");
grades.forEach(function(grade, i){
    var legendRow = legend.append("g")
        .attr("transform", "translate(0, "+(i*20) + ")");
    legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", gradesColour(grade));
    legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .text(grade)
});



