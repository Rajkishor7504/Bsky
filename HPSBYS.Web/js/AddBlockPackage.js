﻿function ValidateFile(cntr, strText) {

    var strValue = $('#' + cntr).get(0).files.length;
    if (strValue == "0") {
        alert("Please upload " + strText);
        return false;
    }
    else
        return true;
}

function CheckFileType(cntr, ftype) {

    // Get the file upload control file extension
    var extn = $('#' + cntr).val().split('.').pop().toLowerCase();
    if (extn != '') {

        // Create array with the files extensions to upload
        var fileListToUpload;
        if (parseInt(ftype) == 1)
            fileListToUpload = new Array('pdf', 'jpg', 'jpeg');
        else if (parseInt(ftype) == 2)
            fileListToUpload = new Array('gif', 'jpg', 'jpeg');
        else
            fileListToUpload = new Array('pdf');

        //Check the file extension is in the array.
        var isValidFile = $.inArray(extn, fileListToUpload);

        // isValidFile gets the value -1 if the file extension is not in the list.
        if (isValidFile == -1) {
            if (parseInt(ftype) == 1) {
                alert('Please upload a valid document of type pdf/jpg/jpeg.!!!');
                $('#' + cntr).replaceWith($('#' + cntr).val('').clone(true));
            }
            else if (parseInt(ftype) == 2) {
                alert('Please upload a valid document of type gif/jpg/jpeg.!!!');
                $('#' + cntr).replaceWith($('#' + cntr).val('').clone(true));
            }
            else {
                alert('Please Upload a valid document !!!');
                $('#' + cntr).replaceWith($('#' + cntr).val('').clone(true));
            }
        }
        else {
            // Restrict the file size to 2MB(1024 * 2048;)
            if ($('#' + cntr).get(0).files[0].size > (200000)) {
                alert('Document size should not exceed 200KB.!!!');
                $('#' + cntr).replaceWith($('#' + cntr).val('').clone(true));
            }
            if ($('#' + cntr).get(0).files[0].name.length > 100) {
                alert('Document Name should be maximum 100 Characters !!!');
                $('#' + cntr).replaceWith($('#' + cntr).val('').clone(true));
            }
            else
                return true;
        }
    }
    else
        return true;
}

function ValidatePackage() {
    if ($('#blockingDt').val() == "") {
        alert('Please Enter Blocking Date!!');
        $('#blockingDt').focus();
        return false;
    }
    else if ($('#PApackageHeader').val() == 0) {
        alert('Please Select Package Header!!');
        $('#PApackageHeader').focus();
        return false;
    }
    else if ($('#PApackageSubPackageDetail').val() == 0) {
        alert('Please Select Category Detail!!');
        $('#PApackageSubPackageDetail').focus();
        return false;
    }
    else if ($('#PApackageDetail').val() == 0) {
        alert('Please Select Package Detail!!');
        $('#PApackageDetail').focus();
        return false;
    }
    else if ($('#ddlWardDtls').val() == 0) {
        alert('Please select Word Detail!!');
        $('#ddlWardDtls').focus();
        return false;
    }
    else if ($('#PAtreatmentCost').val() == "") {
        alert('Please Enter Treatment Cost!!');
        $('#PAtreatmentCost').focus();
        return false;
    }
    else if ($('#AuthStatus').text() == 'Y') {
        if ($('#DocFile').val() == "") {
            alert('Please Choose Document!!');
            $('#DocFile').focus();
            return false;
        }
        else {
            return true;

        }
    }
    else {
        return true;
    }
}

function ValidatePackageMtoM() {
    if ($('#blockingDt').val() == "") {
        alert('Please Enter Blocking Date!!');
        $('#blockingDt').focus();
        return false;
    }
    else if ($('#PApackageHeader').val() == 0) {
        alert('Please Select Package Header!!');
        $('#PApackageHeader').focus();
        return false;
    }
    else if ($('#PApackageSubPackageDetail').val() == 0) {
        alert('Please Select Category Detail!!');
        $('#PApackageSubPackageDetail').focus();
        return false;
    }
    else if ($('#PApackageDetail').val() == 0) {
        alert('Please Select Package Detail!!');
        $('#PApackageDetail').focus();
        return false;
    }
    else if ($('#ddlWardDtls').val() == 0) {
        alert('Please select Word Detail!!');
        $('#ddlWardDtls').focus();
        return false;
    }
    else if ($('#PAtreatmentCost').val() == "") {
        alert('Please Enter Treatment Cost!!');
        $('#PAtreatmentCost').focus();
        return false;
    }
    else if ($('#DocFile').val() == "") {
        alert('Please Choose Document!!');
        $('#DocFile').focus();
        return false;
    }

    else {
        return true;
    }
}
function checkDec(evt) {
    if (!(evt.keyCode == 46 || (evt.keyCode >= 48 && evt.keyCode <= 57))) return false;
    var parts = evt.srcElement.value.split('.');
    if (parts.length > 2) return false;
    if (evt.keyCode == 46) return (parts.length == 1);
    if (parts[0].length >= 14) return false;
    if (parts.length == 2 && parts[1].length >= 2) return false;
}

function checkChar(event) {
    var inputValue = event.which;
    // allow letters and whitespaces only.
    if (!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) {
        event.preventDefault();
    }
}

function clearUnSpecified() {
    // $('#blockingDt').val('');
    $('#USPackageHeader').val('');
    $('#USPackageDetail').val('');
    $('#USTreatmentCost').val('');
}

function clearPreApproved() {
    //$('#blockingDt').val('');
    $('#PApackageHeader').val(0);
    $('#PApackageDetail').find('option').remove();
    $('#PApackageSubPackageDetail').find('option').remove();
    $('#ddlWardDtls').find('option').remove();
    $('#PAtreatmentCost').val('');
    //$('#DocFile').val('');
}

function checkconfirm() {
    if (window.confirm("Are you sure to block the package?")) {
        return true;
    }
    else {
        return false;
    }
}

function checkconfirmReq() {
    if (window.confirm("Are you sure for request package?")) {
        return true;
    }
    else {
        return false;
    }
}

