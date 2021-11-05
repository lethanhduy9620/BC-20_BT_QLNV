function Employee(account, name, email, password, startDate, basicSalary, job, workHour) {
    // Attribute or Property
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.startDate = startDate;
    this.basicSalary = basicSalary;
    this.job = job;
    this.workHour = workHour;
    this.totalSalary = 0;
    this.grade = "none";

    // Method
    this.calculate_Total_Salary = function () {
        switch (this.job) {
            case "Giám đốc":
                return this.basicSalary * 3;
            case "Trưởng phòng":
                return this.basicSalary * 2;
            case "Nhân viên":
                return this.basicSalary;
            default:
                //No job status
                return 0;
        }
    };

    this.grade_Employee = function () {
        if (this.workHour >= 192) {
            return "Nhân viên xuất sắc";
        }
        else if (this.workHour >= 176) {
            return "Nhân viên giỏi";
        }
        else if (this.workHour >= 160) {
            return "Nhân viên khá";
        }
        else {
            return "Nhân viên trung bình";
        }
    }
}