var startInput = document.querySelector("#startInput")
var endInput = document.querySelector("#endInput")
var minInput = document.querySelector("#totalMin")
var stringInput = document.querySelector("#timeString")
var dateInput = document.querySelector("#dateInput")
var test = document.querySelector("#test")

var start = startInput.value
var end = endInput.value

function updateStart(){
    start = startInput.value
}

function updateEnd(){
    end = endInput.value
    updateForms()
}

if(dateInput === null){

} else{
    dateInput.addEventListener('load', dateInput.setAttribute("value", moment().format('M/D/YYYY')))
}


function updateForms(){
    minInput.setAttribute("value", calcTotalMin(start, end))
    stringInput.setAttribute("value", calcTimeString(calcTotalMin(start, end)))
}

function calcTotalMin(start, end){
    var startArr = splitTime(start)
    var endArr = splitTime(end)
    var hours = endArr[0] - startArr[0]
    var minutes = endArr[1] - startArr[1]
    var totalMin= ((hours * 60) + minutes)

    if(hours < 0){
       return (((hours + 24) * 60) + minutes)
    } else{
        return (totalMin)
    }    
}

function calcTimeString(total){
    var totalHr = total/60
    var diffHours = Math.floor(totalHr)
    var diffMin = Math.floor((totalHr % 1) * 60)
    return (`${diffHours}hr - ${diffMin}min`)
}

function splitTime(time){
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/([AaPp][Mm])$/)[1].toUpperCase();
    if(AMPM === "AM" && hours !== 12){
        return [hours, minutes, AMPM]
    } else if (AMPM === "AM" && hours === 12){
        return [hours - 12, minutes, AMPM]
    } else if (AMPM === "PM" && hours === 12){
        return [hours, minutes, AMPM]
    } else{
        return [hours + 12, minutes, AMPM]
    }
}

function printToDB(start, end){
    return({
        start: start,
        end: end,
        totalMin: calcTotalMin(start, end),
        timeString: calcTimeString(calcTotalMin(start, end))
    })
}

function calcOverallMin(arr) {
    let overallMin = 0
    arr.forEach((i) => {
        overallMin += i.totalMin
    })
    return overallMin
}
