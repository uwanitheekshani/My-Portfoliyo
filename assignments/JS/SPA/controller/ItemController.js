
$("#btnSaveItem").click(function () {

    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemPrice = $("#txtItemPrice").val();
    let itemQuantity = $("#txtItemQuantity").val();


    var itemObject = {
        id: itemCode,
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity
    }

    //add the customer object to the array
    items.push(itemObject);
    console.log(items);
    loadAllItems();
    bindRowClickEvents();
});

$("#btnViewAllItems").click(function (){
    loadAllItems();
});

//load all customers
function loadAllItems(){

    $("#tblItem").empty();

    for(var item of items){
        console.log(item);

        var row= `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.price}</td><td>${item.quantity}</td></tr>`;

        $("#tblItem").append(row);
    }
}

function bindRowClickEvents() {
    $("#tblItem>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let price = $(this).children(":eq(2)").text();
        let quantity = $(this).children(":eq(3)").text();

        //setting table details values to text fields
        $('#txtCode').val(id);
        $('#txtName').val(name);
        $('#txtPrice').val(price);
        $('#txtQuantity').val(quantity);

    });
}

$("#btnItemSearch").click(function (){

    for (let itemKey of items){

        if (itemKey.id===$('#inputItemSearch').val()){
            $('#txtCode').val(itemKey.id);
            $('#txtName').val(itemKey.name);
            $('#txtPrice').val(itemKey.price);
            $('#txtQuantity').val(itemKey.quantity);
        }
        else if (itemKey.name===$('#inputItemSearch').val()){
            $('#txtCode').val(itemKey.id);
            $('#txtName').val(itemKey.name);
            $('#txtPrice').val(itemKey.price);
            $('#txtQuantity').val(itemKey.quantity);
        }
    }

});