function Validation() {
    this.patternName = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
    this.formatName = new RegExp(this.patternName);

    this.formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    this.formatPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;

    //Format of date: dd/mm/yyyy
    this.formatDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

    this.salaryRange = [1e+6, 20e+6];

    this.workHourRange = [80, 200];

    this.check_Empty = function (inputID, message, spanID) {
        if (document.getElementById(inputID).value.trim() != "") {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        else {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }

    this.check_Select = function (selectID, message, spanID) {
        if (document.getElementById(selectID).selectedIndex != 0) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        else {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }

    this.check_Account = function (input, message, spanID, employeeArr) {
        var isExist = false;
        isExist = employeeArr.some(function (emp) {
            return input == emp.account;
        });

        if (isExist) {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
        else {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
    }

    this.check_Format = function (format, input, message, spanID) {
        if (input.match(format)) {
            //Valid
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        else {
            //Invalid
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false;
        }
    }

    this.check_Format_Quantity = function (range, input, message, spandID) {
        if (input >= range[0] && input <= range[1]) {
            document.getElementById(spandID).innerHTML = "";
            document.getElementById(spandID).style.display = "none";
            return true;
        }
        else {
            document.getElementById(spandID).innerHTML = message;
            document.getElementById(spandID).style.display = "block";
            return false;
        }
    }
}