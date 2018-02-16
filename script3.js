$(function () {


    // Draws map
    var drawMap = function () {
        var map = L.map('mapid').setView([37.09024, -95.712891], 4);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        /*L.marker([47.6548, -122.30778]).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .on("click", function(){
            openPopup();
        });*/

        var dataset = []; // keeps track of full dataset


        getData(dataset, map);

        /*L.marker([b.LAT, b.LNG]).addTo(map)
            .bindPopup('On ' + b.DATE + ', ' + b.KILLED + ' people were killed and ' + b.INJURED + ' people were injured in a shooting in ' + b.CITYCTY + ', ' + b.STATE + '.');*/
    }



    var getData = function(dataset, map) {

        // Reads through CSV and converts values to numbers
        d3.csv("massshootings.csv", function (error, shootings) {
            if (error) return console.warn(error);

            shootings.forEach(function(d) {
                d.MONTH = +d.MONTH;
                d.YEAR = +d.YEAR;
                d.LAT = +d.LAT;
                d.LNG = +d.LNG;
                d.KILLED = +d.KILLED;
                d.INJURED = +d.INJURED;
                // console.log('On ' + d.DATE + ', ' + d.KILLED + ' people were killed and ' + d.INJURED + ' people were injured in a shooting in ' + d.CITYCTY + ', ' + d.STATE + '. LAT:' + d.LAT + ' LNG: ' + d.LNG);
            });

            console.log(shootings);

            //dataset = full dataset
            dataset = shootings;

            console.log(dataset);
            console.log(dataset[0]);

            addMarkers(dataset, map);

        });

    }


    // Adds markers to map
    var addMarkers = function (dataset, map) {
        console.log(dataset);
        dataset.forEach(function(d) {
            // L.marker([d.LAT, d.LNG])
            circle = L.circle([d.LAT, d.LNG], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: d.INJURED
            }).addTo(map)
                .bindPopup('On ' + d.DATE + ', ' + d.KILLED + ' people were killed and ' + d.INJURED + ' people were injured in a shooting in ' + d.CITYCTY + ', ' + d.STATE + '.');
        });
    }

    // Sets up an initial marker
    var init = function(dataset, map) {

        var b = dataset[0];
        /*L.marker([b.LAT, b.LNG]).addTo(map)
            .bindPopup('On ' + b.DATE + ', ' + b.KILLED + ' people were killed and ' + b.INJURED + ' people were injured in a shooting in ' + b.CITYCTY + ', ' + b.STATE + '.');*/
        console.log(b);
    }

    drawMap();

});