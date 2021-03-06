// GLOBAL CONSTANTS
const API_ENDPOINT = "https://lokalwirkt.de";
const MAPBOX_API_KEY = "pk.eyJ1IjoicGljbW90aW9uIiwiYSI6ImNrODMzMnQ0NTAwZWMzbG83aW1qMnpwOHkifQ.1qI277PFv9xHGoEAcz3bZQ";

// GLOBAL VARIABLES
var mymap

// HELPER FUNCTIONS
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function replaceJavaScriptWithHttps(str){
  return String(str).replace(/javascript:/gmi,"https://");
}

function checkOutput(str){
    if(str){
        return htmlEntities(replaceJavaScriptWithHttps(str));
    } else {
        return "<i class='muted'>Kein Eintrag</i>";
    }
}

function hoursStrToSeconds(hourStr){
  var hours = parseInt(hourStr.split(":")[0])
  var sec = parseInt(hourStr.split(":")[1])

  console.log(hours,sec);
  

  return (3600 * hours) + sec; 
}

function secondsTo24h(seconds){
    hours = Math.floor(seconds / 3600); 
    minutes = Math.floor((seconds - (hours * 3600)) / 60); 

    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0')
}

function getOpeningHoursByDay(openingHoursJson, dayNum){
    if(openingHoursJson){
      element = openingHoursJson.find(e => e.weekday === dayNum);
      if(element){
          return secondsTo24h(element.open) + " - " + secondsTo24h(element.close);
      } else {
          return undefined
      }
    } else {
      return undefined
    }
}

function getOpeningHoursOpenByDay(openingHoursJson, dayNum, type){
  if(openingHoursJson){
    element = openingHoursJson.find(e => e.weekday === dayNum && e.type === type);
    if(element){
        return secondsTo24h(element.open);
    } else {
        return undefined
    }
  } else {
    return undefined
  }
}

function getOpeningHoursCloseByDay(openingHoursJson, dayNum, type){
  if(openingHoursJson){
    element = openingHoursJson.find(e => e.weekday === dayNum && e.type === type);
    if(element){
        return secondsTo24h(element.close);
    } else {
        return undefined
    }
  } else {
    return undefined
  }
}

function getCompanyCardById(id){
  if(id){
    if(id === "-1"){
      return undefined;
    }
    let path = "/api/store/"+id;
    let response = $.ajax({url:API_ENDPOINT+path,async:false}).responseText
    if(response){
      let json = JSON.parse(response);
      if(json){
        return getCompanyCard(json.data)
      }
    }
    return undefined
  }
  return "Kein Eintrag unter der dieser ID gefunden, probier es mal mit der <a href='/search/'>Suche</a>."
}

