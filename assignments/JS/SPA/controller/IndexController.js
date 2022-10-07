
$("#customerContent").css('display','none');
$("#itemContent").css('display','none');
$("#orderContent").css('display','none');

$("#home").click(function(){
    $("#customerContent").css('display','none');
    $("#dashboardContent").css('display','block');
    $("#itemContent").css('display','none');
    $("#orderContent").css('display','none');
});

$("#cus").click(function(){
    $("#customerContent").css('display','block');
    $("#dashboardContent").css('display','none');
    $("#itemContent").css('display','none');
    $("#orderContent").css('display','none');
});

$("#item2").click(function(){
    $("#customerContent").css('display','none');
    $("#dashboardContent").css('display','none');
    $("#itemContent").css('display','block');
    $("#orderContent").css('display','none');
});

$("#orders").click(function(){
    $("#customerContent").css('display','none');
    $("#dashboardContent").css('display','none');
    $("#itemContent").css('display','none');
    $("#orderContent").css('display','block');
});