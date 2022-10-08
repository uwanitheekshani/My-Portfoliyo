
 // global scope (Store all the customer records)

$("#btnSaveCus").click(function () {

    let customerID = $("#txtCustomerID").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerPhone = $("#txtCustomerPhone").val();

    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        contact: customerPhone
    }

    //add the customer object to the array
    customers.push(customerObject);
    console.log(customers);
    loadAllCustomers();
    bindRowClickEvents();
});

$("#btnViewAllCustomers").click(function (){
    loadAllCustomers();
});

//load all customers
function loadAllCustomers(){

    $("#tblCustomer").empty();

    for(var customer of customers){
        console.log(customer);

        var row= `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;

        $("#tblCustomer").append(row);
    }
}

function bindRowClickEvents() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let phone = $(this).children(":eq(3)").text();

        //setting table details values to text fields
        $('#txtCusId').val(id);
        $('#txtCusName').val(name);
        $('#txtCusAddress').val(address);
        $('#txtCusPhone').val(phone);

    });
}

$("#btnSearch").click(function (){

    // for (let customerKey of customers){
    //
    //     if (customerKey.id===$('#inputCusSearch').val()){
    //         $('#txtCusId').val(customerKey.id);
    //         $('#txtCusName').val(customerKey.name);
    //         $('#txtCusAddress').val(customerKey.address);
    //         $('#txtCusPhone').val(customerKey.contact);
    //     }
    //     else if (customerKey.name===$('#inputCusSearch').val()){
    //         $('#txtCusId').val(customerKey.id);
    //         $('#txtCusName').val(customerKey.name);
    //         $('#txtCusAddress').val(customerKey.address);
    //         $('#txtCusPhone').val(customerKey.contact);
    //     }
    // }

    let typedId = $("#inputCusSearch").val();
    let customer = searchCustomer(typedId);
    if (customer != null) {
        setTextfieldValues(customer.id, customer.name, customer.address, customer.contact);
    } else {
        alert("There is no cusotmer available for that " + typedId);
        setTextfieldValues("", "", "", "");
    }

});

$("#txtCusId").on('keyup', function (event) {
    if (event.code == "Enter") {
        let typedId = $("#txtCusId").val();
        let customer = searchCustomer(typedId);
        if (customer != null) {
            setTextfieldValues(customer.id, customer.name, customer.address, customer.contact);
        } else {
            alert("There is no cusotmer available for that " + typedId);
            setTextfieldValues("", "", "", "");
        }
    }
});

function setTextfieldValues(id, name, address, contact) {
    $("#txtCusId").val(id);
    $("#txtCusName").val(name);
    $("#txtCusAddress").val(address);
    $("#txtCusPhone").val(contact);
}


function searchCustomer(cusID) {
    for (let customer of customers) {
        if (customer.id == cusID) {
            return customer;
        }
    }
    return null;
}


// ===================================================================


$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerPhone").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});


$("#txtCustomerID").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#txtCustomerName").focus();
    }
});

$("#txtCustomerName").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#txtCustomerAddress").focus();
    }
});

$("#txtCustomerAddress").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#txtCustomerPhone").focus();
    }
});

$("#txtCustomerPhone").on('keydown', function (event) {
    if (event.key == "Enter") {
        $("#btnSaveCus").focus();
    }
});

$("#btnSaveCus").on('keydown', function (event) {
    if (event.key == "Enter") {
        let customerID = $("#txtCustomerID").val();
        let customerName = $("#txtCustomerName").val();
        let customerAddress = $("#txtCustomerAddress").val();
        let customerPhone = $("#txtCustomerPhone").val();

        var customerObject = {
            id: customerID,
            name: customerName,
            address: customerAddress,
            contact: customerPhone
        }

        //add the customer object to the array
        customers.push(customerObject);
        console.log(customers);
    }
    loadAllCustomers();
    bindRowClickEvents();
});