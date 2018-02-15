$(function () {

	var drawMap = function () {
		var map = L.map('mapid').setView([37.09024, -95.712891], 4);

		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		L.marker([47.6548, -122.30778]).addTo(map)
		.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
		.on("click", function(){
			openPopup();
		});
	}

	drawMap();


	var dataset;

	d3.csv("massshootings.csv", function (error, shootings) {
		if (error) return console.warn(error);
		shootings.forEach(function(d) {
			d.month = +d.month;
			d.year = +d.year;
			d.lat = +d.lat;
			d.lng = +d.lng;
			d.killed = +d.killed;
			d.injured = +d.injured;
		});
		
		//dataset is the full dataset -- maintain a copy of this at all times
		dataset = shootings;

		addMarkers(dataset);
	});

	var addMarkers = function (dataset) {
		dataset.forEach(function (d) {
			L.marker([d.lat, d.lng]).addTo(map)
			.bindPopup('On ' + d.date + ', ' + d.killed + ' people were killed and ' + d.injured + ' people were injured in a shooting in ' + d.citycty + ', ' + d.state + '.')
			.on("click", function(){
				openPopup();
			});
		});
	}


});