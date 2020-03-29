function setupAddCompany(){
    let hash = window.location.hash; //#id=1

    if(hash){
        var id = hash.match(/id=(.*?)(&|$)/) ? hash.match(/id=(.*?)(&|$)/)[1] : false
        if(id){
            if(id === "-1"){
                return undefined;
            }
            let path = "/api/store/"+id;
            $.ajax({url:API_ENDPOINT+path,error:function(xhr){console.error("An error occured: " + xhr.status + " " + xhr.statusText)}, success:function(xhr){
                console.log(xhr);
                setFormData(xhr.data);
            }});
        }
    }

    addOpeningTime(0,"all",true,"","");
    addOpeningTime(0,"delivery",true,"","");
    addOpeningTime(0,"pickup",true,"","");
}

function openingTimeTemplate(i,type,isFirst,open,close){
    if(isFirst){
        removeButton = ''
    } else {
        removeButton = '<a class="btn removeTime '+type+"-"+i+'"><i class="fa fa-minus" aria-hidden="true"></i></a>'
    }

    template = `
    <div class="row openingHours">
        <div class="col-md-4">
            <select class="custom-select">
              <option value="1" selected>Montag</option>
              <option value="2">Dienstag</option>
              <option value="3">Mittwoch</option>
              <option value="4">Donnerstag</option>
              <option value="5">Freitag</option>
              <option value="6">Samstag</option>
              <option value="7">Sonntag</option>
            </select>
        </div>
          <div class="col-md-3">
            <input id="open-`+type+"-"+i+`" type="text" class="form-control text-center" placeholder="00:00" pattern="[0-2][0-9]:[0-5][0-9]" value="`+open+`">
        </div>
            <div class="col-md-3">
                <input id="close-`+type+"-"+i+`" type="text" class="form-control text-center" placeholder="23:59" pattern="[0-2][0-9]:[0-5][0-9]" value="`+close+`">
            </div>
        <div class="col-md-2">
            <a class="btn addTime `+type+"-"+i+`"><i class="fa fa-plus" aria-hidden="true"></i></a>
            `+removeButton+`
        </div>
    </div>
    `;

    return template;
}

function addOpeningTime(i,type,isFirst,open,close){
    i = i + 1;
    $("#"+type).append(openingTimeTemplate(i,type,isFirst,open,close))
    $("."+type+"-"+i+".btn.addTime").click(function(obj){
        addOpeningTime(i,type,false,"","");
    });
    $("."+type+"-"+i+".btn.removeTime").click(function(obj){
        obj.currentTarget.parentElement.parentElement.remove()
    });
}