function AllowBlockPackage() {
    if (ValidatePackage()) {
        $('#CurBlkHeader').show();
        $('#jsGrid').show();
        var BlockAmnt;
        var cost = $('#PAtreatmentCost').val();
        if (arrPrevPackageInfo.length > 0) {
            if (arrPrevPackageInfo.length == 1 && arrPrevPackageInfo[0].IsMedSergical == 'S') {
                BlockAmnt = (parseInt(cost) / 2);
                if (parseInt(BlockAmnt) > parseInt($('#AvlCover').text())) {
                    alert('Block Amount is more than Available Cover !!');
                }
                arrPackageInfo = [];
                arrPackageInfo.push({
                    ProcedureCode: $('#PApackageHeader').val(),
                    Procedure: $("option:selected", $("#PApackageHeader")).text(),
                    Package: $("option:selected", $("#PApackageDetail")).text(),
                    Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                    CategoryCode: $('#PApackageSubPackageDetail').val(),
                    PackageCode: $('#PApackageDetail').val(),
                    Days: $('#Days').text(),
                    AmountBlocked: BlockAmnt,
                    Type: $('#MedSer').text(),
                    PackageCost: $('#PackageCost').text(),
                    InvoiceNo: $('#invNo').text(),
                    BlockingDate: $('#blockingDt').val()
                });
            }
            else if (arrPrevPackageInfo.length == 2) {
                BlockAmnt = (parseInt(cost) / 4);
                if (parseInt(BlockAmnt) > parseInt($('#AvlCover').text())) {
                    alert('Block Amount is more than Available Cover !!');
                }
                arrPackageInfo = [];
                arrPackageInfo.push({
                    ProcedureCode: $('#PApackageHeader').val(),
                    Procedure: $("option:selected", $("#PApackageHeader")).text(),
                    Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                    CategoryCode: $('#PApackageSubPackageDetail').val(),
                    Package: $("option:selected", $("#PApackageDetail")).text(),
                    PackageCode: $('#PApackageDetail').val(),
                    Days: $('#Days').text(),
                    AmountBlocked: (parseInt(cost) / 4),
                    Type: $('#MedSer').text(),
                    PackageCost: $('#PackageCost').text(),
                    InvoiceNo: $('#invNo').text(),
                    BlockingDate: $('#blockingDt').val()
                });
            }
            else {
                if (parseInt(cost) > parseInt($('#AvlCover').text())) {
                    alert('Block Amount is more than Available Cover !!');
                }
                if ($("#divWardDtls").css('visibility') == 'visible') {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageWard: $("#ddlWardDtls").val(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: $('#PAtreatmentCost').val(),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }
                else {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: $('#PAtreatmentCost').val(),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }

            }
        }
        else {
            if (parseInt(cost) > parseInt($('#AvlCover').text())) {
                alert('Block Amount is more than Available Cover !!');
            }
            if ($("#divWardDtls").css('visibility') === 'visible') {
                arrPackageInfo = [];
                arrPackageInfo.push({
                    ProcedureCode: $('#PApackageHeader').val(),
                    Procedure: $("option:selected", $("#PApackageHeader")).text(),
                    Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                    CategoryCode: $('#PApackageSubPackageDetail').val(),
                    Package: $("option:selected", $("#PApackageDetail")).text(),
                    PackageWard: $("#ddlWardDtls").val(),
                    PackageCode: $('#PApackageDetail').val(),
                    Days: $('#Days').text(),
                    AmountBlocked: $('#PAtreatmentCost').val(),
                    Type: $('#MedSer').text(),
                    PackageCost: $('#PackageCost').text(),
                    InvoiceNo: $('#invNo').text(),
                    BlockingDate: $('#blockingDt').val()
                });
            }
            else {
                arrPackageInfo = [];
                arrPackageInfo.push({
                    ProcedureCode: $('#PApackageHeader').val(),
                    Procedure: $("option:selected", $("#PApackageHeader")).text(),
                    Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                    CategoryCode: $('#PApackageSubPackageDetail').val(),
                    Package: $("option:selected", $("#PApackageDetail")).text(),
                    PackageCode: $('#PApackageDetail').val(),
                    Days: $('#Days').text(),
                    AmountBlocked: $('#PAtreatmentCost').val(),
                    Type: $('#MedSer').text(),
                    PackageCost: $('#PackageCost').text(),
                    InvoiceNo: $('#invNo').text(),
                    BlockingDate: $('#blockingDt').val()
                });
            }
        }
        $('#jsGrid').jsGrid({
            height: "auto",
            width: "100%",
            sorting: true,
            paging: true,
            pageSize: 10,
            deleteConfirm: "Do you really want to delete the Package?",
            autoload: true,
            controller: {
                loadData: function () {
                    var d = $.Deferred();
                    d.resolve(arrPackageInfo);
                    return d.promise();
                },
                deleteItem: function (deletingClient) {
                    var clientIndex = $.inArray(deletingClient, arrPackageInfo);
                    arrPackageInfo.splice(clientIndex, 1);
                }
            },
            fields:
                [{ name: "Procedure", type: "text", title: "Procedure", align: "center" },
                { name: "PackageWard", title: "PackageWard", type: "hidden", align: "center", visible: false },
                { name: "Category", title: "Category", type: "text", align: "center" },
                { name: "CategoryCode", title: "Category Code", type: "text", align: "center", visible: false },
                { name: "Package", title: "Package", type: "text", align: "center" },
                { name: "PackageCode", title: "Package Code", type: "number", align: "center" },
                { name: "Days", title: "Days", type: "number", align: "center" },
                { name: "PackageCost", title: "Package Cost(Rs.)", type: "text", align: "center" },
                { name: "AmountBlocked", title: "Amount Blocked(Rs.)", type: "text", align: "center" },
                { name: "Type", title: "Type", type: "text", align: "center" },
                { name: "InvoiceNo", title: "Invoice No", type: "text", align: "center" },
                { name: "BlockingDate", title: "Blocking Date", type: "text", align: "center" },
                {
                    type: "control", title: "Remove", editButton: false, headerTemplate: function () {
                        return $("<div>").prop("title", "Remove").text("Remove");
                    }
                }]
        });
        clearUnSpecified();
        clearPreApproved();
        if ($('#AuthStatus').text() == 'Y') {
            $("#btnBlock").prop('value', 'Request');
        }
        else {
            $("#btnBlock").prop('value', 'Block');
        }
        $('#btnBlock').css('visibility', 'visible');
    }
}

function AddPackage_PackageChange() {
    //AllowBlockPackage();
    if (ValidatePackage()) {
        if (arrPrevPackageInfo.length > 0) {
            //    if (arrPrevPackageInfo.length == 1 && arrPrevPackageInfo[0].IsMedSergical == 'M') {
            //        alert('Already Medical Package Blocked!!');
            //        // AllowBlockPackage();                      //Modified by Smruti Ranjan Bisal 19/08/2020
            //    }
            //    else if (arrPrevPackageInfo.length == 1 && arrPrevPackageInfo[0].IsMedSergical == 'S' && $('#MedSer').text() == 'S') {
            //        if (arrPrevPackageInfo[0].procedureCode === $("option:selected", $("#PApackageHeader")).val() && arrPrevPackageInfo[0].PackageCode === $("option:selected", $("#PApackageDetail")).val()) {
            //            alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
            //        }
            //        else {
            //            AllowBlockPackage();
            //        }
            //    }
            //    else if (arrPrevPackageInfo.length == 2 && $('#MedSer').text() == 'S') {
            //        if (arrPrevPackageInfo[0].procedureCode === $("option:selected", $("#PApackageHeader")).val() && arrPrevPackageInfo[0].PackageCode === $("option:selected", $("#PApackageDetail")).val()) {
            //            alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
            //        }
            //        else if (arrPrevPackageInfo[1].procedureCode === $("option:selected", $("#PApackageHeader")).val() && arrPrevPackageInfo[1].PackageCode === $("option:selected", $("#PApackageDetail")).val()) {
            //            alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
            //        }
            //        else {
            //            AllowBlockPackage();
            //        }

            //    }
            //    else {
            //        alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
            //    }
            //}
            //else {
            if (arrPrevPackageInfo[0].procedureCode === $("option:selected", $("#PApackageHeader")).val() && arrPrevPackageInfo[0].PackageCode === $("option:selected", $("#PApackageDetail")).val()) {
                alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
            }
            else {
                AllowBlockPackage_PackageChange();
            }
        }
    }
}
function AllowBlockPackage_PackageChange() {
    if (ValidatePackage()) {
        $('#CurBlkHeader').show();
        $('#jsGrid').show();
        var BlockAmnt;
        var cost = $('#PAtreatmentCost').val();
        if (arrPrevPackageInfo.length > 0) {
            if (arrPrevPackageInfo.length == 1 && arrPrevPackageInfo[0].IsMedSergical == 'S') {
                BlockAmnt = (parseInt(cost) / 2);
                if (parseInt(BlockAmnt) > parseInt($('#AvlCover').text())) {
                    alert('Block Amount is more than Available Cover !!');
                }
                if ($("#divWardDtls").css('visibility') == 'visible') {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageWard: $("#ddlWardDtls").val(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: $('#PAtreatmentCost').val(),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }
                else {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: BlockAmnt,
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }

            }
            else if (arrPrevPackageInfo.length == 2) {
                BlockAmnt = (parseInt(cost) / 4);
                if (parseInt(BlockAmnt) > parseInt($('#AvlCover').text())) {
                    alert('Block Amount is more than Available Cover !!');
                }
                if ($("#divWardDtls").css('visibility') == 'visible') {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageWard: $("#ddlWardDtls").val(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: $('#PAtreatmentCost').val(),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }
                else {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: (parseInt(cost) / 4),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }

            }
            else {
                if (parseInt(cost) > parseInt($('#AvlCover').text())) {
                    alert('Block Amount is more than Available Cover !!');
                }
                if ($("#divWardDtls").css('visibility') == 'visible') {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageWard: $("#ddlWardDtls").val(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: $('#PAtreatmentCost').val(),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }
                else {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: $('#PAtreatmentCost').val(),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }

            }
        }
        else {
            if (parseInt(cost) > parseInt($('#AvlCover').text())) {
                alert('Block Amount is more than Available Cover !!');
            }
            if ($("#divWardDtls").css('visibility') === 'visible') {
                arrPackageInfo = [];
                arrPackageInfo.push({
                    ProcedureCode: $('#PApackageHeader').val(),
                    Procedure: $("option:selected", $("#PApackageHeader")).text(),
                    Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                    CategoryCode: $('#PApackageSubPackageDetail').val(),
                    Package: $("option:selected", $("#PApackageDetail")).text(),
                    PackageWard: $("#ddlWardDtls").val(),
                    PackageCode: $('#PApackageDetail').val(),
                    Days: $('#Days').text(),
                    AmountBlocked: $('#PAtreatmentCost').val(),
                    Type: $('#MedSer').text(),
                    PackageCost: $('#PackageCost').text(),
                    InvoiceNo: $('#invNo').text(),
                    BlockingDate: $('#blockingDt').val()
                });
            }
            else {
                arrPackageInfo = [];
                arrPackageInfo.push({
                    ProcedureCode: $('#PApackageHeader').val(),
                    Procedure: $("option:selected", $("#PApackageHeader")).text(),
                    Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                    CategoryCode: $('#PApackageSubPackageDetail').val(),
                    Package: $("option:selected", $("#PApackageDetail")).text(),
                    PackageCode: $('#PApackageDetail').val(),
                    Days: $('#Days').text(),
                    AmountBlocked: $('#PAtreatmentCost').val(),
                    Type: $('#MedSer').text(),
                    PackageCost: $('#PackageCost').text(),
                    InvoiceNo: $('#invNo').text(),
                    BlockingDate: $('#blockingDt').val()
                });
            }
        }
        $('#jsGrid').jsGrid({
            height: "auto",
            width: "100%",
            sorting: true,
            paging: true,
            pageSize: 10,
            deleteConfirm: "Do you really want to delete the Package?",
            autoload: true,
            controller: {
                loadData: function () {
                    var d = $.Deferred();
                    d.resolve(arrPackageInfo);
                    return d.promise();
                },
                deleteItem: function (deletingClient) {
                    var clientIndex = $.inArray(deletingClient, arrPackageInfo);
                    arrPackageInfo.splice(clientIndex, 1);
                }
            },
            fields:
                [{ name: "Procedure", type: "text", title: "Procedure", align: "center" },
                { name: "PackageWard", title: "PackageWard", type: "hidden", align: "center", visible: false },
                { name: "Category", title: "Category", type: "text", align: "center" },
                { name: "CategoryCode", title: "Category Code", type: "text", align: "center", visible: false },
                { name: "Package", title: "Package", type: "text", align: "center" },
                { name: "PackageCode", title: "Package Code", type: "number", align: "center" },
                { name: "Days", title: "Days", type: "number", align: "center" },
                { name: "PackageCost", title: "Package Cost(Rs.)", type: "text", align: "center" },
                { name: "AmountBlocked", title: "Amount Blocked(Rs.)", type: "text", align: "center" },
                { name: "Type", title: "Type", type: "text", align: "center" },
                { name: "InvoiceNo", title: "Invoice No", type: "text", align: "center" },
                { name: "BlockingDate", title: "Blocking Date", type: "text", align: "center" },
                {
                    type: "control", title: "Remove", editButton: false, headerTemplate: function () {
                        return $("<div>").prop("title", "Remove").text("Remove");
                    }
                }]
        });
        clearUnSpecified();
        clearPreApproved();
        if ($('#AuthStatus').text() == 'Y') {
            $("#btnBlock").prop('value', 'Request');
        }
        else {
            $("#btnBlock").prop('value', 'Block');
        }
        $('#btnBlock').css('visibility', 'visible');
    }
}
function AddPackage() {
    //AllowBlockPackage();
    if (ValidatePackage()) {
        if (arrPrevPackageInfo.length > 0) {
            if (arrPrevPackageInfo.length == 1 && arrPrevPackageInfo[0].IsMedSergical == 'M') {
                alert('Already Medical Package Blocked!!');
                // AllowBlockPackage();                      //Modified by Smruti Ranjan Bisal 19/08/2020
            }
            else if (arrPrevPackageInfo.length == 1 && arrPrevPackageInfo[0].IsMedSergical == 'S' && $('#MedSer').text() == 'S') {
                if (arrPrevPackageInfo[0].procedureCode === $("option:selected", $("#PApackageHeader")).val() && arrPrevPackageInfo[0].PackageCode === $("option:selected", $("#PApackageDetail")).val()) {
                    alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
                }
                else {
                    AllowBlockPackage();
                }
            }
            else if (arrPrevPackageInfo.length == 2 && $('#MedSer').text() == 'S') {
                if (arrPrevPackageInfo[0].procedureCode === $("option:selected", $("#PApackageHeader")).val() && arrPrevPackageInfo[0].PackageCode === $("option:selected", $("#PApackageDetail")).val()) {
                    alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
                }
                else if (arrPrevPackageInfo[1].procedureCode === $("option:selected", $("#PApackageHeader")).val() && arrPrevPackageInfo[1].PackageCode === $("option:selected", $("#PApackageDetail")).val()) {
                    alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
                }
                else {
                    AllowBlockPackage();
                }

            }
            else {
                alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
            }
        }
        else {
            AllowBlockPackage();
        }
    }
}

function AddPackage_Ward() {
    var count = 0;
    if (ValidatePackage()) {
        if (arrPrevPackageInfo.length > 0) {
            for (var i = 0; i < arrPrevPackageInfo.length; i++) {
                if (arrPrevPackageInfo[i].WardId == $('#ddlWardDtls').val()) {
                    count++;
                }
            }
            if (count > 0) {
                alert('Cannot Change Ward. Please Check Current Ward Details!!');
            }

            else {
                AllowBlockPackage_Ward();
            }
        }
    }
}

function AllowBlockPackage_Ward() {
    if (parseInt($('#WardLvl').text()) > parseInt($('#hfSelWardLvl').text())) {
        $('#AuthStatus').text('Y')
    }
    if (ValidatePackage()) {
        $('#CurBlkHeader').show();
        $('#jsGrid').show();
        var BlockAmnt;
        var cost = $('#PAtreatmentCost').val();
        if (arrPrevPackageInfo.length > 0) {
            if (arrPrevPackageInfo.length == 1 && arrPrevPackageInfo[0].IsMedSergical == 'S') {
                BlockAmnt = (parseInt(cost) / 2);
                if (parseInt(BlockAmnt) > parseInt($('#AvlCover').text())) {
                    alert('Block Amount is more than Available Cover !!');
                }
                arrPackageInfo = [];
                arrPackageInfo.push({
                    ProcedureCode: $('#PApackageHeader').val(),
                    Procedure: $("option:selected", $("#PApackageHeader")).text(),
                    Package: $("option:selected", $("#PApackageDetail")).text(),
                    Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                    CategoryCode: $('#PApackageSubPackageDetail').val(),
                    PackageCode: $('#PApackageDetail').val(),
                    Ward: $("option:selected", $("#ddlWardDtls")).text(),
                    WardId: $("option:selected", $("#ddlWardDtls")).val(),
                    Days: $('#Days').text(),
                    AmountBlocked: BlockAmnt,
                    Type: $('#MedSer').text(),
                    PackageCost: $('#PackageCost').text(),
                    InvoiceNo: $('#invNo').text(),
                    BlockingDate: $('#blockingDt').val()
                });
            }
            else if (arrPrevPackageInfo.length == 2) {
                BlockAmnt = (parseInt(cost) / 4);
                if (parseInt(BlockAmnt) > parseInt($('#AvlCover').text())) {
                    alert('Block Amount is more than Available Cover !!');
                }
                arrPackageInfo = [];
                arrPackageInfo.push({
                    ProcedureCode: $('#PApackageHeader').val(),
                    Procedure: $("option:selected", $("#PApackageHeader")).text(),
                    Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                    CategoryCode: $('#PApackageSubPackageDetail').val(),
                    Package: $("option:selected", $("#PApackageDetail")).text(),
                    PackageCode: $('#PApackageDetail').val(),
                    Ward: $("option:selected", $("#ddlWardDtls")).text(),
                    WardId: $("option:selected", $("#ddlWardDtls")).val(),
                    Days: $('#Days').text(),
                    AmountBlocked: (parseInt(cost) / 4),
                    Type: $('#MedSer').text(),
                    PackageCost: $('#PackageCost').text(),
                    InvoiceNo: $('#invNo').text(),
                    BlockingDate: $('#blockingDt').val()
                });
            }
            else {
                if (parseInt(cost) > parseInt($('#AvlCover').text())) {
                    alert('Block Amount is more than Available Cover !!');
                }
                if ($("#divWardDtls").css('visibility') == 'visible') {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageWard: $("#ddlWardDtls").val(),
                        PackageCode: $('#PApackageDetail').val(),
                        Ward: $("option:selected", $("#ddlWardDtls")).text(),
                        WardId: $("option:selected", $("#ddlWardDtls")).val(),
                        Days: $('#Days').text(),
                        AmountBlocked: $('#PAtreatmentCost').val(),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }
                else {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageCode: $('#PApackageDetail').val(),
                        Ward: $("option:selected", $("#ddlWardDtls")).text(),
                        WardId: $("option:selected", $("#ddlWardDtls")).val(),
                        Days: $('#Days').text(),
                        AmountBlocked: $('#PAtreatmentCost').val(),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }

            }
        }
        else {
            if (parseInt(cost) > parseInt($('#AvlCover').text())) {
                alert('Block Amount is more than Available Cover !!');
            }
            if ($("#divWardDtls").css('visibility') === 'visible') {
                arrPackageInfo = [];
                arrPackageInfo.push({
                    ProcedureCode: $('#PApackageHeader').val(),
                    Procedure: $("option:selected", $("#PApackageHeader")).text(),
                    Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                    CategoryCode: $('#PApackageSubPackageDetail').val(),
                    Package: $("option:selected", $("#PApackageDetail")).text(),
                    PackageWard: $("#ddlWardDtls").val(),
                    PackageCode: $('#PApackageDetail').val(),
                    Ward: $("option:selected", $("#ddlWardDtls")).text(),
                    WardId: $("option:selected", $("#ddlWardDtls")).val(),
                    Days: $('#Days').text(),
                    AmountBlocked: $('#PAtreatmentCost').val(),
                    Type: $('#MedSer').text(),
                    PackageCost: $('#PackageCost').text(),
                    InvoiceNo: $('#invNo').text(),
                    BlockingDate: $('#blockingDt').val()
                });
            }
            else {
                arrPackageInfo = [];
                arrPackageInfo.push({
                    ProcedureCode: $('#PApackageHeader').val(),
                    Procedure: $("option:selected", $("#PApackageHeader")).text(),
                    Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                    CategoryCode: $('#PApackageSubPackageDetail').val(),
                    Package: $("option:selected", $("#PApackageDetail")).text(),
                    PackageCode: $('#PApackageDetail').val(),
                    Ward: $("option:selected", $("#ddlWardDtls")).text(),
                    WardId: $("option:selected", $("#ddlWardDtls")).val(),
                    Days: $('#Days').text(),
                    AmountBlocked: $('#PAtreatmentCost').val(),
                    Type: $('#MedSer').text(),
                    PackageCost: $('#PackageCost').text(),
                    InvoiceNo: $('#invNo').text(),
                    BlockingDate: $('#blockingDt').val()
                });
            }
        }
        $('#jsGrid').jsGrid({
            height: "auto",
            width: "100%",
            sorting: true,
            paging: true,
            pageSize: 10,
            deleteConfirm: "Do you really want to delete the Package?",
            autoload: true,
            controller: {
                loadData: function () {
                    var d = $.Deferred();
                    d.resolve(arrPackageInfo);
                    return d.promise();
                },
                deleteItem: function (deletingClient) {
                    var clientIndex = $.inArray(deletingClient, arrPackageInfo);
                    arrPackageInfo.splice(clientIndex, 1);
                }
            },
            fields:
                [{ name: "Procedure", type: "text", title: "Procedure", align: "center" },
                { name: "PackageWard", title: "PackageWard", type: "hidden", align: "center", visible: false },
                { name: "Category", title: "Category", type: "text", align: "center" },
                { name: "CategoryCode", title: "Category Code", type: "text", align: "center", visible: false },
                { name: "Package", title: "Package", type: "text", align: "center" },
                { name: "Ward", title: "Ward", type: "text", align: "center" },
                { name: "WardId", title: "WardId", type: "text", width: "auto", align: "center", visible: false },
                { name: "PackageCode", title: "Package Code", type: "number", align: "center" },
                { name: "Days", title: "Days", type: "number", align: "center" },
                { name: "PackageCost", title: "Package Cost(Rs.)", type: "text", align: "center" },
                { name: "AmountBlocked", title: "Amount Blocked(Rs.)", type: "text", align: "center" },
                { name: "Type", title: "Type", type: "text", align: "center" },
                { name: "InvoiceNo", title: "Invoice No", type: "text", align: "center" },
                { name: "BlockingDate", title: "Blocking Date", type: "text", align: "center" },
                {
                    type: "control", title: "Remove", editButton: false, headerTemplate: function () {
                        return $("<div>").prop("title", "Remove").text("Remove");
                    }
                }]
        });
        $('#lblPkgHeader').text('');
        $('#lblPkgCategory').text('');
        $('#lblPkgDetails').text('');
        clearUnSpecified();
        clearPreApproved();
        if ($('#AuthStatus').text() == 'Y') {
            $("#btnBlock").prop('value', 'Request');
        }
        else {
            $("#btnBlock").prop('value', 'Block');
        }
        $('#btnBlock').css('visibility', 'visible');
    }
}
function AddPackage_MedicalToSurgical() {
    //AllowBlockPackage();
    if (ValidatePackageMtoM()) {
        if (arrPrevPackageInfo.length > 0) {
            //    if (arrPrevPackageInfo.length == 1 && arrPrevPackageInfo[0].IsMedSergical == 'M') {
            //        alert('Already Medical Package Blocked!!');
            //        // AllowBlockPackage();                      //Modified by Smruti Ranjan Bisal 19/08/2020
            //    }
            //    else if (arrPrevPackageInfo.length == 1 && arrPrevPackageInfo[0].IsMedSergical == 'S' && $('#MedSer').text() == 'S') {
            //        if (arrPrevPackageInfo[0].procedureCode === $("option:selected", $("#PApackageHeader")).val() && arrPrevPackageInfo[0].PackageCode === $("option:selected", $("#PApackageDetail")).val()) {
            //            alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
            //        }
            //        else {
            //            AllowBlockPackage();
            //        }
            //    }
            //    else if (arrPrevPackageInfo.length == 2 && $('#MedSer').text() == 'S') {
            //        if (arrPrevPackageInfo[0].procedureCode === $("option:selected", $("#PApackageHeader")).val() && arrPrevPackageInfo[0].PackageCode === $("option:selected", $("#PApackageDetail")).val()) {
            //            alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
            //        }
            //        else if (arrPrevPackageInfo[1].procedureCode === $("option:selected", $("#PApackageHeader")).val() && arrPrevPackageInfo[1].PackageCode === $("option:selected", $("#PApackageDetail")).val()) {
            //            alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
            //        }
            //        else {
            //            AllowBlockPackage();
            //        }

            //    }
            //    else {
            //        alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
            //    }
            //}
            //else {
            if (arrPrevPackageInfo[0].procedureCode === $("option:selected", $("#PApackageHeader")).val() && arrPrevPackageInfo[0].PackageCode === $("option:selected", $("#PApackageDetail")).val()) {
                alert('Cannot Block Package. Please Check Previous Blocked Package Details!!');
            }
            else {
                AllowBlockPackage_PackageChangeMedicalToSurgical();
            }
        }
    }
}
function AllowBlockPackage_PackageChangeMedicalToSurgical() {
    if (ValidatePackageMtoM()) {
        $('#CurBlkHeader').show();
        $('#jsGrid').show();
        var BlockAmnt;
        var cost = $('#PAtreatmentCost').val();
        if (arrPrevPackageInfo.length > 0) {
            if (arrPrevPackageInfo.length == 1 && arrPrevPackageInfo[0].IsMedSergical == 'S') {
                BlockAmnt = (parseInt(cost) / 2);
                if (parseInt(BlockAmnt) > parseInt($('#AvlCover').text())) {
                    alert('Block Amount is more than Available Cover !!');
                }
                if ($("#divWardDtls").css('visibility') == 'visible') {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageWard: $("#ddlWardDtls").val(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: $('#PAtreatmentCost').val(),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }
                else {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: BlockAmnt,
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }

            }
            else if (arrPrevPackageInfo.length == 2) {
                BlockAmnt = (parseInt(cost) / 4);
                if (parseInt(BlockAmnt) > parseInt($('#AvlCover').text())) {
                    alert('Block Amount is more than Available Cover !!');
                }
                if ($("#divWardDtls").css('visibility') == 'visible') {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageWard: $("#ddlWardDtls").val(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: $('#PAtreatmentCost').val(),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }
                else {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: (parseInt(cost) / 4),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }

            }
            else {
                if (parseInt(cost) > parseInt($('#AvlCover').text())) {
                    alert('Block Amount is more than Available Cover !!');
                }
                if ($("#divWardDtls").css('visibility') == 'visible') {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageWard: $("#ddlWardDtls").val(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: $('#PAtreatmentCost').val(),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }
                else {
                    arrPackageInfo = [];
                    arrPackageInfo.push({
                        ProcedureCode: $('#PApackageHeader').val(),
                        Procedure: $("option:selected", $("#PApackageHeader")).text(),
                        Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                        CategoryCode: $('#PApackageSubPackageDetail').val(),
                        Package: $("option:selected", $("#PApackageDetail")).text(),
                        PackageCode: $('#PApackageDetail').val(),
                        Days: $('#Days').text(),
                        AmountBlocked: $('#PAtreatmentCost').val(),
                        Type: $('#MedSer').text(),
                        PackageCost: $('#PackageCost').text(),
                        InvoiceNo: $('#invNo').text(),
                        BlockingDate: $('#blockingDt').val()
                    });
                }

            }
        }
        else {
            if (parseInt(cost) > parseInt($('#AvlCover').text())) {
                alert('Block Amount is more than Available Cover !!');
            }
            if ($("#divWardDtls").css('visibility') === 'visible') {
                arrPackageInfo = [];
                arrPackageInfo.push({
                    ProcedureCode: $('#PApackageHeader').val(),
                    Procedure: $("option:selected", $("#PApackageHeader")).text(),
                    Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                    CategoryCode: $('#PApackageSubPackageDetail').val(),
                    Package: $("option:selected", $("#PApackageDetail")).text(),
                    PackageWard: $("#ddlWardDtls").val(),
                    PackageCode: $('#PApackageDetail').val(),
                    Days: $('#Days').text(),
                    AmountBlocked: $('#PAtreatmentCost').val(),
                    Type: $('#MedSer').text(),
                    PackageCost: $('#PackageCost').text(),
                    InvoiceNo: $('#invNo').text(),
                    BlockingDate: $('#blockingDt').val()
                });
            }
            else {
                arrPackageInfo = [];
                arrPackageInfo.push({
                    ProcedureCode: $('#PApackageHeader').val(),
                    Procedure: $("option:selected", $("#PApackageHeader")).text(),
                    Category: $("option:selected", $("#PApackageSubPackageDetail")).text(),
                    CategoryCode: $('#PApackageSubPackageDetail').val(),
                    Package: $("option:selected", $("#PApackageDetail")).text(),
                    PackageCode: $('#PApackageDetail').val(),
                    Days: $('#Days').text(),
                    AmountBlocked: $('#PAtreatmentCost').val(),
                    Type: $('#MedSer').text(),
                    PackageCost: $('#PackageCost').text(),
                    InvoiceNo: $('#invNo').text(),
                    BlockingDate: $('#blockingDt').val()
                });
            }
        }
        $('#jsGrid').jsGrid({
            height: "auto",
            width: "100%",
            sorting: true,
            paging: true,
            pageSize: 10,
            deleteConfirm: "Do you really want to delete the Package?",
            autoload: true,
            controller: {
                loadData: function () {
                    var d = $.Deferred();
                    d.resolve(arrPackageInfo);
                    return d.promise();
                },
                deleteItem: function (deletingClient) {
                    var clientIndex = $.inArray(deletingClient, arrPackageInfo);
                    arrPackageInfo.splice(clientIndex, 1);
                }
            },
            fields:
                [{ name: "Procedure", type: "text", title: "Procedure", align: "center" },
                { name: "PackageWard", title: "PackageWard", type: "hidden", align: "center", visible: false },
                { name: "Category", title: "Category", type: "text", align: "center" },
                { name: "CategoryCode", title: "Category Code", type: "text", align: "center", visible: false },
                { name: "Package", title: "Package", type: "text", align: "center" },
                { name: "PackageCode", title: "Package Code", type: "number", align: "center" },
                { name: "Days", title: "Days", type: "number", align: "center" },
                { name: "PackageCost", title: "Package Cost(Rs.)", type: "text", align: "center" },
                { name: "AmountBlocked", title: "Amount Blocked(Rs.)", type: "text", align: "center" },
                { name: "Type", title: "Type", type: "text", align: "center" },
                { name: "InvoiceNo", title: "Invoice No", type: "text", align: "center" },
                { name: "BlockingDate", title: "Blocking Date", type: "text", align: "center" },
                {
                    type: "control", title: "Remove", editButton: false, headerTemplate: function () {
                        return $("<div>").prop("title", "Remove").text("Remove");
                    }
                }]
        });
        clearUnSpecified();
        clearPreApproved();
        $("#btnBlock").prop('value', 'Request');
        $('#btnBlock').css('visibility', 'visible');
    }
}

function PackageSubCategoryChange(SCatCode, PackCode, WId) {
    $('#PApackageDetail').empty();
    $('#ddlWardDtls').empty();
    $('#PAtreatmentCost').val('');
    $('#DocInfo').hide();
    $('#PreAuthDoc').hide();
    $('#fuValText').hide();
    var PackageParams = { 
        Action: 'CK',
        PackageCategoryCode: $('#PApackageHeader').val()
    };
    $.ajax({
        url: ServiceURL + "/api/Common/SubGetPackage",
        type: "GET",
        data: PackageParams,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // console.log(data);
            arrPackageDtls = [];
            arrPackageDtls.push(data);
            $('#PApackageSubPackageDetail').empty().append('<option selected="selected" value="0">--select--</option>');
            $.each(data, function () {
                $('#PApackageSubPackageDetail').append($("<option></option>").val(this['subCat_Code']).text(this['subCat_Name']));
            });
            if (SCatCode != null) {
                $('#PApackageSubPackageDetail').val(SCatCode);
            }
            if (PackCode != null) {
                PackageHeaderChange(PackCode, WId);
            }
        },
        error: function (error) {
            console.log(error.statusText);
        }
    });
}
function PackageSubCategoryChangeAddOn(SCatCode, PackCode, WId) {
    $('#PApackageDetail').empty();
    $('#ddlWardDtls').empty();
    $('#PAtreatmentCost').val('');
    $('#DocInfo').hide();
    $('#PreAuthDoc').hide();
    $('#fuValText').hide();
    var PackageParams = {
        Action: 'CK',
        PackageCategoryCode: $('#PApackageHeader').val()
    };
    $.ajax({
        url: ServiceURL + "/api/Common/SubGetPackage",
        type: "GET",
        data: PackageParams,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // console.log(data);
            arrPackageDtls = [];
            arrPackageDtls.push(data);
            $('#PApackageSubPackageDetail').empty().append('<option selected="selected" value="0">--select--</option>');
            $.each(data, function () {
                if (this['subCat_Code'] == 'MG072') {
                    $('#PApackageSubPackageDetail').append($("<option></option>").val(this['subCat_Code']).text(this['subCat_Name']));
                }

            });
            if (SCatCode != null) {
                $('#PApackageSubPackageDetail').val(SCatCode);
            }
            if (PackCode != null) {
                PackageHeaderChange(PackCode, WId);
            }
        },
        error: function (error) {
            console.log(error.statusText);
        }
    });
}
function PackageSubCategoryChange_PackageChange(SCatCode, PackCode, WId) {

    var PackageParams = {
        Action: 'CC',
        PackageCategoryCode: $('#PApackageHeader').val()
    };
    $.ajax({
        url: ServiceURL + "/api/Common/SubGetPackage_PackageChange",
        type: "GET",
        data: PackageParams,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // console.log(data);
            arrPackageDtls = [];
            arrPackageDtls.push(data);
            $('#PApackageSubPackageDetail').empty().append('<option selected="selected" value="0">--select--</option>');
            $.each(data, function () {
                $('#PApackageSubPackageDetail').append($("<option></option>").val(this['subCat_Code']).text(this['subCat_Name']));
            });
            if (SCatCode != null) {
                $('#PApackageSubPackageDetail').val(SCatCode);
            }
            if (PackCode != null) {
                PackageHeaderChange(PackCode, WId);
            }
        },
        error: function (error) {
            console.log(error.statusText);
        }
    });
}
function PackageHeaderChange(PCode, WaId) {
    var PackageParams = {
        Action: 'PK',
        PackageCategoryCode: $('#PApackageHeader').val(),
        PackageSubCategoryCode: $('#PApackageSubPackageDetail').val()
    };
    $.ajax({
        url: ServiceURL + "/api/Common/GetPackage",
        type: "GET",
        data: PackageParams,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            //console.log(data);
            arrPackageDtls = [];
            arrPackageDtls.push(data);
            $('#PApackageDetail').empty().append('<option selected="selected" value="0">--select--</option>');
            $.each(data, function () {
                $('#PApackageDetail').append($("<option></option>").val(this['packageId']).text(this['packageName']).attr("title", this['packageDescription']));
            });
            if (PCode != null) {
                $('#PApackageDetail').val(PCode);
                PackageDetailsChange(WaId);
            }
        },
        error: function (error) {
            console.log(error.statusText);
        }
    });
}
function PackageHeaderChange_PackageChange(PCode, WaId) {
    var PackageParams = {
        Action: 'CP',
        PackageCategoryCode: $('#PApackageHeader').val(),
        PackageSubCategoryCode: $('#PApackageSubPackageDetail').val()
    };
    $.ajax({
        url: ServiceURL + "/api/Common/GetPackage_PackageChange",
        type: "GET",
        data: PackageParams,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            //console.log(data);
            arrPackageDtls = [];
            arrPackageDtls.push(data);
            $('#PApackageDetail').empty().append('<option selected="selected" value="0">--select--</option>');
            $.each(data, function () {
                $('#PApackageDetail').append($("<option></option>").val(this['packageId']).text(this['packageName']).attr("title", this['packageDescription']));
            });
            if (PCode != null) {
                $('#PApackageDetail').val(PCode);
                PackageDetailsChange(WaId);
            }
        },
        error: function (error) {
            console.log(error.statusText);
        }
    });
}
function BindPackageHeader() {
    var PackCatagoryParams = {
        Action: 'P'
    };
    $.ajax({
        url: ServiceURL + "/api/Common/GetPackageCategory",
        type: "GET",
        data: PackCatagoryParams,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // console.log(data);
            $('#PApackageHeader').empty().append('<option selected="selected" value="0">--select--</option>');
            $.each(data, function () {
                $('#PApackageHeader').append($("<option></option>").val(this['packagecategorycode']).text(this['procedures']));
            });
        },
        error: function (error) {
            console.log(error.statusText);
        }
    });
}
function BindPackageHeader_Ward() {
    var PackCatagoryParams = {
        Action: 'PW'
    };
    $.ajax({
        url: ServiceURL + "/api/Common/GetPackageCategory",
        type: "GET",
        data: PackCatagoryParams,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // console.log(data);
            $('#PApackageHeader').empty().append('<option selected="selected" value="0">--select--</option>');
            $.each(data, function () {
                $('#PApackageHeader').append($("<option></option>").val(this['packagecategorycode']).text(this['procedures']));
            });
        },
        error: function (error) {
            console.log(error.statusText);
        }
    });
}
function BindPackageHeader_PackageChange(IsMedical, ChangeType) {
    var PackCatagoryParams = {
        Action: 'CP'
    };
    $.ajax({
        url: ServiceURL + "/api/Common/GetPackageCategory_PackageChange",
        type: "GET",
        data: PackCatagoryParams,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (IsMedical == 'S') {
                if (ChangeType == 'S') {
                    var arrPackageHeader = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].specialtyType == 'Surgical') {
                            arrPackageHeader.push({
                                packagecategorycode: data[i].packagecategorycode,
                                procedures: data[i].procedures,
                                criticalCarePackage: data[i].criticalCarePackage
                            });
                        }
                    }
                }
                else if (ChangeType == 'A') {
                    var arrPackageHeader = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].packagecategorycode == 'MG') {
                            arrPackageHeader.push({
                                packagecategorycode: data[i].packagecategorycode,
                                procedures: data[i].procedures,
                                criticalCarePackage: data[i].criticalCarePackage
                            });
                        }
                    }
                }
                else {
                    var arrPackageHeader = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].criticalCarePackage == '1') {
                            arrPackageHeader.push({
                                packagecategorycode: data[i].packagecategorycode,
                                procedures: data[i].procedures,
                                criticalCarePackage: data[i].criticalCarePackage
                            });
                        }
                    }
                }
            }
            else {
                if (ChangeType == 'S') {
                    var arrPackageHeader = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].specialtyType == 'Surgical') {
                            arrPackageHeader.push({
                                packagecategorycode: data[i].packagecategorycode,
                                procedures: data[i].procedures,
                                criticalCarePackage: data[i].criticalCarePackage
                            });
                        }
                    }
                }
                else if (ChangeType == 'A') {
                    var arrPackageHeader = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].packagecategorycode == 'MG') {
                            arrPackageHeader.push({
                                packagecategorycode: data[i].packagecategorycode,
                                procedures: data[i].procedures,
                                criticalCarePackage: data[i].criticalCarePackage
                            });
                        }
                    }
                }
                else {
                    var arrPackageHeader = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].specialtyType == 'Medical') {
                            arrPackageHeader.push({
                                packagecategorycode: data[i].packagecategorycode,
                                procedures: data[i].procedures,
                                criticalCarePackage: data[i].criticalCarePackage
                            });
                        }
                    }
                }
            }

            // console.log(data);
            $('#PApackageHeader').empty().append('<option selected="selected" value="0">--select--</option>');
            $.each(arrPackageHeader, function () {
                $('#PApackageHeader').append($("<option></option>").val(this['packagecategorycode']).text(this['procedures']));
            });
        },
        error: function (error) {
            console.log(error.statusText);
        }
    });
}
function bindPrevBlockPackageGrid() {
    $('#jsGridPrev').jsGrid({
        width: "100%",
        sorting: true,
        autoload: true,
        controller: {
            loadData: function () {
                var d = $.Deferred();
                d.resolve(arrPrevPackageInfo);
                return d.promise();
            },
        },
        fields: [{ name: "ProcedureName", type: "text", width: "auto", title: "Procedure", align: "center" },
        { name: "Category", title: "Category", type: "text", align: "center" },
        { name: "PackageName", title: "Package", width: "auto", type: "text", align: "center" },
        { name: "CategoryCode", title: "CategoryCode", type: "text", align: "center", visible: false },
        { name: "PackageCode", title: "Package Code", width: "auto", type: "number", align: "center", css: "noPrint" },
        { name: "NoofDays", title: "Days", type: "number", width: "auto", align: "center", css: "noPrint" },
        { name: "PackageCost", title: "Package Cost(Rs.)", width: "auto", type: "text", align: "center" },
        { name: "AmoutBlocked", title: "Amount Blocked(Rs.)", width: "auto", type: "text", align: "center", css: "noPrint" },
        { name: "AmoutBlocked", title: "Amount Claimed(Rs.)", width: "auto", type: "text", align: "center", css: "yesPrint" },
        { name: "IsMedSergical", title: "Type", type: "text", width: "auto", align: "center" },
        { name: "InvoiceNo", title: "Invoice No", width: "auto", type: "text", align: "center" },
        { name: "BlockingUserDate", title: "Blocking Date", width: "auto", type: "text", align: "center" }
            //,{ name: "", title: "Treatment complete or not (YES/NO)", type: "text", width: "auto", align: "center", css: "yesPrint" },
            //{ name: "", title: "Name of the doctor", type: "text", width: "auto", align: "center", css: "yesPrint" },
            //{ name: "", title: "Sign of treating doctor", type: "text", width: "auto", align: "center", css: "yesPrint" },
            //{ name: "", title: "Period of stay in hospital", type: "text", width: "auto", align: "center", css: "yesPrint" },
            //{ name: "", title: "Remarks", type: "text", width: "auto", align: "center", css: "yesPrint" }
        ]
    });
}

