function EmployeeList() {
    // Attribute or Property
    this.employeeArr = [];

    // Method
    this.add_Employee_List = function (employee) {
        this.employeeArr.push(employee);
    }

    this.search_Index = function (account) {
        // emp: employee
        var empIndex = -1;
        this.employeeArr.map(function (emp, index) {
            if (emp.account == account) {
                empIndex = index;
            }
        });
        return empIndex;
    }


    this.delete_Employee_List = function (account) {
        empIndex = this.search_Index(account);
        if (empIndex > -1) {
            this.employeeArr.splice(empIndex, 1);
        }
    }


    this.query_Employee_List = function (account) {
        var empIndex = this.search_Index(account);
        if (empIndex > -1) {
            return this.employeeArr[empIndex]
        }
    }

    this.update_Employee_List = function (employee) {
        var empIndex = this.search_Index(employee.account);
        if (empIndex > -1) {
            this.employeeArr[empIndex] = employee;
        }
    }

    this.search_Employee_List = function (searchKey) {
        var searchArr = [];
        var lowcaseSearchKey = searchKey.trim().toLowerCase();
        this.employeeArr.map(function (employee) {
            var lowcaseEmployeeGrade = employee.grade.toLowerCase();
            if (lowcaseEmployeeGrade.indexOf(lowcaseSearchKey) > -1) {
                searchArr.push(employee);
            }
        });
        return searchArr;
    }

}
