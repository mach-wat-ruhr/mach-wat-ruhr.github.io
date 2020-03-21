function sendToMainSearch(input){
  window.location.assign("/search/#input="+input);
  setupSearch();
}

function setupSearch(){
  let hash = $(location).attr('hash')
  let input = hash.substring(hash.indexOf("input=")+6);
  $("#search").val(htmlEntities(input));
  result = search(input)
  showResult(result)
}

window.onload = function(){
  setupSearch();

  $("#button-navbar-search").click(function(obj){
    value = $("#button-navbar-search-input").val()
    if(value !== undefined || value !== ""){
      sendToMainSearch($("#button-navbar-search-input").val());
    }
  });

  $("#search").on("keypress", function(e){
    if(e.which == 13){
        var inputVal = $(this).val();
        result = search(inputVal)
        showResult(result)
    }
});
};

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function search(input){
  console.log("Sending input to server:",input);
  return [
    {
      name : "Unternehmen A",
      location : "Starße 1, 44787 Bochum",
      contact : {
        email : "example@example",
        phone : "+49123456789"
      },
      opening_hours : {
        mon : "10:00 - 12:00",
        tue : "10:00 - 12:00",
        wed : "10:00 - 12:00",
        thu : "10:00 - 12:00",
        fri : "10:00 - 12:00",
        sat : "10:00 - 12:00",
        sun : "10:00 - 12:00",
      },
      description : "Ein kleiner Text über unser unternehmen und welche hilfe wir brauchen",
      category : "RESTAURANT",
      how_to_buy_giftcards : {
        url : "https://giftcards.example"
      },
      how_to_crowdfund : {
        url : "https://crowdfound.example"
      },
      help_tags : [
        "Mitarbeiter gesucht",
        "abholen möglich"
      ]
    },
    {
      name : "Unternehmen B",
      location : "Starße 2, 44787 Bochum",
      contact : {
        email : "example@example",
        phone : "+49123456789"
      },
      opening_hours : {
        mon : "10:00 - 12:00",
        tue : "10:00 - 12:00",
        wed : "10:00 - 12:00",
        thu : "10:00 - 12:00",
        fri : "10:00 - 12:00",
        sat : "10:00 - 12:00",
        sun : "10:00 - 12:00",
      },
      description : "Ein kleiner Text über unser unternehmen und welche hilfe wir brauchen",
      category : "SHOP",
      how_to_buy_giftcards : {
        url : "https://giftcards.example"
      },
      how_to_crowdfund : {
        url : "https://crowdfound.example"
      },
      help_tags : [
        "Mitarbeiter gesucht",
        "Online Handel"
      ]
    }
  ]
}

function showResult(result){
  console.log(result);
  let headline = $("#search-headline");
  headline.text("Einträge gefunden: "+result.length);
  let search_results = $("#search-result");
  var result_template = "";
  for (let i=0; i<result.length; i++) {
    let template = `<div class="row mt-1 mb-1">
      <div class="col">
        <div class="card ">
          <div class="card-body">
            <h5 class="card-title">`+htmlEntities(result[i].name)+`</h5>
            <p class="card-text">
              `+htmlEntities(result[i].description)+`
            </p>
            <p>Tags: `+htmlEntities(result[i].help_tags)+`</p>
            <div class="collapse mt-2 mb-2" id="collapse-`+i+`">
              <div class="row">
                <div class="col-2">
                  <b><i class="fas fa-map-marked-alt"></i></b>
                </div>
                <div class="col-10">
                  `+htmlEntities(result[i].location)+`
                </div>
              </div>
              <div class="row">
                <div class="col-2">
                  <b><i class="fas fa-envelope"></i></b>
                </div>
                <div class="col-10">
                  <a href="mailto:`+htmlEntities(result[i].contact.email)+`">`+htmlEntities(result[i].contact.email)+`</a>
                </div>
              </div>
              <div class="row">
                <div class="col-2">
                  <b><i class="fas fa-phone"></i></b>
                </div>
                <div class="col-10">
                  <a href="tel:`+htmlEntities(result[i].contact.phone)+`">`+htmlEntities(result[i].contact.phone)+`</a>
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
                        `+htmlEntities(result[i].opening_hours.mon)+`
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-4">
                        Di.
                      </div>
                      <div class="col-8">
                        `+htmlEntities(result[i].opening_hours.tue)+`
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-4">
                        Mi.
                      </div>
                      <div class="col-8">
                        `+htmlEntities(result[i].opening_hours.wed)+`
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-4">
                        Do.
                      </div>
                      <div class="col-8">
                        `+htmlEntities(result[i].opening_hours.thu)+`
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-4">
                        Fr.
                      </div>
                      <div class="col-8">
                        `+htmlEntities(result[i].opening_hours.fri)+`
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-4">
                        Sa.
                      </div>
                      <div class="col-8">
                        `+htmlEntities(result[i].opening_hours.sat)+`
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-4">
                        So.
                      </div>
                      <div class="col-8">
                        `+htmlEntities(result[i].opening_hours.sun)+`
                      </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-2">
                  <b><i class="fas fa-gift"></i></b>
                </div>
                <div class="col-10">
                  <a href="`+htmlEntities(result[i].how_to_buy_giftcards.url)+`">`+htmlEntities(result[i].how_to_buy_giftcards.url)+`</a>
                </div>
              </div>
              <div class="row">
                <div class="col-2">
                  <b><i class="fas fa-hand-holding-heart"></i></b>
                </div>
                <div class="col-10">
                  <a href="`+htmlEntities(result[i].how_to_crowdfund.url)+`">`+htmlEntities(result[i].how_to_crowdfund.url)+`</a>
                </div>
              </div>
            </div>
            <button class="btn" type="button" data-toggle="collapse" data-target="#collapse-`+i+`" aria-expanded="false" aria-controls="collapseExample">
              Mehr
            </button>
          </div>
        </div>
      </div>
    </div>`;
    result_template += "\n"+template;
  }

  search_results.html(result_template);
}
