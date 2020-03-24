function sendToMainSearch(input){
  window.location.assign("/search/#input="+input);
}

function setupSingleView(){
  let hash = window.location.hash; //#id=1
  if(hash){
    var id = hash.match(/id=(.*?)(&|$)/) ? hash.match(/id=(.*?)(&|$)/)[1] : false
    if(id){
      $("#cardbox").html(getCompanyCardById(id));
    }
  }
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

  //Load content in single view
  setupSingleView()
};