function bindPrevBlockPackageGrid_RoomType() {
    $('#jsGridPrevRoomType').jsGrid({
        width: "100%",
        sorting: true,
        autoload: true,
        controller: {
            loadData: function () {
                var d = $.Deferred();
                d.resolve(arrPrevPackageInfo);
                return d.promise();
            },
        },
        fields: [{ name: "ProcedureName", type: "text", title: "Procedure", width: "auto", align: "center" },
        { name: "Category", title: "Category", type: "text", width: "auto", align: "center" },
        { name: "PackageName", title: "Package", type: "text", width: "auto", align: "center" },
        { name: "Ward", title: "Ward", type: "text", width: "auto", align: "center" },
        { name: "CategoryCode", title: "CategoryCode", type: "text", align: "center", width: "auto", visible: false },
        { name: "PackageCode", title: "Package Code", type: "number", align: "center", width: "auto", css: "noPrint" },
        { name: "NoofDays", title: "Days", type: "number", align: "center", width: "auto", css: "noPrint" },
        { name: "PackageCost", title: "Package Cost(Rs.)", type: "text", width: "auto", align: "center" },
        { name: "AmoutBlocked", title: "Amount Blocked(Rs.)", type: "text", align: "center", width: "auto", css: "noPrint" },
        { name: "AmoutBlocked", title: "Amount Claimed(Rs.)", type: "text", width: "auto", align: "center", css: "yesPrint" },
        { name: "IsMedSergical", title: "Type", type: "text", width: "auto", align: "center" },
        { name: "InvoiceNo", title: "Invoice No", type: "text", width: "auto", align: "center" },
        { name: "BlockingUserDate", title: "Blocking Date", type: "text", width: "auto", align: "center" }
            ,
        {
            type: "control", editButton: true, deleteButton: false, width: "auto", align: "center",
            itemTemplate: function (value, item) {
                if (item.wardId != null || item.wardId != '') {
                    return $("<button>").attr({ type: "button", class: "btn btn-outline-primary focusedBtn btn-sm my-2 my-sm-0" }).text("Previous Details")
                        .on("click", function () {
                            var arrWardTransactionInfo = [];
                            arrWardTransactionInfo.push({
                                TranId: item.TransactionID
                            });
                            localStorage.setItem('WardTransactionInfo', JSON.stringify(arrWardTransactionInfo));
                            window.open('ViewPreviousWardDetails');
                        });
                }
                else {
                    return false;
                }
            },
            headerTemplate: function () {
                return $("<div>").prop("title", "Action").text("View Details");
            }

        },
        {
            type: "control", editButton: true, deleteButton: false, width: "auto", align: "center",
            itemTemplate: function (value, item) {
                if (item.WardId != null || item.WardId != '') {
                    return $("<button>").attr({ type: "button", class: "btn btn-outline-success focusedBtn btn-sm my-2 my-sm-0" }).text("Change Room Type")
                        .on("click", function () {
                            $('#blockingDt').val(item.BlockingUserDate);
                            $('#PApackageHeader').val(item.procedureCode);
                            PackageSubCategoryChange(item.CategoryCode, item.PackageCode, item.WardId);
                            $('#lblPkgHeader').text(item.ProcedureName);
                            $('#lblPkgCategory').text(item.Category);
                            $('#lblPkgDetails').text(item.PackageName);
                            $('#PAtreatmentCost').val(item.AmoutBlocked);
                            $('#hfSelWardLvl').text(item.WardLevel);
                            $('#TrId').text(item.TransactionID);
                            // $('#blkDt').text(item.BlockingUserDate);     
                        });
                }
                else {
                    return false;
                }
            },
            headerTemplate: function () {
                return $("<div>").prop("title", "Action").text("Action");
            }

        }
        ]
    });
}

