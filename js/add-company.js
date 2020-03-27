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