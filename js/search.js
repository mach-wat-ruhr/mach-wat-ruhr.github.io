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