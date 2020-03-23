function sendToMainSearch(input){
  window.location.assign("/search/#input="+input);
  setupSearch();
}

function setupSearch(){
  let hash = $(location).attr('hash')
  if(hash == ""){
    return;
  }
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
        var input = $(this).val();
        window.location.hash = "#input="+input;
        result = search(input)
    }
});
};

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function search(input){
  console.log("Sending input to server:",input);
  getStoresBySearch(input);
  // return [
  //   {
  //     name : "Unternehmen A",
  //     location : "Starße 1, 44787 Bochum",
  //     contact : {
  //       email : "example@example",
  //       phone : "+49123456789"
  //     },
  //     opening_hours : {
  //       mon : "10:00 - 12:00",
  //       tue : "10:00 - 12:00",
  //       wed : "10:00 - 12:00",
  //       thu : "10:00 - 12:00",
  //       fri : "10:00 - 12:00",
  //       sat : "10:00 - 12:00",
  //       sun : "10:00 - 12:00",
  //     },
  //     description : "Ein kleiner Text über unser unternehmen und welche hilfe wir brauchen",
  //     category : "RESTAURANT",
  //     how_to_buy_giftcards : {
  //       url : "https://giftcards.example"
  //     },
  //     how_to_crowdfund : {
  //       url : "https://crowdfound.example"
  //     },
  //     help_tags : [
  //       "Mitarbeiter gesucht",
  //       "abholen möglich"
  //     ]
  //   }
  // ]
}

function showResult(result){
  if(result === undefined){
    return showError()
  }
  console.log(result);
  data = result.data;
  let headline = $("#search-headline");
  headline.text("Einträge gefunden: "+result.data.length);
  let search_results = $("#search-result");
  var result_template = "";
  console.log("Data:",data)
  for (let i=0; i<result.data.length; i++) {
    let template = getCompanyCard(data[i]);
    // let template = `<div class="row mt-1 mb-1">
    //   <div class="col">
    //     <div class="card ">
    //       <div class="card-body">
    //         <h5 class="card-title">`+htmlEntities(data[i].name)+`, `+htmlEntities(data[i].locality)+`</h5>
    //         <p class="card-text">
    //           `+htmlEntities(data[i].description)+`
    //         </p>
    //         <p>Tags: `+htmlEntities(data[i].help_tags)+`</p>
    //         <div class="collapse mt-2 mb-2" id="collapse-`+i+`">
    //           <div class="row">
    //             <div class="col-2">
    //               <b><i class="fas fa-map-marked-alt"></i></b>
    //             </div>
    //             <div class="col-10">
    //               <a href="/map/#location=`+data[i].location+`&radius=15&id=`+data[i].id+`">`+htmlEntities(data[i].address+", "+data[i].postalcode+" "+data[i].locality+", "+data[i].country)+`</a>
    //             </div>
    //           </div>
    //           <div class="row">
    //             <div class="col-2">
    //               <b><i class="fas fa-envelope"></i></b>
    //             </div>
    //             <div class="col-10">
    //               <a href="mailto:`+htmlEntities(data[i].email)+`">`+htmlEntities(data[i].email)+`</a>
    //             </div>
    //           </div>
    //           <div class="row">
    //             <div class="col-2">
    //               <b><i class="fas fa-phone"></i></b>
    //             </div>
    //             <div class="col-10">
    //               <a href="tel:`+htmlEntities(data[i].phone)+`">`+htmlEntities(data[i].phone)+`</a>
    //             </div>
    //           </div>
    //           <div class="row">
    //             <div class="col-2">
    //               <b><i class="fas fa-clock"></i></b>
    //             </div>
    //             <div class="col-10">
    //               <div class="row">
    //                   <div class="col-4">
    //                     Mo.
    //                   </div>
    //                   <div class="col-8">
    //                     `+htmlEntities("data[i].opening_hours.mon")+`
    //                   </div>
    //               </div>
    //               <div class="row">
    //                   <div class="col-4">
    //                     Di.
    //                   </div>
    //                   <div class="col-8">
    //                     `+htmlEntities("data[i].opening_hours.tue")+`
    //                   </div>
    //               </div>
    //               <div class="row">
    //                   <div class="col-4">
    //                     Mi.
    //                   </div>
    //                   <div class="col-8">
    //                     `+htmlEntities("data[i].opening_hours.wed")+`
    //                   </div>
    //               </div>
    //               <div class="row">
    //                   <div class="col-4">
    //                     Do.
    //                   </div>
    //                   <div class="col-8">
    //                     `+htmlEntities("data[i].opening_hours.thu")+`
    //                   </div>
    //               </div>
    //               <div class="row">
    //                   <div class="col-4">
    //                     Fr.
    //                   </div>
    //                   <div class="col-8">
    //                     `+htmlEntities("data[i].opening_hours.fri")+`
    //                   </div>
    //               </div>
    //               <div class="row">
    //                   <div class="col-4">
    //                     Sa.
    //                   </div>
    //                   <div class="col-8">
    //                     `+htmlEntities("data[i].opening_hours.sat")+`
    //                   </div>
    //               </div>
    //               <div class="row">
    //                   <div class="col-4">
    //                     So.
    //                   </div>
    //                   <div class="col-8">
    //                     `+htmlEntities("data[i].opening_hours.sun")+`
    //                   </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div class="row">
    //             <div class="col-2">
    //               <b><i class="fas fa-gift"></i></b>
    //             </div>
    //             <div class="col-10">
    //               <a href="`+htmlEntities("data[i].how_to_buy_giftcards.url")+`">`+htmlEntities("data[i].how_to_buy_giftcards.url")+`</a>
    //             </div>
    //           </div>
    //           <div class="row">
    //             <div class="col-2">
    //               <b><i class="fas fa-hand-holding-heart"></i></b>
    //             </div>
    //             <div class="col-10">
    //               <a href="`+htmlEntities("data[i].how_to_crowdfund.url")+`">`+htmlEntities("data[i].how_to_crowdfund.url")+`</a>
    //             </div>
    //           </div>
    //         </div>
    //         <button class="btn" type="button" data-toggle="collapse" data-target="#collapse-`+i+`" aria-expanded="false" aria-controls="collapseExample">
    //           Mehr
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>`;
    result_template += "\n"+template;
  }

  search_results.html(result_template);
}

function showError(){
  let headline = $("#search-headline");
  headline.text("Einträge gefunden: 0");
  let search_results = $("#search-result");
  search_results.html("Keine Einträge gefunden.");
}

// API Access

// API_ENDPOINT = "http://127.0.0.1:4000"
API_ENDPOINT = "https://nebenaneinkaufen.next-site.de"

function getStoreById(id){
  let path = "/api/store/"+id;
  $.ajax({url:API_ENDPOINT+path,error:function(xhr){alert("An error occured: " + xhr.status + " " + xhr.statusText)}, success:function(xhr){console.log(xhr)}})
}

function getGeoJSON(){
  let path = "/api/stores/geo";
  $.ajax({url:API_ENDPOINT+path,error:function(xhr){alert("An error occured: " + xhr.status + " " + xhr.statusText)}, success:function(xhr){console.log(xhr)}})
}

function getStoresBySearch(input){
  let path = "/api/stores/search?q="+input;
  $.ajax({url:API_ENDPOINT+path,error:function(xhr){
    console.log(xhr)
    showError();
  }, success:function(xhr){
    console.log("XHR:",xhr)
    json = xhr
    showResult(json)
  }});
}