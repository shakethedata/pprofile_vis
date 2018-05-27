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

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
   
var g = d3.select("#chart-area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

//var data =  d3.json("data/df_ae.json");
var data = [{"AEDECOD":"NEUTROPENIA","ASTDT":"2014-03-17","AENDT":"2014-03-23","ASTDY":118,"AENDY":124},
{"AEDECOD":"PERIPHERAL SENSORY NEUROPATHY","ASTDT":"2014-04-06","AENDT":"2014-04-22","ASTDY":138,"AENDY":154},
{"AEDECOD":"ABDOMINAL PAIN","ASTDT":"2014-08-14","AENDT":"2014-08-15","ASTDY":3,"AENDY":4},
{"AEDECOD":"ABDOMINAL PAIN","ASTDT":"2014-08-16","AENDT":"2014-08-21","ASTDY":5,"AENDY":10},
{"AEDECOD":"INSOMNIA","ASTDT":"2014-09-07","AENDT":"2014-09-12","ASTDY":27,"AENDY":32}] 

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
    .attr('width', d => x(d.AENDY) )
    .attr('height', 20)
    .attr('y', function(d, i) { return 40 + (i * 50) })
   // .attr('y', function(d, i) { return d => y(d.AEDECOD) })
    .attr('fill', 'steelblue');

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



/*
d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis)
d3.selectAll("#yAxisG").attr("transform", "translate(200,220)")

var yAxisCall = d3.axisLeft(y)
.tickFormat(function(d){ return "$" + d; });
g.append("g")
.attr("class", "y axis")
.call(yAxisCall);
*/

/*
var xAxis = d3.axisLeft().scale(y);
d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis)
d3.selectAll("#xAxisG")
.attr("transform", "translate(200, 0)");
*/
  //  attr("transform", "translate(", + margin.left, + height +")")


/*
var xAxisCall = d3.axisBottom(x);
g.append("g")
 .attr("class", "x axis")
 .attr("transform", "translate(0," + height +")")
 .call(xAxisCall);

 /*
d3.select("svg")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("text")
    .attr("x", function(d,i) {return 0} )
    .attr("y", function(d,i) {return 20 + (i *15);} )
    .text(function(d) {return(d.AEDECOD)});
*/




/*
// X Axis
var xAxisCall = d3.axisBottom(x);
g.append("g")
 .attr("class", "x axis")
 .attr("transform", "translate(0," + height +")")
 .call(xAxisCall);
  //});
    /*
var g = d3.select("#svg")
    .append("g")
    .attr("transform", "translate(" + 20 + ", " + 20 + ")");


d3.select("g")
    .append("text")
    .attr("y",  50)
    .attr("x", 25)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");

    /*
// Y Label
g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");

/*
var text = svg.append("p")
    .attr("x", 40)
    .attr("y", 10)
    .attr("text", "hello")
*/

/*
svg.enter()
.append("p")
.attr("x", 40)
.attr("y", 10)
.attr("text", "hello")
*/


/*
    var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


d3.select("#svg")
    .append("text")
    .attr("x", 10)
    .attr("y", 10)
    .attr("text", "hello")
*/

/*
d3.json("data/df_ae.json").then(function(data){

    data.forEach(function(d) {
        console.log(d)
    });

   


});
*/

/*
var x = d3.scaleTime()
.domain([new Date(2014,03,17), new Date(2014-09-12)
.range([0,400])])

var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);

var circles = svg.selectAll("circle")
    .data(data)

svg.enter()
.append("text")
.attr(x, 10)
.attr(y, 10)
*/




/*
var bars = svg.selectAll("rect")
    .data(data)

bars.enter()
    .append("circle")
        .attr("cx", function (d,i){
            console.log("Item: " + d, "Index: " + i);
            return (i*50) + 25;
        })
	.attr("cy", 250)
	.attr("r", function(d){
        console.log("item: " + d);
        return 25;
    })
    .attr("fill", "blue");
    */
    