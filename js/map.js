function addMarker(lon,lat,id){
    let path = "/api/store/"+id;
    $.ajax({url:API_ENDPOINT+path,error:function(xhr){alert("An error occured: " + xhr.status + " " + xhr.statusText)}, success:function(xhr){
        console.log(xhr)
        var template = getCompanyCard(xhr.data);
        L.marker([lon,lat]).addTo(mymap).bindPopup(template);
    }});
}

function addGeoJSON(lon,lat,radius){
    let path = "/api/stores/geo"//+"?lon="+lon+"&lat="+lat+"&"+"radius="+radius;
    $.ajax({url:API_ENDPOINT+path,error:function(xhr){alert("An error occured: " + xhr.status + " " + xhr.statusText)}, success:function(xhr){
        console.log(xhr)

        var geojsonMarkerOptions = {
            radius: 8,
            fillColor: "#ff7800",
            color: "#000",
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
        var lonlat = hash.match(/location=(.*?)(&|$)/)[1] ? hash.match(/location=(.*?)(&|$)/)[1].split(",") : false;
        if(lonlat.length === 2){
            var lon = parseFloat(lonlat[0]);
            var lat = parseFloat(lonlat[1]);
        }
        var id = hash.match(/id=(.*?)(&|$)/) ? hash.match(/id=(.*?)(&|$)/)[1] : false
        var area = hash.match(/area=(.*?)(&|$)/) ? true : false
    } else {
        radius = undefined;
        lonlat = undefined;
        lon = undefined;
        lat = undefined;
        id = undefined;
        area = undefined;
    }

    if(!radius){
        radius = 10
    }
    if(!lonlat){
        lon = 51.5
        lat = 7.1
    }

    mymap = L.map('mapid').setView([lon, lat], radius);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicGljbW90aW9uIiwiYSI6ImNrODMzMnQ0NTAwZWMzbG83aW1qMnpwOHkifQ.1qI277PFv9xHGoEAcz3bZQ'
    }).addTo(mymap);

    if(id){
        addMarker(lon,lat,id)
    } else {
        console.warn("No id found.")
    }

    if(area){
        addGeoJSON(lon,lat,radius)
    }
}


function searchMap(input) {
    if(input){
        console.log("Map search:",input)
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