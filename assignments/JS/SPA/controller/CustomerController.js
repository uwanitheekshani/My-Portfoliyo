
 // global scope (Store all the customer records)
 $("#txtCustomerID").focus();
 // $("#txtCusId").focus();

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

    let typedId = $("#inputCusSearch").val();
    let customer = searchCustomer(typedId);
    if (customer != null) {
        setTextfieldValues(customer.id, customer.name, customer.address, customer.contact);
    } else {
        alert("There is no cusotmer available for that " + typedId);
        setTextfieldValues("", "", "", "");
    }

});

 $("#btnCusDelete").click(function () {
     let deleteID = $("#txtCusId").val();

     let option = confirm("Do you really want to delete customer id :" + deleteID);
     if (option){
         if (deleteCustomer(deleteID)) {
             alert("Customer Successfully Deleted..");
             setTextfieldValues("", "", "", "");
         } else {
             alert("No such customer to delete. please check the id");
         }
     }
 });

 $("#btnCusUpdate").click(function () {
     let customerID = $("#txtCusId").val();
     let response = updateCustomer(customerID);
     if (response) {
         alert("Customer Updated Successfully");
         setTextfieldValues("", "", "", "");
     } else {
         alert("Update Failed..!");

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

 function deleteCustomer(customerID) {
     let customer = searchCustomer(customerID);
     if (customer != null) {
         let indexNumber = customers.indexOf(customer);
         customers.splice(indexNumber, 1);
         loadAllCustomers();
         return true;
     } else {
         return false;
     }
 }

 function updateCustomer(customerID) {
     let customer = searchCustomer(customerID);
     if (customer != null) {
         customer.id = $("#txtCusId").val();
         customer.name = $("#txtCusName").val();
         customer.address = $("#txtCusAddress").val();
         customer.salary = $("#txtCusPhone").val();
         loadAllCustomers();
         return true;
     } else {
         return false;
     }

 }


 // customer reguler expressions
 const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
 const cusNameRegEx = /^[A-z ]{5,20}$/;
 const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
 const cusPhoneRegEx = /^07(7|6|8|1|2|5|0|4)-[0-9]{7}$/;

 let customerValidations = [];
 customerValidations.push({reg: cusIDRegEx, field: $('#txtCustomerID'),error:'Customer ID Pattern is Wrong : C00-001'});
 customerValidations.push({reg: cusNameRegEx, field: $('#txtCustomerName'),error:'Customer Name Pattern is Wrong : A-z 5-20'});
 customerValidations.push({reg: cusAddressRegEx, field: $('#txtCustomerAddress'),error:'Customer Address Pattern is Wrong : A-z 0-9 ,/'});
 customerValidations.push({reg: cusPhoneRegEx, field: $('#txtCustomerPhone'),error:'Customer Salary Pattern is Wrong : 07(7|6|8|1|2|5|0|4)-'});


 //disable tab key of all four text fields using grouping selector in CSS
 $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerPhone").on('keydown', function (event) {
     if (event.key == "Tab") {
         event.preventDefault();
     }
 });


 $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerPhone").on('keyup', function (event) {
     checkValidity();
 });

 $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerPhone").on('blur', function (event) {
     checkValidity();
 });


 $("#txtCustomerID").on('keydown', function (event) {
     if (event.key == "Enter" && check(cusIDRegEx, $("#txtCustomerID"))) {
         $("#txtCustomerName").focus();
     } else {
         focusText($("#txtCustomerID"));
     }
 });


 $("#txtCustomerName").on('keydown', function (event) {
     if (event.key == "Enter" && check(cusNameRegEx, $("#txtCustomerName"))) {
         focusText($("#txtCustomerAddress"));
     }
 });


 $("#txtCustomerAddress").on('keydown', function (event) {
     if (event.key == "Enter" && check(cusAddressRegEx, $("#txtCustomerAddress"))) {
         focusText($("#txtCustomerPhone"));
     }
 });


 $("#txtCustomerPhone").on('keydown', function (event) {
     if (event.key == "Enter" && check(cusPhoneRegEx, $("#txtCustomerPhone"))) {
         // let res = confirm("Do you want to add this customer.?");
         // if (res) {
         //     clearAllTexts();
         // }
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
         let res = confirm("Do you want to add this customer.?");
         if (res) {
             clearAllTexts();
         }
     }

     loadAllCustomers();
    bindRowClickEvents();
 });


 function checkValidity() {
     let errorCount=0;
     for (let validation of customerValidations) {
         if (check(validation.reg,validation.field)) {
             textSuccess(validation.field,"");
         } else {
             errorCount=errorCount+1;
             setTextError(validation.field,validation.error);
         }
     }
     setButtonState(errorCount);
 }

 function check(regex, txtField) {
     let inputValue = txtField.val();
     return regex.test(inputValue) ? true : false;
 }

 function setTextError(txtField,error) {
     if (txtField.val().length <= 0) {
         defaultText(txtField,"");
     } else {
         txtField.css('border', '2px solid red');
         txtField.parent().children('span').text(error);
     }
 }

 function textSuccess(txtField,error) {
     if (txtField.val().length <= 0) {
         defaultText(txtField,"");
     } else {
         txtField.css('border', '2px solid green');
         txtField.parent().children('span').text(error);
     }
 }

 function defaultText(txtField,error) {
     txtField.css("border", "1px solid #ced4da");
     txtField.parent().children('span').text(error);
 }

 function focusText(txtField) {
     txtField.focus();
 }

 function setButtonState(value){
     if (value>0){
         $("#btnSaveCus").attr('disabled',true);
     }else{
         $("#btnSaveCus").attr('disabled',false);
     }
 }

 function clearAllTexts() {
     $("#txtCustomerID").focus();
     $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerPhone").val("");
     checkValidity();
 }

 $("#btnCusClear").click(function (){
     $("#txtCusId").focus();
     $("#txtCusId,#txtCusName,#txtCusAddress,#txtCusPhone").val("");
     checkValidity();

 });


