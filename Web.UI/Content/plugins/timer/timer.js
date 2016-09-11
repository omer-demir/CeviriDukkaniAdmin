// Alarm sound


var timerTime = 1800,          // Time set on the interval.
    timerInterval = 0;      // The interval for our loop.

var timerClock = $(".clock"),
    timerInput = $('#timer-input'),
    timerSoundsButton = $('#timer-sounds');

timerClock.text(returnFormattedToSeconds(timerTime));

$('.timer-btn.start').on('click',function(){
    if(timerTime>0) {
        startTimer();
    }
});

$('.timer-btn.pause').on('click', function () {
    pauseTimer();
});


timerClock.on('click',function(e){

    if(timerClock.hasClass('inactive')){
        if(timerTime>0) {
            startTimer();
        }
    }
    
});

function startTimer() {

    // Prevent multiple intervals going on at the same time.
    clearInterval(timerInterval);

    // Every 1000ms (1 second) decrease the set time until it reaches 0.
    timerInterval = setInterval(function () {
        timerTime--;
        timerClock.text(returnFormattedToSeconds(timerTime));

        if (timerTime <= 0) {
            timerClock.text(returnFormattedToSeconds(0));
            $('#TranslationResult').attr('disabled', 'true');
            pauseTimer();
        }
    }, 1000);

    timerInput.prop('disabled', true);
    timerClock.removeClass('inactive');
}


function pauseTimer(){
    clearInterval(timerInterval);

    timerClock.addClass('inactive');
}

function returnFormattedToSeconds(time){
    var minutes = Math.floor(time / 60),
        seconds = Math.round(time - minutes * 60);

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}