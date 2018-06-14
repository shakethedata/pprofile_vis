/*
*    main.js for Patient profile
*/



// Add jQuery UI slider - study day
$("#day-slider").slider({
    range: true,
    max: 100,
    min: -5,
    step: 1, // One day
    values: [-5, 100],
    slide: function(event, ui){
        $("#dateLabel1").text(ui.values[0]+ '/x');
        $("#dateLabel2").text(ui.values[1]+ '/y');
        update(data);
    }
});

function getDay (refdate, date1) {
    var date1 = new Date("03/18/2018");
    var date2 = new Date("03/15/2010");
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return (diffDays)
}

// for testing
var sliderValues = $("#day-slider").slider("values");

var t = d3.transition().duration(750);
var gradesColour = d3.scaleOrdinal(d3.schemePastel1);

// tooltip for AE info
var tip = d3.tip()
    .attr('class', 'd3-tip').html(function (d) {
        var text = "<strong>AE: </strong><span style='color: red'>" + d.AEDECOD + "</span><br>";
        text += "<strong>AE start day </strong><span style='color: red'>" + d.ASTDY + "</span><br>";
        text += "<strong>AE end day </strong><span style='color: red'>" + d.AENDY + "</span><br>";
        text += "<strong>AE Grade </strong><span style='color: red'>" + d.AETOXGRN + "</span><br>";
        return text;
    });


//var data =  d3.json("data/df_ae.json");
var data = [{ "AEDECOD": "NEUTROPENIA", "ASTDT": "2014-03-17", "AENDT": "2014-03-23", "ASTDY": 118, "AENDY": 124, "AETOXGRN": 1 },
{ "AEDECOD": "PERIPHERAL SENSORY NEUROPATHY", "ASTDT": "2014-04-06", "AENDT": "2014-04-22", "ASTDY": 138, "AENDY": 154, "AETOXGRN": 2 },
{ "AEDECOD": "ABDOMINAL PAIN", "ASTDT": "2014-08-14", "AENDT": "2014-08-15", "ASTDY": 3, "AENDY": 4, "AETOXGRN": 1 },
{ "AEDECOD": "ABDOMINAL PAIN", "ASTDT": "2014-08-16", "AENDT": "2014-08-21", "ASTDY": 5, "AENDY": 10, "AETOXGRN": 2 },
{ "AEDECOD": "INSOMNIA", "ASTDT": "2014-09-07", "AENDT": "2014-09-12", "ASTDY": 27, "AENDY": 32, "AETOXGRN": 1 }]

// When AEfilter select box changes update the plot
$("#aeType-select")
    .on("change", function () {
        update(data);
    });

// Define svg once outside the update - want to change the size of svg inside update depending on #AEs
var svg = d3.select("#chart-area")
.append("svg")

// Main plotting function updated as requried
function update(data) {

    var margin = { left: 200, right: 160, top: 50, bottom: 100 };
    var aeType = $("#aeType-select").val();
   
    // Filter data if required
    var data = data.filter(function (d) {
        if (aeType == "all") { return true; }
        else {
            console.log("here");
            return d.AETOXGRN > 1;
        }
    })
    console.log(data);
    var nterms = data.length

    var width = 750 - margin.left - margin.right,
        height = (nterms*100)  - margin.top - margin.bottom;
        console.log(height);

// This line needs to be done properly
d3.select("g").remove()

var g = d3.select("svg")
    //.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
g.call(tip);

//d3v5 aysnc d3.json("data/df_ae.json").then(function(data){
// X Scale
var x = d3.scaleLinear()
    .domain([1, d3.max(data, function (d) { return d.AENDY })])
    .range([0, width]);


var xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")");

var yAxisGroup = g.append("g")
    .attr("class", "y axis");




    //Y Scale - after data is filtered
    var y = d3.scaleBand()
       .domain(data.map(d => d.AEDECOD))
       .range([0, height])
       .padding(0.2);

    var bars = g.selectAll("rect")
        .data(data)
    //    .attr('marker-end', function (d, i) { return 'url(#marker_' + 'arrow' + ')' })

    //EXIT
    //Remove bar elements not kept in new data selection
    bars.exit()
        .attr("fill", "red")
        .transition(t)
        .attr("y", y(0))
        .attr("height", 0)
    .   remove();

    //UPDATE
    // Update old bars
    bars.attr("class", "update")
        .transition(t)
        .attr('y', d => y(d.AEDECOD))
        .attr('width', d => x(d.AENDY - d.ASTDY + 1))
        .attr("fill-opacity", 1)
    
    // Add new bars
    bars.enter()
        .append("rect")
        .attr('x', d => x(d.ASTDY))
        .attr('y', d => y(d.AEDECOD))
        .attr('width', 0)
        .attr('height', y.bandwidth)
        .attr('fill-opacity', 0)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .attr('fill', d => gradesColour(d.AETOXGRN))
        .attr('marker-end', function (d, i) { return 'url(#marker_' + 'arrow' + ')' })
        .transition(t)
        .attr('width', d => x(d.AENDY - d.ASTDY + 1))
        .attr("fill-opacity", 1)

    // Y Axis

    var yAxis = d3.axisLeft()
        .scale(y);

    var yAxisCall = d3.axisLeft(y)
    yAxisGroup.transition(t).call(yAxisCall);
        
    
   

    // X Axis
    var xAxis = d3.axisBottom().scale(x);
    g.append("g")
        .call(xAxis)
        .attr("id", "xAxisG");

    d3.selectAll("#xAxisG")
        .attr("transform", "translate(0," +  height + ")");


    // gridlines in y axis function
function make_y_gridlines() {		
    return d3.axisBottom(y)
}

g.append("g")		
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(height)
          .tickFormat("")
      )

    // Legend group to be displayed at side of plot
    var grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4"]
    var legend = g.append("g")
        .attr("transform", "translate(450,100)");
    grades.forEach(function (grade, i) {
        var legendRow = legend.append("g")
            .attr("transform", "translate(0, " + (i * 20) + ")");
        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", gradesColour(i+1));
        legendRow.append("text")
            .attr("x", 80)
            .attr("y", 10)
            .attr("text-anchor", "end")
            .text(grade)
    });
};

update(data);



 // Define arrowhead markers - abandoned as can not add arrowhead to rectangles
 // Abandoned because can't add a marker to rectangle only line
 /*
 var markerData = [
    { id: 0, name: 'circle', path: 'M 0, 0  m -5, 0  a 5,5 0 1,0 10,0  a 5,5 0 1,0 -10,0', viewbox: '-6 -6 12 12' }
    , { id: 1, name: 'square', path: 'M 0,0 m -5,-5 L 5,-5 L 5,5 L -5,5 Z', viewbox: '-5 -5 10 10' }
    , { id: 2, name: 'arrow', path: 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10' }
    , { id: 2, name: 'stub', path: 'M 0,0 m -1,-5 L 1,-5 L 1,5 L -1,5 Z', viewbox: '-1 -5 2 10' }
]

var defs = g.append('svg:defs')

var marker = defs.selectAll('marker')
    .data(markerData)
    .enter()
    .append('svg:marker')
    .attr('id', function (d) { return 'marker_' + d.name })
    .attr('markerHeight', 5)
    .attr('markerWidth', 5)
    .attr('markerUnits', 'strokeWidth')
    .attr('orient', 'auto')
    .attr('refX', 0)
    .attr('refY', 0)
    .attr('viewBox', function (d) { return d.viewbox })
    .append('svg:path')
    .attr('d', function (d) { return d.path })
    .attr('fill', function (d, i) { return gradesColour(i) });

*/



