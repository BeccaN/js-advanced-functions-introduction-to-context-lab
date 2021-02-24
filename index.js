// Your code here
function createEmployeeRecord(array) {
     return {
         firstName: array[0],
         familyName: array[1],
         title: array[2],
         payPerHour: array[3],
         timeInEvents: [],
         timeOutEvents: []
     }
}

function createEmployeeRecords(employeeData) {
    //take in array of arrays of different employee data
    //pass that data to createEmployeeRecord and return an array of hashes
    return employeeData.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(employee, dateStamp) {
//"2014-02-28 1400"
    employee.timeInEvents.push({
        type: "TimeIn",
        date: dateStamp.split(" ")[0],
        hour: parseInt(dateStamp.split(" ")[1])
    })

    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: dateStamp.split(" ")[0],
        hour: parseInt(dateStamp.split(" ")[1])
    })

    return employee
}

function hoursWorkedOnDate(employee, date) {
    //given a date, finds the timeinevent in employee and timeoutevent with same date
    //subtracts the timeinevent from the timeoutevent
    let timeInStamp = employee.timeInEvents.find(stamp => stamp.date == date)
    let timeOutStamp = employee.timeOutEvents.find(stamp => stamp.date == date)
    let hoursWorked = timeOutStamp.hour - timeInStamp.hour

    return hoursWorked / 100
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    // hash of timeInEvents and hash of timeOutEvents => we need to iterate through each hash, find coordinating pairs, calculate wagesEarnedOnDate += each date
    let datesWorked = employee.timeInEvents.map(stamp => stamp.date)
    //go through datesWorked, calculate wagesEarnedOnDate, add it all up .reduce()
    // datesWorked.reduce(wagesEarnedOnDate())
    let wages = datesWorked.reduce(function(memo, date) {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)

    return wages
}

function calculatePayroll(employees) {
    let allEmployeesWages = employees.map(employee => allWagesFor(employee)) //array of all employee wages
    let totalWages = allEmployeesWages.reduce((a, b) => a + b, 0) 

    return totalWages
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => employee.firstName == name)
}