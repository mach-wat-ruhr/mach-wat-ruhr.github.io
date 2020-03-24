function addMarker(lat,lon,id){
    let path = "/api/store/"+id;
    $.ajax({url:API_ENDPOINT+path,error:function(xhr){alert("An error occured: " + xhr.status + " " + xhr.statusText)}, success:function(xhr){
        console.log(xhr)
        var template = getCompanyCard(xhr.data);
        L.marker([lat,lon]).addTo(mymap).bindPopup(template);
    }});
}

function addGeoJSON(lat,lon,radius){
    let path = "/api/stores/geo"+"?lon="+lon+"&lat="+lat+"&"+"radius="+(radius*1000);
    $.ajax({url:API_ENDPOINT+path,error:function(xhr){alert("An error occured: " + xhr.status + " " + xhr.statusText)}, success:function(xhr){
        console.log(xhr)

        var geojsonMarkerOptions = {
            radius: 5,
            fillColor: "#808080",
            color: "#808080",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        L.geoJSON(xhr, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }).addTo(mymap);
    }});
}

function setupMap(){
    let hash = window.location.hash; //#location=51.530389,7.684544&radius=5&id=1&area=1

    if(hash){
        var radius = hash.match(/radius=(.*?)(&|$)/) ? parseInt(hash.match(/radius=(.*?)(&|$)/)[1]) : false;
        var latlon = hash.match(/location=(.*?)(&|$)/)[1] ? hash.match(/location=(.*?)(&|$)/)[1].split(",") : false;
        if(latlon.length === 2){
            var lat = parseFloat(latlon[0]);
            var lon = parseFloat(latlon[1]);
        }
        var id = hash.match(/id=(.*?)(&|$)/) ? hash.match(/id=(.*?)(&|$)/)[1] : false
        var area = hash.match(/area=(.*?)(&|$)/) ? true : false
    } else {
        radius = undefined;
        latlon = undefined;
        lon = undefined;
        lat = undefined;
        id = undefined;
        area = true;
    }

    if(!radius){
        radius = 10
    }
    if(!latlon){
        lat = 51.500000
        lon = 7.100000
    }

    mymap = L.map('mapid').setView([lat, lon], radius);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: MAPBOX_API_KEY
    }).addTo(mymap);

    if(id){
        addMarker(lat,lon,id)
    } else {
        console.warn("No id found.")
    }

    if(area){
        addGeoJSON(lat,lon,radius)
    }
}

function centerMap(lat,lon){
    mymap.panTo(new L.LatLng(lat, lon));
    addGeoJSON(lat,lon,15*100)
}

function searchMap(input) {
    if(input){
        console.log("Map search:",input)
        mapboxurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+input+".json?country=de&types=place&access_token="+MAPBOX_API_KEY
        $.ajax({url:mapboxurl,error:function(xhr){alert("An error occured: " + xhr.status + " " + xhr.statusText)}, success:function(xhr){
            console.log(xhr)
            centerMap(xhr.features[0].center[1], xhr.features[0].center[0])
        }});
    } else {
        console.warn("Error map search:",input)
    }
}

window.onload = function(){
    setupMap()
    
    // Search in Map with SearchBar
    $("#button-addon-search").click(function(obj){
        let input = $("#button-addon-search-input").val();
        searchMap(input);
    });
    $("#button-addon-search-input").on("keypress", function(e){
        if(e.which == 13){
            var input = $(this).val();
            searchMap(input);
        }
    });
};