
$("#btnSaveItem").click(function () {

    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemPrice = $("#txtItemPrice").val();
    let itemQuantity = $("#txtItemQuantity").val();

    var item = customerObject(itemCode, itemName, itemPrice, itemQuantity);


    //add the customer object to the array
    items.push(item);
    console.log(items);
    loadAllItems();
    bindItemRowClickEvents();
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

function bindItemRowClickEvents() {
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


$("#tblItem>tr").on('dblclick', function () {
    $(this).remove();
});

// $("#btnItemSearch").click(function (){
//
//     for (let itemKey of items){
//
//         if (itemKey.id===$('#inputItemSearch').val()){
//             $('#txtCode').val(itemKey.id);
//             $('#txtName').val(itemKey.name);
//             $('#txtPrice').val(itemKey.price);
//             $('#txtQuantity').val(itemKey.quantity);
//         }
//         else if (itemKey.name===$('#inputItemSearch').val()){
//             $('#txtCode').val(itemKey.id);
//             $('#txtName').val(itemKey.name);
//             $('#txtPrice').val(itemKey.price);
//             $('#txtQuantity').val(itemKey.quantity);
//         }
//     }
//
// });


$("#btnItemSearch").click(function (){

    let typedId = $("#inputItemSearch").val();
    let item = searchItem(typedId);
    if (item != null) {
        setItemTextfieldValues(item.id, item.name, item.price, item.quantity);
    } else {
        alert("There is no item available for that " + typedId);
        setItemTextfieldValues("", "", "", "");
    }

});

$("#btnItemDelete").click(function () {
    let deleteID = $("#txtCode").val();

    let option = confirm("Do you really want to delete item code :" + deleteID);
    if (option){
        if (deleteItem(deleteID)) {
            alert("Item Successfully Deleted..");
            setItemTextfieldValues("", "", "", "");
        } else {
            alert("No such item to delete. please check the id");
        }
    }
});

$("#btnItemUpdate").click(function () {
    let itemID = $("#txtCode").val();
    let response = updateItem(itemID);
    if (response) {
        alert("Item Updated Successfully");
        setItemTextfieldValues("", "", "", "");
    } else {
        alert("Update Failed..!");

    }
});

$("#txtCode").on('keyup', function (event) {
    if (event.code == "Enter") {
        let typedId = $("#txtCode").val();
        let item = searchItem(typedId);
        if (item != null) {
            setItemTextfieldValues(item.id, item.name, item.price, item.quantity);
        } else {
            alert("There is no item available for that " + typedId);
            setItemTextfieldValues("", "", "", "");
        }
    }
});

function setItemTextfieldValues(id, name, price, quantity) {
    $("#txtCode").val(id);
    $("#txtName").val(name);
    $("#txtPrice").val(price);
    $("#txtQuantity").val(quantity);
}


function searchItem(itemCode) {
    for (let item of items) {
        if (item.id == itemCode) {
            return item;
        }
    }
    return null;
}

function deleteItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        let indexNumber = items.indexOf(item);
        items.splice(indexNumber, 1);
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

function updateItem(itemID) {
    let item = searchItem(itemID);
    if (item != null) {
        item.id = $("#txtCode").val();
        item.name = $("#txtName").val();
        item.price = $("#txtPrice").val();
        item.quantity = $("#txtQuantity").val();
        loadAllItems();
        return true;
    } else {
        return false;
    }

}

// item reguler expressions
const itemIDRegEx = /^(I00-)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{3,20}$/;
const itemPriceRegEx = /^[0-9]{1,}$/;
const itemQuantityRegEx = /^[1-9]{1,}$/;

let itemValidations = [];
itemValidations.push({reg: itemIDRegEx, field: $('#txtItemCode'),error:'Item Code Pattern is Wrong : I00-001'});
itemValidations.push({reg: itemNameRegEx, field: $('#txtItemName'),error:'Item Name Pattern is Wrong : A-z 3-20'});
itemValidations.push({reg: itemPriceRegEx, field: $('#txtItemPrice'),error:'Customer Address Pattern is Wrong : A-z 0-9 ,/'});
itemValidations.push({reg: itemQuantityRegEx, field: $('#txtItemQuantity'),error:'Customer Salary Pattern is Wrong : 07(7|6|8|1|2|5|0|4)-'});