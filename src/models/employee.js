// employee.js

class Employee {
    constructor(id, name, job, jobLocation, nationalId, phoneNumber, baseSalary, salary) {
        this.id = id;
        this.name = name;
        this.job = job;
        this.jobLocation = jobLocation;
        this.nationalId = nationalId;
        this.phoneNumber = phoneNumber;
        this.baseSalary = baseSalary;
        this.salary = salary;
    }

    displayInfo() {
        console.log(`Employee ID: ${this.id}\nName: ${this.name}\nJob: ${this.job}\nJob Location: ${this.jobLocation}\nNational ID: ${this.nationalId}\nPhone Number: ${this.phoneNumber}\nBase Salary: ${this.baseSalary}\nSalary: ${this.salary}`);
    }
}

export default Employee;
