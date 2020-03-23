API_ENDPOINT = "https://nebenaneinkaufen.next-site.de";

function addMarker(lon,lat,id){
    let path = "/api/store/"+id;
    $.ajax({url:API_ENDPOINT+path,error:function(xhr){alert("An error occured: " + xhr.status + " " + xhr.statusText)}, success:function(xhr){
        console.log(xhr)
        var template = getCompanyCard(xhr.data);
        L.marker([lon,lat]).addTo(mymap).bindPopup(template);
    }});
}

var mymap;

function setupMap(){
    let hash = window.location.hash; //#location=51.530389,7.684544&radius=5
    let radius = parseInt(hash.match(/radius=(.*?)(&|$)/)[1]);
    let lonlat = hash.match(/location=(.*?)(&|$)/)[1].split(",");
    let lon = parseFloat(lonlat[0]);
    let lat = parseFloat(lonlat[1]);
    let id = hash.match(/id=(.*?)(&|$)/) ? hash.match(/id=(.*?)(&|$)/)[1] : false

    if(id){
        if(radius){
            if(lonlat.length === 2){
                mymap = L.map('mapid').setView([lon, lat], radius);

                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoicGljbW90aW9uIiwiYSI6ImNrODMzMnQ0NTAwZWMzbG83aW1qMnpwOHkifQ.1qI277PFv9xHGoEAcz3bZQ'
                }).addTo(mymap);

                addMarker(lon,lat,id)
                return 
            } else {
                console.warn("Parameter loncation is missing 2 numbers seperated by a comma.")
            }
        } else {
            console.warn("No radius found.")
        }
    } else {
        console.warn("No id found.")
    }

    // default if fails to load map
    mymap = L.map('mapid').setView([51.5, 7.1], 10); //Ruhrgebiet
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoicGljbW90aW9uIiwiYSI6ImNrODMzMnQ0NTAwZWMzbG83aW1qMnpwOHkifQ.1qI277PFv9xHGoEAcz3bZQ'
                }).addTo(mymap);
    
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