function getCompanyCard(jsonCompanyElement){
    if(jsonCompanyElement){
      return `<div class="row mt-1 mb-1">
        <div class="col">
          <div class="card ">
            <div class="card-body">
              <h5 class="card-title">`+checkOutput(jsonCompanyElement.name)+`</h5>
              <p class="card-text">
                <div class="row mb-1">
                  <div class="col-1">
                    <b><i class="fas fa-map-marked-alt"></i></b>
                  </div>
                  <div class="col-8">
                    <a href="/map/#location=`+checkOutput(jsonCompanyElement.lat+","+jsonCompanyElement.lon)+`&radius=1500&id=`+checkOutput(jsonCompanyElement.id)+`">`+checkOutput(jsonCompanyElement.address)+", "+checkOutput(jsonCompanyElement.postalcode)+" "+checkOutput(jsonCompanyElement.locality)+", "+checkOutput(jsonCompanyElement.country)+`</a>
                  </div>
                  <div class="col-1">
                  <a class="pull-right lead" href="`+document.location.protocol+"//"+document.location.host+"/company/#id="+checkOutput(jsonCompanyElement.id)+`" aria-label="Einzelansicht zum Teilen"><i class="fas fa-external-link-alt"></i></a>
                  </div>
                  <div class="col-1">
                  <a class="pull-right lead" href="`+document.location.protocol+"//"+document.location.host+"/add-company/#id="+checkOutput(jsonCompanyElement.id)+`" aria-label="Bearbeiten"><i class="fas fa-pen"></i></a>
                  </div>
                </div>
                `+checkOutput(jsonCompanyElement.description)+`
              </p>
              <div class="collapse mt-2 mb-2" id="collapse-`+checkOutput(jsonCompanyElement.id)+`">
                <div class="row">
                  <div class="col-2">
                    <b><i class="fas fa-globe"></i></b>
                  </div>
                  <div class="col-10">
                    <a href="`+checkOutput(jsonCompanyElement.website)+`">`+checkOutput(jsonCompanyElement.website)+`</a>
                  </div>
                </div>
                <div class="row">
                  <div class="col-2">
                    <b><i class="fas fa-envelope"></i></b>
                  </div>
                  <div class="col-10">
                    <a href="mailto:`+checkOutput(jsonCompanyElement.email)+`">`+checkOutput(jsonCompanyElement.email)+`</a>
                  </div>
                </div>
                <div class="row">
                  <div class="col-2">
                    <b><i class="fas fa-phone"></i></b>
                  </div>
                  <div class="col-10">
                    <a href="tel:`+checkOutput(jsonCompanyElement.phone)+`">`+checkOutput(jsonCompanyElement.phone)+`</a>
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
                          `+checkOutput(getOpeningHoursByDay(jsonCompanyElement["opening-time"],1))+`
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                          Di.
                        </div>
                        <div class="col-8">
                          `+checkOutput(getOpeningHoursByDay(jsonCompanyElement["opening-time"],2))+`
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                          Mi.
                        </div>
                        <div class="col-8">
                          `+checkOutput(getOpeningHoursByDay(jsonCompanyElement["opening-time"],3))+`
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                          Do.
                        </div>
                        <div class="col-8">
                          `+checkOutput(getOpeningHoursByDay(jsonCompanyElement["opening-time"],4))+`
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                          Fr.
                        </div>
                        <div class="col-8">
                          `+checkOutput(getOpeningHoursByDay(jsonCompanyElement["opening-time"],5))+`
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                          Sa.
                        </div>
                        <div class="col-8">
                          `+checkOutput(getOpeningHoursByDay(jsonCompanyElement["opening-time"],6))+`
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                          So.
                        </div>
                        <div class="col-8">
                          `+checkOutput(getOpeningHoursByDay(jsonCompanyElement["opening-time"],7))+`
                        </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-2">
                    <b><i class="fas fa-gift"></i></b>
                  </div>
                  <div class="col-10">
                    <a href="`+checkOutput(jsonCompanyElement.website_coupon)+`">`+checkOutput(jsonCompanyElement.website_coupon)+`</a>
                  </div>
                </div>
                <div class="row">
                  <div class="col-2">
                    <b><i class="fas fa-hand-holding-heart"></i></b>
                  </div>
                  <div class="col-10">
                    <a href="`+checkOutput(jsonCompanyElement.website_crowdfunding)+`">`+checkOutput(jsonCompanyElement.website_crowdfunding)+`</a>
                  </div>
                </div>
              </div>
              <button class="btn" type="button" data-toggle="collapse" data-target="#collapse-`+checkOutput(jsonCompanyElement.id)+`" aria-expanded="false" aria-controls="collapseExample">
                Mehr
              </button>
            </div>
          </div>
        </div>
      </div>`;
    } else {
      return "Da waren wohl keine Daten zum Anzeigen."
    }
}

//Setup functions to populate the current view.
//Message of the Day
function setupMoD(){
  if (sessionStorage.getItem("mod_visible") === "true" || sessionStorage.getItem("mod_visible") == undefined){
    $(".alert").show()
  } else {
    $(".alert").hide()
  }
  $("#mod-close-alert").click(function(obj){
    sessionStorage.setItem("mod_visible", false)
  });
}