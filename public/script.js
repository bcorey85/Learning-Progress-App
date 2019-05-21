const startInput = document.querySelector("#startInput")
const endInput = document.querySelector("#endInput")
const minInput = document.querySelector("#totalMin")
const stringInput = document.querySelector("#timeString")
const dateInput = document.querySelector("#dateInput")
const test = document.querySelector("#test")

let duration, hours, minutes, minutesTotal

let start = moment(startInput.value, "HH:mm a")
let end = moment(endInput.value, "HH:mm a")

function updateStart(){
    start = moment(startInput.value, "HH:mm a")
}

function updateEnd(){
    end = moment(endInput.value, "HH:mm a")
    duration = parseDuration(moment.duration(end.diff(start)));
    hours = parseInt(duration.asHours())
    minutes = parseInt(duration.asMinutes()) % 60
    minutesTotal = parseInt(duration.asMinutes())
    updateForms()
}

if(dateInput === null){

} else{
    dateInput.addEventListener('load', dateInput.setAttribute("value", moment().format('M/D/YYYY')))
}


function updateForms(){
    minInput.setAttribute("value", minutesTotal)
    stringInput.setAttribute("value", `${hours}hr - ${minutes}min`)
}

function parseDuration(duration){
    if (duration._milliseconds < 0) {
        duration._milliseconds += 86400000
         return duration
    } else {
        return duration
    }    
}