function PackageDetailsChange(Id) {
    if (arrPackageDtls.length > 0) {
        arrPackageDtls[0].forEach(function (entry) {
            if (entry.packageId == $('#PApackageDetail').val()) {
                $('#PackageCost').text(entry.amount);
                $('#Days').text(entry.package_days);
                $('#AuthStatus').text(entry.preAuthStatus);
                $('#MedSer').text(entry.medSergical);
                $('#CapAmnt').text(entry.cappedAmount);
                if (entry.packageMode == '2') {
                    $('#lblWardDtls').show();
                    $('#divWardDtls').show();
                    //$('#PackMode').val('');
                    //$('#PackMode').val(entry.packageMode);
                    var WardDtlsParams = {
                        Action: 'P',
                        PreAuthStatus: entry.preAuthStatus
                    };
                    $.ajax({
                        
                        url: ServiceURL + "/api/Common/GetWardDetails",
                        type: "GET",
                        data: WardDtlsParams,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            arrWardDtls = [];
                            console.log(data);
                            if (data.length > 0) {
                                if (entry.wardType == 1) {
                                    arrWardDtls = [];
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i].wardtype == 1) {
                                            arrWardDtls.push({ childid: data[i].childid, ward: data[i].ward, amount: data[i].amount, wardLevel: data[i].wardLevel });
                                        }

                                    }
                                }
                                else if (entry.wardType == 2) {
                                    arrWardDtls = [];
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i].wardtype == 2) {
                                            arrWardDtls.push({ childid: data[i].childid, ward: data[i].ward, amount: data[i].amount, wardLevel: data[i].wardLevel  });
                                        }
                                    }
                                }
                                else {
                                    return false;
                                }

                            }
                            $.each(arrWardDtls, function (data, value) {

                                $("#ddlNationality").append($("<option></option>").val(value.childid).html(value.CountryName));
                            })
                            $('#ddlWardDtls').empty().append('<option value="0">--select--</option>');
                            $.each(arrWardDtls, function () {
                                //debugger;
                                $('#ddlWardDtls').append($("<option></option>").val(this['childid']).text(this['ward']));
                            });
                            if ($('#ddlWardDtls').val() != null || $('#ddlWardDtls').val() != '' || $('#ddlWardDtls').val() != 0) {
                                $('#ddlWardDtls').val(Id);
                            }                            
                        },
                        error: function (error) {
                            console.log(error.statusText);
                        }
                    });
                }
                else {
                    $('#PAtreatmentCost').val(entry.amount);
                    $('#divWardDtls').hide();
                    $('#lblWardDtls').hide();
                    $('#ddlWardDtls').val('1');
                }
                if (entry.packageMode == '3') {
                    $("#PAtreatmentCost").prop("readonly", false);
                    $("#PAtreatmentCost").val('');
                }
                else {
                    $("#PAtreatmentCost").prop("readonly", true);
                }
                if (entry.preAuthStatus == 'Y') {
                    alert('This Package needs approval!!');
                    $('#DocInfo').show();
                    $('#PreAuthDoc').show();
                    $('#fuValText').show();
                    $('#lblBlockingDt').html('Request Date <b><span style="color:red">*</span></b>');
                    //$('.datepicker').datepicker({
                    //    format: 'dd M yyyy',
                    //    endDate: 'today',
                    //    autoclose: true
                    //});
                    //$(".datepicker").datepicker("setDate", (new Date().toDateString()));
                    //$('.datepicker').datepicker('remove');
                    //$('#blockingDt').attr('readonly', true);
                    if (entry.clinicalDoc != '') {

                        $('#divDoc').html(entry.clinicalDoc).css('color', 'blue');
                    }
                    else {
                        $('#divDoc').html('NA').css('color', 'red');
                    }

                }
                else {
                    $('#lblBlockingDt').html('Blocking Date <b><span style="color:red">*</span></b>');
                    //$('#blockingDt').val('');
                    $('#DocInfo').hide();
                    $('#PreAuthDoc').hide();
                    $('#DocFile').val('');
                    $('#fuValText').hide();
                    // $('#blockingDt').attr('readonly', false);
                    //$('.datepicker').datepicker({
                    //    format: 'dd M yyyy',
                    //    endDate: 'today',
                    //    autoclose: true
                    //});
                    // $(".datepicker").datepicker("setDate", (new Date().toDateString()));
                    //$('.datepicker').datepicker('hide');

                    // $('.datepicker').datepicker('format' 'dd M yyyy');

                }
            }
        });
    }
}

