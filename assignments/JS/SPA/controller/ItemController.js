
$("#txtItemCode").focus();

$("#btnSaveItem").click(function () {

    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemPrice = $("#txtItemPrice").val();
    let itemQuantity = $("#txtItemQuantity").val();

    var item = itemObject(itemCode, itemName, itemPrice, itemQuantity);


    //add the customer object to the array
    items.push(item);
    console.log(items);
    loadAllItems();
    clearAllItemTexts();
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
const itemQuantityRegEx = /^[0-9]{1,}$/;

let itemValidations = [];
itemValidations.push({reg: itemIDRegEx, field: $('#txtItemCode'),error:'Item Code Pattern is Wrong : I00-001'});
itemValidations.push({reg: itemNameRegEx, field: $('#txtItemName'),error:'Item Name Pattern is Wrong : A-z 3-20'});
itemValidations.push({reg: itemPriceRegEx, field: $('#txtItemPrice'),error:'Item Price Pattern is Wrong : 0-9 1,/'});
itemValidations.push({reg: itemQuantityRegEx, field: $('#txtItemQuantity'),error:'Item Quantity Pattern is Wrong : 1-9 1,/'});



//disable tab key of all four text fields using grouping selector in CSS
$("#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQuantity").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


$("#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQuantity").on('keyup', function (event) {
    checkItemValidity();
});

$("#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQuantity").on('blur', function (event) {
    checkItemValidity();
});


$("#txtItemCode").on('keydown', function (event) {
    if (event.key == "Enter" && itemCheck(itemIDRegEx, $("#txtItemCode"))) {
        $("#txtItemName").focus();
    } else {
        focusItemText($("#txtItemCode"));
    }
});


$("#txtItemName").on('keydown', function (event) {
    if (event.key == "Enter" && itemCheck(itemNameRegEx, $("#txtItemName"))) {
        focusItemText($("#txtItemPrice"));
    }
});


$("#txtItemPrice").on('keydown', function (event) {
    if (event.key == "Enter" && itemCheck(itemPriceRegEx, $("#txtItemPrice"))) {
        focusItemText($("#txtItemQuantity"));
    }
});


$("#txtItemQuantity").on('keydown', function (event) {
    if (event.key == "Enter" && itemCheck(itemQuantityRegEx, $("#txtItemQuantity"))) {

        let itemCode = $("#txtItemCode").val();
        let itemName = $("#txtItemName").val();
        let itemPrice = $("#txtItemPrice").val();
        let itemQuantity = $("#txtItemQuantity").val();

        var item = itemObject(itemCode, itemName, itemPrice, itemQuantity);

        //add the customer object to the array
        items.push(item);
        console.log(items);
        let res = confirm("Do you want to add this item.?");
        if (res) {
            clearAllItemTexts();
            $("#txtItemCode").focus();
        }
    }

    loadAllItems();
    bindItemRowClickEvents();
});

function checkItemValidity() {
    let errorCount=0;
    for (let validation of itemValidations) {
        if (itemCheck(validation.reg,validation.field)) {
            textItemSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setItemTextError(validation.field,validation.error);
        }
    }
    setItemButtonState(errorCount);
}

function itemCheck(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setItemTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultItemText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}
//
function textItemSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultItemText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}
//
function defaultItemText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}
//
function focusItemText(txtField) {
    txtField.focus();
}

function setItemButtonState(value){
    if (value>0){
        $("#btnSaveItem").attr('disabled',true);
    }else{
        $("#btnSaveItem").attr('disabled',false);
    }
}

function clearAllItemTexts() {
    $("#txtCode").focus();
    $("#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQuantity").val("");
    checkItemValidity();
}

$("#btnItemClear").click(function (){
    $("#txtCode").focus();
    $("#txtCode,#txtName,#txtPrice,#txtQuantity").val("");
    checkItemValidity();

});
