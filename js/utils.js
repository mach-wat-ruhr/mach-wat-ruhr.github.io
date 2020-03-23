// GLOBAL CONSTANTS
API_ENDPOINT = "https://nebenaneinkaufen.next-site.de";

// HELPER FUNCTIONS
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function checkOutput(str){
    if(str){
        return htmlEntities(str);
    } else {
        return "<i class='muted'>Kein Eintrag</i>";
    }
} 

function secondsTo24h(seconds){
    hours = Math.floor(seconds / 3600); 
    minutes = Math.floor((seconds - (hours * 3600)) / 60); 

    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0')
}

function getOpeningHoursByDay(openingHoursJson, dayNum){
    element = openingHoursJson.find(e => e.weekday === dayNum);
    if(element){
        return secondsTo24h(element.open) + " - " + secondsTo24h(element.close);
    } else {
        return undefined
    }
}

function getCompanyCard(jsonCompanyElement){
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
                <div class="col-11">
                  <a href="/map/#location=`+checkOutput(jsonCompanyElement.location)+`&radius=15&id=`+checkOutput(jsonCompanyElement.id)+`">`+checkOutput(jsonCompanyElement.address+", "+jsonCompanyElement.postalcode+" "+jsonCompanyElement.locality+", "+jsonCompanyElement.country)+`</a>
                </div>
              </div>
              `+checkOutput(jsonCompanyElement.description)+`
            </p>
            <p>Tags: `+checkOutput(jsonCompanyElement.help_tags)+`</p>
            <div class="collapse mt-2 mb-2" id="collapse-`+checkOutput(jsonCompanyElement.id)+`">
              <div class="row">
                <div class="col-2">
                  <b><i class="fas fa-globe"></i></b>
                </div>
                <div class="col-10">
                  <a href="mailto:`+checkOutput(jsonCompanyElement.website)+`">`+checkOutput(jsonCompanyElement.website)+`</a>
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
}