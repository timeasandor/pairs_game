
    var start_screen = (function () {


        var saveName = function(saveName){

            return saveName.detail;

        };

        var onStart = function(){

            $('.overlay .wrapper .start').unbind('click').on('click', function () {

                $('.overlay').css('visibility', 'hidden');
                $('.game').css('visibility', 'visible');

                var gameStart = new CustomEvent('gameStart');
                document.dispatchEvent(gameStart);
            });
        };


        function bindEvents(){
            document.addEventListener('clearTimer', onStart, false);
            document.addEventListener('saveName', saveName, false);
        }

        var init = function(){
            bindEvents();
            onStart();
        };

        return {
            init: init
        }

    })();
$(document).ready(function(){
    start_screen.init();
    });