function setFormData(data){
    insertValue("#id",data.id);

    insertValue("#name",data.name);
    insertValue("#email",data.email);

    insertValue("#description",data.description);

    insertValue("#firstname",data.firstname);
    insertValue("#lastname",data.lastname);
    insertValue("#phone",data.phone);
    insertValue("#mobile",data.mobile);
    insertValue("#fax",data.fax);
    insertValue("#website",data.website);

    insertValue("#address",data.address);
    insertValue("#postalcode",data.postalcode);
    insertValue("#locality",data.locality);
    
    //Opening Hours
    insertValue("#oh-start-1",getOpeningHoursOpenByDay(data["opening-time"], 1, "all"));
    insertValue("#oh-start-2",getOpeningHoursOpenByDay(data["opening-time"], 2, "all"));
    insertValue("#oh-start-3",getOpeningHoursOpenByDay(data["opening-time"], 3, "all"));
    insertValue("#oh-start-4",getOpeningHoursOpenByDay(data["opening-time"], 4, "all"));
    insertValue("#oh-start-5",getOpeningHoursOpenByDay(data["opening-time"], 5, "all"));
    insertValue("#oh-start-6",getOpeningHoursOpenByDay(data["opening-time"], 6, "all"));
    insertValue("#oh-start-7",getOpeningHoursOpenByDay(data["opening-time"], 7, "all"));
    insertValue("#oh-end-1",getOpeningHoursCloseByDay(data["opening-time"], 1, "all"));
    insertValue("#oh-end-2",getOpeningHoursCloseByDay(data["opening-time"], 2, "all"));
    insertValue("#oh-end-3",getOpeningHoursCloseByDay(data["opening-time"], 3, "all"));
    insertValue("#oh-end-4",getOpeningHoursCloseByDay(data["opening-time"], 4, "all"));
    insertValue("#oh-end-5",getOpeningHoursCloseByDay(data["opening-time"], 5, "all"));
    insertValue("#oh-end-6",getOpeningHoursCloseByDay(data["opening-time"], 6, "all"));
    insertValue("#oh-end-7",getOpeningHoursCloseByDay(data["opening-time"], 7, "all"));
    //Opening Hours
    insertValue("#dh-start-1",getOpeningHoursOpenByDay(data["opening-time"], 1, "delivery"));
    insertValue("#dh-start-2",getOpeningHoursOpenByDay(data["opening-time"], 2, "delivery"));
    insertValue("#dh-start-3",getOpeningHoursOpenByDay(data["opening-time"], 3, "delivery"));
    insertValue("#dh-start-4",getOpeningHoursOpenByDay(data["opening-time"], 4, "delivery"));
    insertValue("#dh-start-5",getOpeningHoursOpenByDay(data["opening-time"], 5, "delivery"));
    insertValue("#dh-start-6",getOpeningHoursOpenByDay(data["opening-time"], 6, "delivery"));
    insertValue("#dh-start-7",getOpeningHoursOpenByDay(data["opening-time"], 7, "delivery"));
    insertValue("#dh-end-1",getOpeningHoursCloseByDay(data["opening-time"], 1, "delivery"));
    insertValue("#dh-end-2",getOpeningHoursCloseByDay(data["opening-time"], 2, "delivery"));
    insertValue("#dh-end-3",getOpeningHoursCloseByDay(data["opening-time"], 3, "delivery"));
    insertValue("#dh-end-4",getOpeningHoursCloseByDay(data["opening-time"], 4, "delivery"));
    insertValue("#dh-end-5",getOpeningHoursCloseByDay(data["opening-time"], 5, "delivery"));
    insertValue("#dh-end-6",getOpeningHoursCloseByDay(data["opening-time"], 6, "delivery"));
    insertValue("#dh-end-7",getOpeningHoursCloseByDay(data["opening-time"], 7, "delivery"));
    //Opening Hours
    insertValue("#ph-start-1",getOpeningHoursOpenByDay(data["opening-time"], 1, "pickup"));
    insertValue("#ph-start-2",getOpeningHoursOpenByDay(data["opening-time"], 2, "pickup"));
    insertValue("#ph-start-3",getOpeningHoursOpenByDay(data["opening-time"], 3, "pickup"));
    insertValue("#ph-start-4",getOpeningHoursOpenByDay(data["opening-time"], 4, "pickup"));
    insertValue("#ph-start-5",getOpeningHoursOpenByDay(data["opening-time"], 5, "pickup"));
    insertValue("#ph-start-6",getOpeningHoursOpenByDay(data["opening-time"], 6, "pickup"));
    insertValue("#ph-start-7",getOpeningHoursOpenByDay(data["opening-time"], 7, "pickup"));
    insertValue("#ph-end-1",getOpeningHoursCloseByDay(data["opening-time"], 1, "pickup"));
    insertValue("#ph-end-2",getOpeningHoursCloseByDay(data["opening-time"], 2, "pickup"));
    insertValue("#ph-end-3",getOpeningHoursCloseByDay(data["opening-time"], 3, "pickup"));
    insertValue("#ph-end-4",getOpeningHoursCloseByDay(data["opening-time"], 4, "pickup"));
    insertValue("#ph-end-5",getOpeningHoursCloseByDay(data["opening-time"], 5, "pickup"));
    insertValue("#ph-end-6",getOpeningHoursCloseByDay(data["opening-time"], 6, "pickup"));
    insertValue("#ph-end-7",getOpeningHoursCloseByDay(data["opening-time"], 7, "pickup"));
    
    insertValue("#website_coupon",data.website_coupon);
    insertValue("#website_crowdfunding",data.website_crowdfunding);

    insertValue("#object", JSON.stringify(data))
}

function insertValue(id,value){
    if(value){
        $(id).val(value)
    }
}

function getFormData(){
    formData = {
        id : $("#id").val(),
        name : $("#name").val(),
        email: $("#email").val(),
        description : $("#description").val(),
        firstname : $("#firstname").val(),
        lastname : $("#lastname").val(),
        phone : $("#phone").val(),
        mobile : $("#mobile").val(),
        fax : $("#fax").val(),
        website : $("#website").val(),
        address : $("#address").val(),
        postalcode : $("#postalcode").val(),
        locality : $("#locality").val(),
        "opening-time" : getOpeningTimeAsArray(),
        website_coupon : $("#website_coupon").val(),
        website_crowdfunding : $("#website_crowdfunding").val(),
        isOwner : $("#isOwner").is(":checked"), 
        agreedLicense : true
    };
    console.log(formData);

    originalObject = $("object").val()
    console.log(originalObject)

    return formData
}



function getOpeningTimeAsArray(){
    var array = [];
    for(var i = 1; i <= 7; i++){
        if($("#oh-start-"+i).val() || $("#oh-close-"+i).val()){
            array.push(getOpenHoursObj(i,"all"))
        }
        if($("#dh-start-"+i).val() || $("#dh-close-"+i).val()){
            array.push(getOpenHoursObj(i,"delivery"))
        }
        if($("#ph-start-"+i).val() || $("#ph-close-"+i).val()){
            array.push(getOpenHoursObj(i,"pickup"))
        }
    }
    return array;
}

function getOpenHoursObj(day,oh_type){
    type_select = "oh";
    if(oh_type === "delivery"){
        type_select = "dh";
    } else if (oh_type === "pickup"){
        type_select = "ph";
    }

    return {
        close: hoursStrToSeconds($("#"+type_select+"-start-"+day).val()),
        //modified: "2020-03-24T15:02:06", //TODO
        open: hoursStrToSeconds($("#"+type_select+"-end-"+day).val()),
        type: oh_type,
        weekday: day
    };
}

function sendFormData(formData){
    $.ajax({
        type: "POST",
        url: API_ENDPOINT+"/api/store/1",
        dataType: "json",
        data: JSON.stringify(formData),
        success: function(xhr){
            console.log(xhr);
        },
        error: function(xhr){
            console.error("An error occured: " + xhr.status + " " + xhr.statusText)
        }
    });
}