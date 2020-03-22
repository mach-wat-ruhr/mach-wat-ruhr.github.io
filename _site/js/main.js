function search(text){
  //Start search request *Wait for Backend*
  json = "";
  return json;
}

function sendToMainSearch(input){
  window.location.assign("/search/#input="+input);
}

function previewModal(){
  
}

window.onload = function(){
  //register click handler
  $("#button-addon-search").click(function(obj){
    value = $("#button-addon-search-input").val()
    if(value !== undefined || value !== ""){
      sendToMainSearch($("#button-addon-search-input").val());
    }
  });
  $("#button-navbar-search").click(function(obj){
    value = $("#button-navbar-search-input").val()
    if(value !== undefined || value !== ""){
      sendToMainSearch($("#button-navbar-search-input").val());
    }
  });
};
