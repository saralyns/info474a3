$(function () {

	// var drawMap = function () {
		var map = L.map('mapid').setView([37.09024, -95.712891], 4);

		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		/* L.marker([51.5, -0.09]).addTo(map)
		.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
		.openPopup();*/
	// 

});