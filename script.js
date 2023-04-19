// Ananlog & digital clock code
let hours = document.querySelector(".hour")
let minute = document.querySelector(".min")
let second = document.querySelector(".sec")
let hr = document.querySelector(".hours")
let mi = document.querySelector(".minutes")
let se = document.querySelector(".second")
let am = document.querySelector(".ampm")
let click = new Audio("./img_sou/Click.mp3")
setInterval(() => {
    d = new Date()
    ht = d.getHours()
    mt = d.getMinutes()
    st = d.getSeconds()

    hrotate = 30 * ht + mt / 2
    mrotate = 6 * mt
    srotate = 6 * st

    hours.style.transform = `rotate(${hrotate}deg)`
    minute.style.transform = `rotate(${mrotate}deg)`
    second.style.transform = `rotate(${srotate}deg)`
    hr.innerHTML = ht < 10 ? `0${ht}` : `${ht}`;
    mi.innerHTML = mt < 10 ? `0${mt}` : `${mt}`;
    se.innerHTML = st < 10 ? `0${st}` : `${st}`;
    am.innerHTML = ht >= 12 ? "pm" : "am";
}, 1000);



// Alarm clock javascript
//Initial References
let timerRef = document.querySelector(".time");
const hourInput = document.getElementById("ghante");
const minuteInput = document.getElementById("minute");
const activeAlarms = document.querySelector(".activealarm");
const setAlarm = document.getElementById("alarmbtn");
let alarmsArray = [];
let alarmSound = new Audio("./img_sou/alarm.mp3");

let initialHour = 0,
    initialMinute = 0,
    alarmIndex = 0;

//Append zeroes for single digit
const appendZero = (value) => (value < 10 ? "0" + value : value);

//Search for value in object
const searchObject = (parameter, value) => {
    let alarmObject,
        objIndex,
        exists = false;
    alarmsArray.forEach((alarm, index) => {
        if (alarm[parameter] == value) {
            exists = true;
            alarmObject = alarm;
            objIndex = index;
            return false;
        }
    });
    return [exists, alarmObject, objIndex];
};

//Display Time
function displayTimer() {
    let date = new Date();
    let [hours, minutes, seconds] = [
        appendZero(date.getHours()),
        appendZero(date.getMinutes()),
        appendZero(date.getSeconds()),
    ];

    //Display time
    timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;

    //Alarm
    alarmsArray.forEach((alarm, index) => {
        if (alarm.isActive) {
            if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
                alarmSound.play();
                setTimeout(() => {
                    alarmSound.pause()
                    alarmSound.currentTime = 0
                }, 8000)
                alarmSound.loop = true;
            }
        }
    });
}


// hourInput.addEventListener("input", () => {
//     hourInput.value = inputCheck(hourInput.value);
// });

// minuteInput.addEventListener("input", () => {
//     minuteInput.value = inputCheck(minuteInput.value);
// });

//Create alarm div

const createAlarm = (alarmObj) => {
    //Keys from object
    const { id, alarmHour, alarmMinute } = alarmObj;
    //Alarm div
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.setAttribute("data-id", id);
    alarmDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;

    //Delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (e) => deleteAlarm(e));
    alarmDiv.appendChild(deleteButton);
    activeAlarms.appendChild(alarmDiv);
};

//Set Alarm
setAlarm.addEventListener("click", () => {
    alarmIndex += 1;

    //alarmObject
    let alarmObj = {};
    alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
    alarmObj.alarmHour = hourInput.value;
    alarmObj.alarmMinute = minuteInput.value;
    alarmObj.isActive = true;
    console.log(alarmObj);
    alarmsArray.push(alarmObj);
    createAlarm(alarmObj);
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
});

//Start Alarm
const startAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
        alarmsArray[index].isActive = true;
    }
};

//Stop alarm
const stopAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
        alarmsArray[index].isActive = false;
        alarmSound.pause();
    }
};

//delete alarm
const deleteAlarm = (e) => {
    let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
        e.target.parentElement.parentElement.remove();
        alarmsArray.splice(index, 1);
    }
};

window.onload = () => {
    setInterval(displayTimer);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmsArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
};

// java script for the Timmer 


const timmerstatus = document.querySelector(".timmer-status")
const timmerhour = document.querySelector("#timmer-hour")
const timmerminute = document.querySelector("#timmer-min")
const timmersecond = document.querySelector("#timmer-sec")
const starts = document.querySelector("#start")
const resets = document.querySelector("#reset")
let timmeraudio = new Audio("./img_sou/TimeComplete.mp3")
let countdown = new Audio("./img_sou/1Countdown.mp3")

