function sendToMainSearch(input){
  window.location.assign("/search/#input="+input);
  setupSearch();
}

function setupSearch(){
  let hash = $(location).attr('hash')
  let input = hash.substring(hash.indexOf("input=")+6);
  let search = $("#search").val(input);
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

}
