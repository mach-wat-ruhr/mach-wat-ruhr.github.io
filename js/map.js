API_ENDPOINT = "https://nebenaneinkaufen.next-site.de";

function addMarker(lon,lat,id){
    let path = "/api/store/"+id;
    $.ajax({url:API_ENDPOINT+path,error:function(xhr){alert("An error occured: " + xhr.status + " " + xhr.statusText)}, success:function(xhr){
        console.log(xhr)
        var template = `<div class="card ">
            <div class="card-body">
            <h5 class="card-title">`+xhr.data.name+`</h5>
            <p class="card-text">
                Ein kleiner Text über unser unternehmen und welche hilfe wir brauchen
            </p>
            <p>Tags: Mitarbeiter gesucht,abholen möglich</p>
            <div class="mt-2 mb-2 collapse" id="collapse-0" style="">
                <div class="row">
                <div class="col-2">
                    <b><i class="fas fa-map-marked-alt"></i></b>
                </div>
                <div class="col-10">
                    Starße 1, 44787 Bochum
                </div>
                </div>
                <div class="row">
                <div class="col-2">
                    <b><i class="fas fa-envelope"></i></b>
                </div>
                <div class="col-10">
                    <a href="mailto:example@example">example@example</a>
                </div>
                </div>
                <div class="row">
                <div class="col-2">
                    <b><i class="fas fa-phone"></i></b>
                </div>
                <div class="col-10">
                    <a href="tel:+49123456789">+49123456789</a>
                </div>
                </div>
                <div class="row">
                <div class="col-2">
                    <b><i class="fas fa-clock"></i></b>
                </div>
                <div class="col-10">
                    <div class="row">
                        <div class="col-4">
                        Mo.
                        </div>
                        <div class="col-8">
                        10:00 - 12:00
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                        Di.
                        </div>
                        <div class="col-8">
                        10:00 - 12:00
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                        Mi.
                        </div>
                        <div class="col-8">
                        10:00 - 12:00
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                        Do.
                        </div>
                        <div class="col-8">
                        10:00 - 12:00
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                        Fr.
                        </div>
                        <div class="col-8">
                        10:00 - 12:00
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                        Sa.
                        </div>
                        <div class="col-8">
                        10:00 - 12:00
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                        So.
                        </div>
                        <div class="col-8">
                        10:00 - 12:00
                        </div>
                    </div>
                </div>
                </div>
                <div class="row">
                <div class="col-2">
                    <b><i class="fas fa-gift"></i></b>
                </div>
                <div class="col-10">
                    <a href="https://giftcards.example">https://giftcards.example</a>
                </div>
                </div>
                <div class="row">
                <div class="col-2">
                    <b><i class="fas fa-hand-holding-heart"></i></b>
                </div>
                <div class="col-10">
                    <a href="https://crowdfound.example">https://crowdfound.example</a>
                </div>
                </div>
            </div>
            <button class="btn collapsed" type="button" data-toggle="collapse" data-target="#collapse-0" aria-expanded="false" aria-controls="collapseExample">
                Mehr
            </button>
            </div>
        </div>`;
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