var interval = null;
var total = 0;

totalvlaue = () => {
    total = Number(timmerhour.value) * 3600 + Number(timmerminute.value) * 60 + Number(timmersecond.value)
}
Timmer = () => {
    totalvlaue();
    total--;
    if (total >= 0) {
        let h = Math.floor(total / 3600);
        let m = Math.floor((total / 60) - (h * 60));
        let s = total - ((h / 3600) + (m * 60));

        timmerhour.value = h
        timmerminute.value = m
        timmersecond.value = s
    }
    else {
        timmerstatus.innerText = "Timmer Stop"
        timmeraudio.play()
    }

    if (total == 10) {
        countdown.play()
    }

}
starts.addEventListener('click', () => {
    click.play()
    clearInterval(interval)
    setInterval(Timmer, 1000);
    timmerstatus.innerText = "Timmer start"
})
resets.addEventListener('click', () => {
    click.play()
    clearInterval(interval)
    timmerhour.value = 0
    timmerminute.value = 0
    timmersecond.value = 0
    location.reload()
    timmerstatus.innerText = "Set Timmer"
})



// Stop watch javascript


let stopmin = document.querySelector(".stopmin")
let stopsec = document.querySelector(".stopsec")
let stopmili = document.querySelector(".stopmsec")
let startwatch = document.querySelector("#stop-start")
let stopswatch = document.querySelector("#stop-stop")
let resetwatch = document.querySelector("#stop-reset")


let mins = 0;
let secs = 0;
let mili = 0;
let watch = true;



startwatch.addEventListener('click', () => {

    click.play()
    watch = true;
    stopwatch()
})
stopswatch.addEventListener('click', () => {
    click.play()
    watch = false;

})
resetwatch.addEventListener('click', () => {
    click.play()
    watch = false;
    mins = 0;
    secs = 0;
    mili = 0;
    stopmili.innerText = "00"
    stopsec.innerText = "00"
    stopmin.innerText = "00"

})

stopwatch = () => {
    if (watch) {
        mili++;
        stopmili.innerHTML = mili < 10 ? `0${mili}` : mili
        stopsec.innerHTML = secs < 10 ? `0${secs}` : secs;
        stopmin.innerHTML = mins < 10 ? `0${mins}` : mins;
        if (mili >= 60) {
            secs++;
            mili = 0
        }
        if (secs >= 60) {
            mins++;
            secs = 0;
            mili = 0;
        }
        setTimeout("stopwatch()", 10)
    }
}


// change dislay
let logoclock = document.querySelector(".clock")
let logoalarm = document.querySelector(".Alarm")
let logotimmer = document.querySelector(".Stopwatch")
let logocwatch = document.querySelector(".Timmer")

let hideclock = document.querySelector(".wholebody")
let hidealarm = document.querySelector(".alarm-container")
let hidetimmer = document.querySelector(".timmer-container")
let hidewatch = document.querySelector(".stopwatch-container")

logoalarm.addEventListener('click', () => {
    hidealarm.classList.remove("offclock")
    hideclock.classList.add("offclock")
    hidetimmer.classList.add("offclock")
    hidewatch.classList.add("offclock")

    // background of navigation
    logoalarm.classList.add("navbackground")
    logoclock.classList.remove("navbackground")
    logocwatch.classList.remove("navbackground")
    logotimmer.classList.remove("navbackground")
})
logoclock.addEventListener('click', () => {
    hideclock.classList.remove("offclock")
    hidealarm.classList.add("offclock")
    hidetimmer.classList.add("offclock")
    hidewatch.classList.add("offclock")

    // background of navigation
    logoclock.classList.add("navbackground")
    logoalarm.classList.remove("navbackground")
    logocwatch.classList.remove("navbackground")
    logotimmer.classList.remove("navbackground")
})
logotimmer.addEventListener('click', () => {
    hidetimmer.classList.remove("offclock")
    hideclock.classList.add("offclock")
    hidealarm.classList.add("offclock")
    hidewatch.classList.add("offclock")

     // background of navigation
     logotimmer.classList.add("navbackground")
     logoclock.classList.remove("navbackground")
     logoalarm.classList.remove("navbackground")
     logocwatch.classList.remove("navbackground")

})
logocwatch.addEventListener('click', () => {
    hidewatch.classList.remove("offclock")
    hideclock.classList.add("offclock")
    hidetimmer.classList.add("offclock")
    hidealarm.classList.add("offclock")

     // background of navigation
     logocwatch.classList.add("navbackground")
     logoclock.classList.remove("navbackground")
     logoalarm.classList.remove("navbackground")
     logotimmer.classList.remove("navbackground")
})