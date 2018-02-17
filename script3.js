$(function () {


    // Draws map
    var drawMap = function () {
        var map = L.map('mapid').setView([37.09024, -95.712891], 4);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var dataset = []; // keeps track of full dataset

        getData(dataset, map);

    }



    var getData = function(dataset, map) {

        // Reads through CSV and converts values to numbers
        d3.csv("massshootings.csv", function (error, shootings) {
            if (error) return console.warn(error);

            shootings.forEach(function(d) {
                d.MONTH = +d.MONTH;
                d.YEAR = +d.YEAR;
                d.MNTHYR = +d.MNTHYR;
                d.LAT = +d.LAT;
                d.LNG = +d.LNG;
                d.KILLED = +d.KILLED;
                d.INJURED = +d.INJURED;
                // console.log('On ' + d.DATE + ', ' + d.KILLED + ' people were killed and ' + d.INJURED + ' people were injured in a shooting in ' + d.CITYCTY + ', ' + d.STATE + '. LAT:' + d.LAT + ' LNG: ' + d.LNG);
            });

            //dataset = full dataset
            dataset = shootings;

            addMarkers(dataset, map);

        });
    }


    // Adds markers to map
    var addMarkers = function (dataset, map) {
        console.log(dataset);

        var jan17 = [];
        var feb17 = [];
        var mar17 = [];
        var apr17 = [];
        var may17 = [];
        var jun17 = [];
        var jul17 = [];
        var aug17 = [];
        var sep17 = [];
        var oct17 = [];
        var nov17 = [];
        var dec17 = [];
        var jan18 = [];
        var feb18 = [];

        dataset.forEach(function(d) {

            var circle;

            if (d.KILLED > d.INJURED) {          
                circle = L.circleMarker([d.LAT, d.LNG], {
                    color: '#000000',
                    radius: (d.KILLED)
                }).bindPopup('On ' + d.DATE + ', ' + d.KILLED + ' people were killed and ' + d.INJURED + ' people were injured in a shooting in ' + d.CITYCTY + ', ' + d.STATE + '.');
                
                /*if (d.MNTHYR = 12017) {
                    console.log("pushing circle to jan17...");
                    jan17.push(circle);
                } 
                
                if (d.MNTHYR = 22017) {
                    console.log("pushing circle to feb17...");
                    feb17.push(circle);
                } 
                
                if (d.MNTHYR = 32017) {
                    console.log("pushing circle to mar17...");
                    mar17.push(circle);
                } 
                
                if (d.MNTHYR = 42017) {
                    console.log("pushing circle to apr17...");
                    apr17.push(circle);
                } 
                
                if (d.MNTHYR = 52017) {
                    console.log("pushing circle to may17...");
                    may17.push(circle);
                } 
                
                if (d.MNTHYR = 62017) {
                    console.log("pushing circle to jun17...");
                    jun17.push(circle);
                } 
                
                if (d.MNTHYR = 72017) {
                    console.log("pushing circle to jul17...");
                    jul17.push(circle);
                } 
                
                if (d.MNTHYR = 82017) {
                    console.log("pushing circle to aug17...");
                    aug17.push(circle);
                } 
                
                if (d.MNTHYR = 92017) {
                    console.log("pushing circle to sep17...");
                    sep17.push(circle);
                } 
                
                if (d.MNTHYR = 102017) {
                    console.log("pushing circle to oct17...");
                    oct17.push(circle);
                } 
                
                if (d.MNTHYR = 112017) {
                    console.log("pushing circle to nov17...");
                    nov17.push(circle);
                } 
                
                if (d.MNTHYR = 122017) {
                    console.log("pushing circle to dec17...");
                    dec17.push(circle);
                } 
                
                if (d.MNTHYR = 12018) {
                    console.log("pushing circle to jan18...");
                    jan18.push(circle);
                } 
                    
                if (d.MNTHYR = 22018) {
                    console.log("pushing circle to feb18...");
                    feb18.push(circle);
                }*/
            } else { // number of injured is greater than number of people killed
                circle = L.circleMarker([d.LAT, d.LNG], {
                    color: '#A10000',
                    radius: (d.INJURED)
                }).bindPopup('On ' + d.DATE + ', ' + d.KILLED + ' people were killed and ' + d.INJURED + ' people were injured in a shooting in ' + d.CITYCTY + ', ' + d.STATE + '.');
                
                /*if (d.MNTHYR = '12017') {
                    console.log("pushing circle to jan17...");
                    jan17.push(circle);
                } 
                
                if (d.MNTHYR = 22017) {
                    console.log("pushing circle to feb17...");
                    feb17.push(circle);
                } 
                
                if (d.MNTHYR = 32017) {
                    console.log("pushing circle to mar17...");
                    mar17.push(circle);
                } 
                
                if (d.MNTHYR = 42017) {
                    console.log("pushing circle to apr17...");
                    apr17.push(circle);
                } 
                
                if (d.MNTHYR = 52017) {
                    console.log("pushing circle to may17...");
                    may17.push(circle);
                } 
                
                if (d.MNTHYR = 62017) {
                    console.log("pushing circle to jun17...");
                    jun17.push(circle);
                } 
                
                if (d.MNTHYR = 72017) {
                    console.log("pushing circle to jul17...");
                    jul17.push(circle);
                } 
                
                if (d.MNTHYR = 82017) {
                    console.log("pushing circle to aug17...");
                    aug17.push(circle);
                } 
                
                if (d.MNTHYR = 92017) {
                    console.log("pushing circle to sep17...");
                    sep17.push(circle);
                } 
                
                if (d.MNTHYR = 102017) {
                    console.log("pushing circle to oct17...");
                    oct17.push(circle);
                } 
                
                if (d.MNTHYR = 112017) {
                    console.log("pushing circle to nov17...");
                    nov17.push(circle);
                } 
                
                if (d.MNTHYR = 122017) {
                    console.log("pushing circle to dec17...");
                    dec17.push(circle);
                } 
                
                if (d.MNTHYR = 12018) {
                    console.log("pushing circle to jan18...");
                    jan18.push(circle);
                } 
                    
                if (d.MNTHYR = 22018) {
                    console.log("pushing circle to feb18...");
                    feb18.push(circle);
                }*/
            }

            console.log(d.MNTHYR);

            if (d.MNTHYR = '12017') {
                    console.log("pushing circle to jan17...");
                    jan17.push(circle);
                } 
                
                if (d.MNTHYR = 22017) {
                    console.log("pushing circle to feb17...");
                    feb17.push(circle);
                } 
                
                if (d.MNTHYR = 32017) {
                    console.log("pushing circle to mar17...");
                    mar17.push(circle);
                } 
                
                if (d.MNTHYR = 42017) {
                    console.log("pushing circle to apr17...");
                    apr17.push(circle);
                } 
                
                if (d.MNTHYR = 52017) {
                    console.log("pushing circle to may17...");
                    may17.push(circle);
                } 
                
                if (d.MNTHYR = 62017) {
                    console.log("pushing circle to jun17...");
                    jun17.push(circle);
                } 
                
                if (d.MNTHYR = 72017) {
                    console.log("pushing circle to jul17...");
                    jul17.push(circle);
                } 
                
                if (d.MNTHYR = 82017) {
                    console.log("pushing circle to aug17...");
                    aug17.push(circle);
                } 
                
                if (d.MNTHYR = 92017) {
                    console.log("pushing circle to sep17...");
                    sep17.push(circle);
                } 
                
                if (d.MNTHYR = 102017) {
                    console.log("pushing circle to oct17...");
                    oct17.push(circle);
                } 
                
                if (d.MNTHYR = 112017) {
                    console.log("pushing circle to nov17...");
                    nov17.push(circle);
                } 
                
                if (d.MNTHYR = 122017) {
                    console.log("pushing circle to dec17...");
                    dec17.push(circle);
                } 
                
                if (d.MNTHYR = 12018) {
                    console.log("pushing circle to jan18...");
                    jan18.push(circle);
                } 
                    
                if (d.MNTHYR = 22018) {
                    console.log("pushing circle to feb18...");
                    feb18.push(circle);
                }
        });

        console.log(jan17);

        // m = month, y = year
        var m1y17 = L.layerGroup(jan17);
        var m2y17 = L.layerGroup(feb17);
        var m3y17 = L.layerGroup(mar17);
        var m4y17 = L.layerGroup(apr17);
        var m5y17 = L.layerGroup(may17);
        var m6y17 = L.layerGroup(jun17);
        var m7y17 = L.layerGroup(jul17);
        var m8y17 = L.layerGroup(aug17);
        var m9y17 = L.layerGroup(sep17);
        var m10y17 = L.layerGroup(oct17);
        var m11y17 = L.layerGroup(nov17);
        var m12y17 = L.layerGroup (dec17);
        var m1y18 = L.layerGroup(jan18);
        var m2y18 = L.layerGroup(feb18);

        var overlayMaps = {
            "January 2017": m1y17,
            "February 2017": m2y17,
            "March 2017": m3y17,
            "April 2017": m4y17,
            "May 2017": m5y17,
            "June 2017": m6y17,
            "July 2017": m7y17,
            "August 2017": m8y17,
            "September 2017": m9y17,
            "October 2017": m10y17,
            "November 2017": m11y17,
            "December 2017": m12y17,
            "January 2018": m1y18,
            "February 2018": m2y18
        };

        m1y17.addTo(map);
        m2y17.addTo(map);
        m3y17.addTo(map);
        m4y17.addTo(map);
        m5y17.addTo(map);
        m6y17.addTo(map);
        m7y17.addTo(map);
        m8y17.addTo(map);
        m9y17.addTo(map);
        m10y17.addTo(map);
        m11y17.addTo(map);
        m12y17.addTo(map);
        m1y18.addTo(map);
        m2y18.addTo(map);

        // Leaflet controller to show/hide layers

        L.control.layers(null, overlayMaps).addTo(map);

    }

    drawMap();

});