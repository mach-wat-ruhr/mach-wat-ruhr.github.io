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
    insertValue("#oh-start-1",getOpeningHoursOpenByDay(data["opening-time"], 1));
    insertValue("#oh-start-2",getOpeningHoursOpenByDay(data["opening-time"], 2));
    insertValue("#oh-start-3",getOpeningHoursOpenByDay(data["opening-time"], 3));
    insertValue("#oh-start-4",getOpeningHoursOpenByDay(data["opening-time"], 4));
    insertValue("#oh-start-5",getOpeningHoursOpenByDay(data["opening-time"], 5));
    insertValue("#oh-start-6",getOpeningHoursOpenByDay(data["opening-time"], 6));
    insertValue("#oh-start-7",getOpeningHoursOpenByDay(data["opening-time"], 7));
    insertValue("#oh-end-1",getOpeningHoursCloseByDay(data["opening-time"], 1));
    insertValue("#oh-end-2",getOpeningHoursCloseByDay(data["opening-time"], 2));
    insertValue("#oh-end-3",getOpeningHoursCloseByDay(data["opening-time"], 3));
    insertValue("#oh-end-4",getOpeningHoursCloseByDay(data["opening-time"], 4));
    insertValue("#oh-end-5",getOpeningHoursCloseByDay(data["opening-time"], 5));
    insertValue("#oh-end-6",getOpeningHoursCloseByDay(data["opening-time"], 6));
    insertValue("#oh-end-7",getOpeningHoursCloseByDay(data["opening-time"], 7));
    
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
        isOwner : $("#isOwner").is(":checked")
    };
    console.log(formData);
    return formData
}

function getOpeningTimeAsArray(){
    return [];
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