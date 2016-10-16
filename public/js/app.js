//var launch = '2016-09-18 23:59:59 GMT';

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t/1000) % 60);
    var minutes = Math.floor((t/1000/60) % 60);
    var hours = Math.floor((t/(1000*60*60)) % 24);
    var days = Math.floor(t/(1000*60*60*24));
    return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
    };
}

function initialiseClock(id, endtime) {
    var clock = document.getElementById(id);
    var timeinterval = setInterval(function() {
    var t = getTimeRemaining(endtime);
    clock.innerHTML = t.days + ' days ' +
                        t.hours + ' hours ' +
                        t.minutes + ' min ' +
                        t.seconds + ' sec';
    if(t.total <= 0) {
        clearInterval(timeinterval);
    }
    }, 1000);
}

//initialiseClock('clockdiv', launch);