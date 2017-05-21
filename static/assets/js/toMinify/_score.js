var scoreSaver = (function(){

    var timeTransform = function(time){
        var hms = time;   // your input string
        var a = hms.split(':'); // split it at the colons
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

        return seconds;
    };

    var sorted = function(score){
        var sortedScore = score.sort(function(a,b){
            return timeTransform(a.time) - timeTransform(b.time);
        });
        return sortedScore;
    };

    var list = function(score) {
        var sorted_score = sorted(score);

        for(var i = 0; i < sorted_score.length; i++) {

            if(i === 10)
                break;

            var index_name = sorted_score[i].name;
            var index_time = sorted_score[i].time;

            if (sorted_score !== "undefined" || sorted_score !== "null") {
                $('.score .wrapper ul').append('<li>' + (i+1) + '.' + index_name + '<span>' + index_time + '</span>' + '</li>');
            }
        }
    };

    var addScore = function(name, time){

        //use this clear if you want to reset the best 10 scores
        //localStorage.clear();

        if(localStorage){

            var saveName = new CustomEvent('saveName',
                { 'detail':
                    $('.register .input').val()
                }
            );
            document.dispatchEvent(saveName);

            name = saveName.detail;

            var timerStop = new CustomEvent('timerStop');
            document.dispatchEvent(timerStop);

            time = $('#d-timer h1').text();

            console.log('user time: ' + time + name);

            var score = JSON.parse(localStorage.getItem('scoreInfo')) || [];
            // add to it,
            score.push({'name': name, 'time': time});
            // then put it back.
            localStorage.setItem('scoreInfo', JSON.stringify(score));

            //use this clear if you want to reset the best 10 scores
            //localStorage.clear();

            $('.score .wrapper ul li').remove();

            list(score);
        }
    };

    var newGame = function() {
      $('.play_again').unbind().on('click', function(){

          var clearTimer = new CustomEvent('clearTimer');
          document.dispatchEvent(clearTimer);

          $('.score').css('visibility', 'hidden');
          $('.overlay').css('visibility', 'visible');

      })
    };


    function bindEvents(){
        document.addEventListener('gameStop', addScore, false);
        document.addEventListener('gameStart', newGame, false);
    }

    var init = function(){
        bindEvents();
        newGame();
    };

    return {
        init: init
    }

})();
$(document).ready(function () {
   scoreSaver.init();
});