(function(){
    "use strict";

    var MapsApp = function(){

        if(MapsApp.instance){
            return MapsApp.instance;
        }
        MapsApp.instance = this;

        this.container = null;

        this.init();
    };

    window.MapsApp = MapsApp;

    MapsApp.prototype = {

        init: function(){

            console.log('MapsApp started');

            this.container = document.querySelector('#map-container');

            //http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
            var awesomeType = new google.maps.StyledMapType([ { "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "featureType": "water", "stylers": [ { "color": "#33ccff" } ] },{ "featureType": "transit", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.highway", "stylers": [ { "hue": "#ff0011" } ] } ], {name: "Awesome"});      

            var options = {
              center: {lat: 59.4391373, lng: 24.7720734},
              zoom: 7,
              streetViewControl: false,
              mapTypeControlOptions: {
                mapTypeIds: ["Awesome", google.maps.MapTypeId.ROADMAP]
              }
            };

            //google.maps viide teegile
            console.log(this.container);
            var map = new google.maps.Map(this.container, options);

            //teen uue kaarditüübi
            map.mapTypes.set("Awesome", awesomeType);
            map.setMapTypeId("Awesome");

        },
    };

    window.onload = function(){
        var app = new MapsApp();
    };

})();