function PackageDetailsChangeMtoS(Id) {
    if (arrPackageDtls.length > 0) {
        arrPackageDtls[0].forEach(function (entry) {
            if (entry.packageId == $('#PApackageDetail').val()) {
                $('#PackageCost').text(entry.amount);
                $('#Days').text(entry.package_days);
                $('#AuthStatus').text('Y');
                $('#MedSer').text(entry.medSergical);
                $('#CapAmnt').text(entry.cappedAmount);
                if (entry.packageMode == '2') {
                    $('#lblWardDtls').show();
                    $('#divWardDtls').show();
                    //$('#PackMode').val('');
                    //$('#PackMode').val(entry.packageMode);
                    var WardDtlsParams = {
                        Action: 'P',
                        PreAuthStatus: entry.preAuthStatus
                    };
                    $.ajax({
                        url: ServiceURL + "/api/Common/GetWardDetails",
                        type: "GET",
                        data: WardDtlsParams,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {

                            // console.log(data);

                            arrWardDtls = [];
                            // console.log(data);
                            if (data.length > 0) {
                                if (entry.wardType == '1') {
                                    arrWardDtls = [];
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i].wardtype == '1') {
                                            arrWardDtls.push({ childid: data[i].childid, ward: data[i].ward, amount: data[i].amount, wardLevel: data[i].wardLevel });
                                        }

                                    }
                                }
                                else if (entry.wardType == '2') {
                                    arrWardDtls = [];
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i].wardtype == '2') {
                                            arrWardDtls.push({ childid: data[i].childid, ward: data[i].ward, amount: data[i].amount, wardLevel: data[i].wardLevel });
                                        }
                                    }
                                }
                                else {
                                    return false;
                                }

                            }
                            $.each(arrWardDtls, function (data, value) {

                                $("#ddlNationality").append($("<option></option>").val(value.childid).html(value.CountryName));
                            })
                            $('#ddlWardDtls').empty().append('<option value="0">--select--</option>');
                            $.each(arrWardDtls, function () {
                                $('#ddlWardDtls').append($("<option></option>").val(this['childid']).text(this['ward']));
                            });
                            if ($('#ddlWardDtls').val() != null || $('#ddlWardDtls').val() != ''||$('#ddlWardDtls').val() != 0) {
                                $('#ddlWardDtls').val(Id);
                            }           



                            //arrWardDtls = [];
                            //arrWardDtls.push(data);
                            //$('#ddlWardDtls').empty().append('<option selected="selected" value="0">--select--</option>');
                            //$.each(data, function () {
                            //    $('#ddlWardDtls').append($("<option></option>").val(this['childid']).text(this['ward']));
                            //});
                            //if ($('#ddlWardDtls').val() != '' || $('#ddlWardDtls').val() != 0) {
                            //    $('#ddlWardDtls').val(Id);
                            //}


                        },
                        error: function (error) {
                            console.log(error.statusText);
                        }
                    });
                }
                else {
                    $('#PAtreatmentCost').val(entry.amount);
                    $('#divWardDtls').hide();
                    $('#lblWardDtls').hide();
                    $('#ddlWardDtls').val('1');
                }
                if (entry.packageMode == '3') {
                    $("#PAtreatmentCost").prop("readonly", false);
                    $("#PAtreatmentCost").val('');
                }
                else {
                    $("#PAtreatmentCost").prop("readonly", true);
                }
                alert('This Package needs approval!!');
                $('#DocInfo').show();
                $('#PreAuthDoc').show();
                $('#fuValText').show();
                $('#lblBlockingDt').html('Request Date <b><span style="color:red">*</span></b>');
                $('#divDoc').html(entry.clinicalDoc).css('color', 'blue');
            }
        });
    }
}
function PackageDetailsChangeMtoM(Id) {
    if (arrPackageDtls.length > 0) {
        arrPackageDtls[0].forEach(function (entry) {
            if (entry.packageId == $('#PApackageDetail').val()) {
                $('#PackageCost').text(entry.amount);
                $('#Days').text(entry.package_days);
                $('#AuthStatus').text('Y');
                $('#MedSer').text(entry.medSergical);
                $('#CapAmnt').text(entry.cappedAmount);
                if (entry.packageMode == '2') {
                    $('#lblWardDtls').show();
                    $('#divWardDtls').show();
                    //$('#PackMode').val('');
                    //$('#PackMode').val(entry.packageMode);
                    var WardDtlsParams = {
                        Action: 'P',
                        PreAuthStatus: entry.preAuthStatus
                    };
                    $.ajax({
                        url: ServiceURL + "/api/Common/GetWardDetails",
                        type: "GET",
                        data: WardDtlsParams,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            // console.log(data);

                            arrWardDtls = [];
                            // console.log(data);
                            if (data.length > 0) {
                                if (entry.wardType == '1') {
                                    arrWardDtls = [];
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i].wardtype == '1') {
                                            arrWardDtls.push({ childid: data[i].childid, ward: data[i].ward, amount: data[i].amount, wardLevel: data[i].wardLevel });
                                        }

                                    }
                                }
                                else if (entry.wardType == '2') {
                                    arrWardDtls = [];
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i].wardtype == '2') {
                                            arrWardDtls.push({ childid: data[i].childid, ward: data[i].ward, amount: data[i].amount, wardLevel: data[i].wardLevel });
                                        }
                                    }
                                }
                                else {
                                    return false;
                                }

                            }
                            $.each(arrWardDtls, function (data, value) {

                                $("#ddlNationality").append($("<option></option>").val(value.childid).html(value.CountryName));
                            })
                            $('#ddlWardDtls').empty().append('<option value="0">--select--</option>');
                            $.each(arrWardDtls, function () {
                                $('#ddlWardDtls').append($("<option></option>").val(this['childid']).text(this['ward']));
                            });
                            if ($('#ddlWardDtls').val() != null || $('#ddlWardDtls').val() != '' || $('#ddlWardDtls').val() != 0) {
                                $('#ddlWardDtls').val(Id);
                            }           

                            //arrWardDtls = [];
                            //arrWardDtls.push(data);
                            //$('#ddlWardDtls').empty().append('<option selected="selected" value="0">--select--</option>');
                            //$.each(data, function () {
                            //    $('#ddlWardDtls').append($("<option></option>").val(this['childid']).text(this['ward']));
                            //});
                            //if ($('#ddlWardDtls').val() != '' || $('#ddlWardDtls').val() != 0) {
                            //    $('#ddlWardDtls').val(Id);
                            //}
                        },
                        error: function (error) {
                            console.log(error.statusText);
                        }
                    });
                }
                else {
                    $('#PAtreatmentCost').val(entry.amount);
                    $('#divWardDtls').hide();
                    $('#lblWardDtls').hide();
                    $('#ddlWardDtls').val('1');
                }
                if (entry.packageMode == '3') {
                    $("#PAtreatmentCost").prop("readonly", false);
                    $("#PAtreatmentCost").val('');
                }
                else {
                    $("#PAtreatmentCost").prop("readonly", true);
                }
                alert('This Package needs approval!!');
                $('#DocInfo').show();
                $('#PreAuthDoc').show();
                $('#fuValText').show();
                $('#lblBlockingDt').html('Request Date <b><span style="color:red">*</span></b>');
                $('#divDoc').html(entry.clinicalDoc).css('color', 'blue');
            }
        });
    }
}
function PackageDetailsChangeStoM(Id) {
    if (arrPackageDtls.length > 0) {
        arrPackageDtls[0].forEach(function (entry) {
            if (entry.packageId == $('#PApackageDetail').val()) {
                $('#PackageCost').text(entry.amount);
                $('#Days').text(entry.package_days);
                $('#AuthStatus').text('Y');
                $('#MedSer').text(entry.medSergical);
                $('#CapAmnt').text(entry.cappedAmount);
                if (entry.packageMode == '2') {
                    $('#lblWardDtls').show();
                    $('#divWardDtls').show();
                    //$('#PackMode').val('');
                    //$('#PackMode').val(entry.packageMode);
                    var WardDtlsParams = {
                        Action: 'P',
                        PreAuthStatus: entry.preAuthStatus
                    };
                    $.ajax({
                        url: ServiceURL + "/api/Common/GetWardDetails",
                        type: "GET",
                        data: WardDtlsParams,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            // console.log(data);

                            arrWardDtls = [];
                            // console.log(data);
                            if (data.length > 0) {
                                if (entry.wardType == '1') {
                                    arrWardDtls = [];
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i].wardtype == '1') {
                                            arrWardDtls.push({ childid: data[i].childid, ward: data[i].ward, amount: data[i].amount, wardLevel: data[i].wardLevel });
                                        }

                                    }
                                }
                                else if (entry.wardType == '2') {
                                    arrWardDtls = [];
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i].wardtype == '2') {
                                            arrWardDtls.push({ childid: data[i].childid, ward: data[i].ward, amount: data[i].amount, wardLevel: data[i].wardLevel });
                                        }
                                    }
                                }
                                else {
                                    return false;
                                }

                            }
                            $.each(arrWardDtls, function (data, value) {

                                $("#ddlNationality").append($("<option></option>").val(value.childid).html(value.CountryName));
                            })
                            $('#ddlWardDtls').empty().append('<option value="0">--select--</option>');
                            $.each(arrWardDtls, function () {
                                $('#ddlWardDtls').append($("<option></option>").val(this['childid']).text(this['ward']));
                            });
                            if ($('#ddlWardDtls').val() != null || $('#ddlWardDtls').val() != '' || $('#ddlWardDtls').val() != 0) {
                                $('#ddlWardDtls').val(Id);
                            }           


                            //arrWardDtls = [];
                            //arrWardDtls.push(data);
                            //$('#ddlWardDtls').empty().append('<option selected="selected" value="0">--select--</option>');
                            //$.each(data, function () {
                            //    $('#ddlWardDtls').append($("<option></option>").val(this['childid']).text(this['ward']));
                            //});
                            //if ($('#ddlWardDtls').val() != '' || $('#ddlWardDtls').val() != 0) {
                            //    $('#ddlWardDtls').val(Id);
                            //}
                        },
                        error: function (error) {
                            console.log(error.statusText);
                        }
                    });
                }
                else {
                    $('#PAtreatmentCost').val(entry.amount);
                    $('#divWardDtls').hide();
                    $('#lblWardDtls').hide();
                    $('#ddlWardDtls').val('1');
                }
                if (entry.packageMode == '3') {
                    $("#PAtreatmentCost").prop("readonly", false);
                    $("#PAtreatmentCost").val('');
                }
                else {
                    $("#PAtreatmentCost").prop("readonly", true);
                }
                alert('This Package needs approval!!');
                $('#DocInfo').show();
                $('#PreAuthDoc').show();
                $('#fuValText').show();
                $('#lblBlockingDt').html('Request Date <b><span style="color:red">*</span></b>');
                $('#divDoc').html(entry.clinicalDoc).css('color', 'blue');
            }
        });
    }
}
function getHospitalInfo() {
    var params = {
        HospitalCode: sessionHospitalCode
    };
    $.ajax({
        url: ServiceURL + "/api/Hospital/GetHospitalInformation",
        type: "GET",
        data: params,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#hdState").html(data.hospitalState);
            $("#hdDistrict").html(data.hospitalDistrict);
            $("#hdHospitalCode").html(data.hospitalCode);
            $("#HdName").html(data.hospitalname);
            // console.log(data);
        },
        error: function (error) {
            console.log(error.statusText);
        }
    });
}

