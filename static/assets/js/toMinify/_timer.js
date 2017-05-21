var Timer = (function(){

    var h1 = $('h1')[0];
    var start = $('#start');
    var pause = $('#pause');
    var clear = $('#clear');
    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    var t;

    var add = function(){
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }

        h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
                (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
                (seconds > 9 ? seconds : "0" + seconds);

        timer();
    };

    var timer = function(){
      t = setTimeout(add, 1000);
    };

    var startFunc = function(){
        $('#start').css('visibility', 'hidden');
        $('#visibleCanvas').css('pointer-events', 'initial');
    };

    var pauseFunc = function(){
        $('#start').css('visibility', 'visible');
        $('#visibleCanvas').css('pointer-events', 'none');
    };
    var stopFunc = function(){
        clearTimeout(t);
    };
    var clearFunc = function(){
        h1.textContent = "00:00:00";
        seconds = 0;
        minutes = 0;
        hours = 0;
    };

    var onTimer = function(){
        start.unbind('click').on('click', function(){
            timer();
            startFunc();
        });
        pause.unbind('click').on('click', function() {
            clearTimeout(t);
            pauseFunc();
        });
        clear.unbind('click').on('click', function() {
            clearFunc();
        });
    };

    var onTimerStart = function(){
        timer();
        onTimer();
    };
    
    var bindEvents = function () {
        //document.addEventListener('gameStop', stopFunc, false);
        document.addEventListener('timerStop', stopFunc, false);
        document.addEventListener('gameStart', onTimerStart, false);
        document.addEventListener('clearTimer', clearFunc, false);
    };

    var init = function(){
        bindEvents();
    };

    return {
        init: init
    }
})();
var loaded = 0;
$(document).ready(function () {
   if(loaded === 0){
       Timer.init();
       loaded = 1;
   }
});
