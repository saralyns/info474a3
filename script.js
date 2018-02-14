var width = 750;
var height = 450;
var margin = {top: 20, right: 15, bottom: 30, left: 40};
var w = width - margin.left - margin.right;
var h = height - margin.top - margin.bottom;


var patt = new RegExp("all");
var dataset; //the full dataset


d3.csv("censusdata.csv", function(error, states) {
	//read in the data
	if (error) return console.warn(error);
	states.forEach(function(d) {
		d.POP1910 = +d.POP1910;
		d.POP1920 = +d.POP1920;
		d.POP1930 = +d.POP1930;
		d.POP1940 = +d.POP1940;
		d.POP1950 = +d.POP1950;
		d.POP1960 = +d.POP1960;
		d.POP1970 = +d.POP1970;
		d.POP1980 = +d.POP1980;
		d.POP1990 = +d.POP1990;
		d.POP2000 = +d.POP2000;
		d.POP2010 = +d.POP2010;
	});
	//dataset is the full dataset -- maintain a copy of this at all times
	dataset = states;


	//all the data is now loaded, so draw the initial vis
	drawVis(dataset);

});



//none of these depend on the data being loaded so fine to define here

var col = d3.scaleOrdinal(d3.schemeCategory10);


var svg = d3.select("body").append("svg")
.attr("width", w + margin.left + margin.right)
.attr("height", h + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var chart = d3.select(".chart")
.attr("width", w + margin.left + margin.right)
.attr("height", h + margin.top + margin.bottom+15)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("opacity", 0);


var x = d3.scaleLinear()
.domain([1910, 2010])
.range([0, w]);

var y = d3.scaleLinear()
.domain([0, 308745538])
.range([h, 0]);

var xAxis = d3.axisBottom()
.ticks(4)
.scale(x);

chart.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + h + ")")
	.call(xAxis)
	.append("text")
	.attr("x", w)
	.attr("y", -6)
	.style("text-anchor", "end")
	.text("Price");

var yAxis = d3.axisLeft()
.scale(y);

chart.append("g")
	.attr("class", "axis")
	.call(yAxis)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.text("True Value");



function drawVis(dataset) { //draw the circiles initially and on each interaction with a control

	var circle = chart.selectAll("circle")
	.data(dataset);

	circle
		.attr("cx", function(d) { return x(d.price);  })
		.attr("cy", function(d) { return y(d.tValue);  })
		.style("fill", function(d) { return col(d.type); });

	circle.exit().remove();

	circle.enter().append("circle")
		.attr("cx", function(d) { return x(d.price);  })
		.attr("cy", function(d) { return y(d.tValue);  })
		.attr("r", 4)
		.style("stroke", "black")
	//.style("fill", function(d) { return colLightness(d.vol); })
		.style("fill", function(d) { return col(d.type); })
		.style("opacity", 0.5)
		.on("mouseover", function(d) {
		tooltip.transition()
			.duration(200)
			.style("opacity", .9);
		tooltip.html(d.name + " Price: " + d.price + " Vol: " + d.tValue)
			.style("left", (d3.event.pageX) + "px")
			.style("top", (d3.event.pageY - 28) + "px");
	})
		.on("mouseout", function(d) {
		tooltip.transition()
			.duration(500)
			.style("opacity", 0);
	});
}

/*function filterType(mtype) {
	//add code to filter to mytype and rerender vis here

	var res = patt.test(mtype);
	if(res) {
		drawVis(dataset);
	} else {
		var ndata = dataset.filter(function(d) {
			return d["type"] == mtype;
		});
		drawVis(ndata);
	}
}*/

