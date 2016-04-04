(function(){
    "use strict";

    var MapsApp = function(){

        if(MapsApp.instance){
            return MapsApp.instance;
        }
        MapsApp.instance = this;

        this.container = null;
        this.map = null;

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
            this.map = new google.maps.Map(this.container, options);

            //teen uue kaarditüübi
            this.map.mapTypes.set("Awesome", awesomeType);
            this.map.setMapTypeId("Awesome");

            //kuulan klikke
            this.map.addListener('click', function(e){
              console.log(e.latLng.lat() + " " +e.latLng.lng());
              MapsApp.instance.createNewMarker(e.latLng.lat(),e.latLng.lng());
            });

        },

        createNewMarker: function(newLat, newLng){

          var p = prompt('lisa kohanimi');

          //ei sisestanud midagi
          if(!p){
            return;
          }

          var options = {
            map: this.map,
            position: {lat: newLat, lng: newLng},
            animation: google.maps.Animation.DROP,
            draggable: true
          };

          var new_marker = new google.maps.Marker(options);

          var infoOptions = {
            content: '<strong>'+ p +'</strong>'
          };

          var new_infoWindow = new google.maps.InfoWindow(infoOptions);

          //seon markeriga
          new_infoWindow.open(this.map, new_marker);

        }
    };

    window.onload = function(){
        var app = new MapsApp();
    };

})();
