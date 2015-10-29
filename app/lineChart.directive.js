(function(){

'use strict';

angular.module('DataVisorDirectives', [])
.directive('lineChart', [
	'DataSource',
    lineChartDirective
]);



function lineChartDirective(DataSource) {
    return {
		templateUrl: 'lineChart.tpl.html',
		link: lineChartlinkFunc.bind(null, DataSource),
		scope: {
			metricType: '=',
			metricRange: '='
		}
    }
}


function lineChartlinkFunc(DataSource, scope, element, attrs) {

	var allData,
		data;

	DataSource.get(scope.metricRange).then(function(res) {
		var allData = res.data;
		data = allData[scope.metricType];
		draw();

		scope.$watch("metricType", function(newVal) {
			data = allData[newVal];
			updateGraph();
		})

	})


	scope.$watch("metricRange", function(newVal) {
		DataSource.get(newVal).then(function(res) {
			data = res.data[scope.metricType];
			updateGraph();
		})
	})



	var currentValEl = element.find('div.visualization')[0];

	var margin = {top: 30, right: 20, bottom: 30, left: 50},
	    width = 800 - margin.left - margin.right,
	    height = 350 - margin.top - margin.bottom;


	var x = d3.time.scale().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis().scale(x)
	    .orient("bottom").ticks(5);

	var yAxis = d3.svg.axis().scale(y)
	    .orient("left").ticks(5);

	var valueline = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.close); });

	var svg = d3.select(currentValEl)
	    .append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	function draw() {

		    data.forEach(function(d) {
		        d.date = new Date(d.date);
		        d.close = Math.random() * 10;
		    });

		    // Scale the range of the data
		    x.domain(d3.extent(data, function(d) { return d.date; }));
		    y.domain([0, d3.max(data, function(d) { return d.close; })]);

		    svg.append("path").attr("class", "line")          // Add the valueline path.
		        .attr("d", valueline(data));

		    svg.append("g")                     // Add the X Axis
		        .attr("class", "x axis")
		        .attr("transform", "translate(0," + height + ")")
		        .call(xAxis);

		    svg.append("g")                     // Add the Y Axis
		        .attr("class", "y axis")
		        .call(yAxis);

		}

	function updateGraph() {

	        data.forEach(function(d) {
	                d.date = new Date(d.date);
	                d.close = Math.random() * 10;
	            });

	        // Scale the range of the data again
	        x.domain(d3.extent(data, function(d) { return d.date; }));
	        y.domain([0, d3.max(data, function(d) { return d.close; })]);

	    // Select the section we want to apply our changes to
	    var svg = d3.select(currentValEl).transition();

	    // Make the changes
	    svg.select(".line")   // change the line
	        .duration(750)
	        .attr("d", valueline(data));
	    svg.select(".x.axis") // change the x axis
	        .duration(750)
	        .call(xAxis);
	    svg.select(".y.axis") // change the y axis
	        .duration(750)
	        .call(yAxis);


	}
}

}());