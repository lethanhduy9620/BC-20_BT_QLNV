// GLOBAL
var employeeList = new EmployeeList();
var validation = new Validation();

function get_Element(id) {
    return document.getElementById(id);
}

function set_Local_Storage(employeeArr) {
    localStorage.setItem("EMPLOYEE_LIST", JSON.stringify(employeeArr));
}

function get_Local_Storage() {
    if (localStorage.getItem("EMPLOYEE_LIST") != null) {
        employeeList.employeeArr = JSON.parse(localStorage.getItem("EMPLOYEE_LIST"));
        show_Employee_List(employeeList.employeeArr);
    }
}

//Auto show list of employee when loading layout
get_Local_Storage();

function get_Employee_Info() {
    var account = get_Element("tknv").value;
    var name = get_Element("name").value;
    var email = get_Element("email").value;
    var password = get_Element("password").value;
    var startDate = get_Element("datepicker").value;
    var basicSalary = get_Element("luongCB").value;
    var job = get_Element("chucvu").value;
    var workHour = get_Element("gioLam").value;

    var employee = new Employee(account, name, email, password, startDate, basicSalary, job, workHour);
    employee.totalSalary = employee.calculate_Total_Salary(job);
    employee.grade = employee.grade_Employee(workHour);
    return employee;
}

function validate_Input_Account(employee) {
    var isValid = true;
    //Check account
    isValid &= validation.check_Empty("tknv", "Tài khoản nhân viên không được để trống", "tbTKNV") && validation.check_Account(employee.account, "Tài khoản nhân viên bị trùng", "tbTKNV", employeeList.employeeArr);

    return isValid;
}

function validate_Input(employee) {
    var isValid = true;
    //Not check account in this function

    //Check Name
    isValid &= validation.check_Empty("name", "Tên nhân viên không được để trống", "tbTen") && validation.check_Format(validation.formatName, employee.name, "Tên nhân viên phải là chữ", "tbTen");

    //Check Email
    isValid &= validation.check_Empty("email", "Email nhân viên không được để trống", "tbEmail") && validation.check_Format(validation.formatEmail, employee.email, "Email chưa đúng định dạng", "tbEmail");

    //Check Password
    isValid &= validation.check_Empty("password", "Mật khẩu nhân viên không được để trống", "tbMatKhau") && validation.check_Format(validation.formatPassword, employee.password, "Password chưa đúng định dạng", "tbMatKhau");

    //Check Date
    isValid &= validation.check_Empty("datepicker", "Ngày không được để trống", "tbNgay") && validation.check_Format(validation.formatDate, employee.startDate, "Không đúng định dạng ngày", "tbNgay");

    //Check Salary
    isValid &= validation.check_Empty("luongCB", "Lương cơ bản không được để trống", "tbLuongCB") && validation.check_Format_Quantity(validation.salaryRange, employee.basicSalary, "Lương cơ bản chưa hợp lệ", "tbLuongCB");

    //Check Job
    isValid &= validation.check_Select("chucvu", "Chức vụ chưa hợp lệ", "tbChucVu");

    //Check Work Hour
    isValid &= validation.check_Empty("gioLam", "Số giờ làm không được để trống", "tbGiolam") && validation.check_Format_Quantity(validation.workHourRange, employee.workHour, "Giờ làm việc chưa hợp lệ", "tbGiolam");

    return isValid;
}


function add_Employee() {
    var employee = get_Employee_Info();
    var isValid = validate_Input_Account(employee);
    isValid &= validate_Input(employee);
    xuLyGiaoDien();
    if (isValid) {
        employeeList.add_Employee_List(employee);
        show_Employee_List(employeeList.employeeArr);
        set_Local_Storage(employeeList.employeeArr);
    }

}

function show_Employee_List(employeeArr) {
    var content = "";
    for (var i = 0; i < employeeArr.length; i++) {
        var row = `<tr>
        <td>${employeeArr[i].account}</td>
        <td>${employeeArr[i].name}</td>  
        <td>${employeeArr[i].email}</td>
        <td>${employeeArr[i].startDate}</td>
        <td>${employeeArr[i].job}</td>
        <td>${employeeArr[i].totalSalary}</td>
        <td>${employeeArr[i].grade}</td>
        <td>
            <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal" onclick="query_Employee('${employeeArr[i].account}'); reset_Warning();">Edit</button>
            <button type="button" class="btn btn-danger btn-sm" onclick="delete_Employee('${employeeArr[i].account}')">Delete</button>
        </td>
        </tr>`;
        content += row;
    }
    get_Element("tableDanhSach").innerHTML = content;
}

function delete_Employee(account) {
    employeeList.delete_Employee_List(account);
    set_Local_Storage(employeeList.employeeArr);
    show_Employee_List(employeeList.employeeArr);
}

function query_Employee(account) {
    var queryEmployee = employeeList.query_Employee_List(account);
    if (queryEmployee != undefined) {
        get_Element("tknv").value = queryEmployee.account;
        get_Element("name").value = queryEmployee.name;
        get_Element("email").value = queryEmployee.email;
        get_Element("password").value = queryEmployee.password;
        get_Element("datepicker").value = queryEmployee.startDate;
        get_Element("luongCB").value = queryEmployee.basicSalary;
        get_Element("chucvu").value = queryEmployee.job;
        get_Element("gioLam").value = queryEmployee.workHour;
        get_Element("tknv").disabled = true;
    }
    else {
        console.log("Không tìm thấy được nhân viên");
    }
}

function update_Employee() {
    var employee = get_Employee_Info();
    var isValid = validate_Input(employee);
    if (isValid) {
        employeeList.update_Employee_List(employee);
        set_Local_Storage(employeeList.employeeArr);
        show_Employee_List(employeeList.employeeArr);
    }
}

function search_Employee_Grade() {
    var searchKey = get_Element("searchName").value;
    var searchEmployeeArr = employeeList.search_Employee_List(searchKey);
    show_Employee_List(searchEmployeeArr);
}

get_Element("btnTimNV").onclick = search_Employee_Grade;

get_Element("searchName").onkeyup = search_Employee_Grade;

function reset_Form() {
    get_Element("tknv").value = "";
    get_Element("name").value = "";
    get_Element("email").value = "";
    get_Element("password").value = "";
    get_Element("datepicker").value = "";
    get_Element("luongCB").value = "";
    get_Element("chucvu").selectedIndex = 0;
    get_Element("gioLam").value = "";
    get_Element("tknv").disabled = false;
}

get_Element("btnThem").onclick = reset_Form;

//Reset warning messages
function reset_Warning() {
    var warningArr = document.querySelectorAll(".modal-body .form-group .sp-thongbao");
    for (var i = 0; i < warningArr.length; i++) {
        warningArr[i].innerHTML = "";
        warningArr[i].style.display = "none";
    }
}

