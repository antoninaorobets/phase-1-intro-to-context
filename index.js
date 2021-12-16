function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(records) {
    const employeeRecords = []
    records.forEach(record => {
        const emploee = createEmployeeRecord(record)
        employeeRecords.push(emploee)
    });
    return employeeRecords;
}

function createTimeInEvent(emploeeRecord, timeString) {
    const dateTime = timeString.split(' ')
    emploeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: dateTime[0],
        hour: parseInt(dateTime[1]),
    })
    return emploeeRecord
}

function createTimeOutEvent(emploeeRecord, timeString) {
    const dateTime = timeString.split(' ')
    emploeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: dateTime[0],
        hour: parseInt(dateTime[1]),
    })
    return emploeeRecord
}

function hoursWorkedOnDate(emploeeRecord, dateString) {
    const inObj = emploeeRecord.timeInEvents.find(element => element.date === dateString)
    const outObj = emploeeRecord.timeOutEvents.find(element => element.date === dateString)
    return (outObj.hour - inObj.hour) / 100
}

function wagesEarnedOnDate(emploeeRecord, dateString) {
    const inObj = emploeeRecord.timeInEvents.find(element => element.date === dateString)
    const outObj = emploeeRecord.timeOutEvents.find(element => element.date === dateString)
    return (outObj.hour - inObj.hour) / 100 * emploeeRecord.payPerHour
}

function allWagesFor(emploeeRecord){
    const totalDays = emploeeRecord.timeInEvents.length
    let sum = 0
    for (let i = 0; i < totalDays; i++ ){
      const totalHours = (emploeeRecord.timeOutEvents[i].hour - emploeeRecord.timeInEvents[i].hour)/100
      sum = sum + (totalHours) * emploeeRecord.payPerHour
    }
  return sum
}

function calculatePayroll(emploeeRecordArr){
    let sum = 0
    for (let i = 0; i < emploeeRecordArr.length; i++){
      sum = sum + allWagesFor(emploeeRecordArr[i])
    }
    return sum 
  }