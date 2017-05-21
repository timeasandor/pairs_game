

     var game = (function() {
         var canvas = {};
         var ctx = {};
         // var x = {};
         // var y = {};
         var size = 100;
         var imageArray = [];
         var img = {};
         var first = {};
         var second = {};
         var action = 0;
         var el = {};
         var matrix = [];
         var click_1 = {};
         var click_2 = {};
         var pairs_total = 1;
         var reveled = [];

        var draw = function(){

            for(var i = 0; i < 6; i++){
                for(var j = 0; j < 6; j++){
                    ctx.beginPath();
                    ctx.fillStyle = 'rgb(0,' + Math.floor(255 - 42.5 * j) + ',' + Math.floor(255 - 42.5 * i) + ')';
                    ctx.fillRect(i * size, j * size, size, size);


                    el = {
                        x: i * size,
                        y: j * size,
                        sourceImg: imageArray.pop(),
                        color: 'rgb(0,' + Math.floor(255 - 42.5 * j) + ',' + Math.floor(255 - 42.5 * i) + ')'
                    };

                    matrix[i][j] = el;
                }
            }
        };

        var drawMatrix = function(x, y) {
             matrix = [];
             for(var i=0; i < x; i++){

                 matrix[i] = [];

                 for(var j=0; j < y; j++){
                     // Initializes
                     matrix[i][j] = '';
                 }
             }
         };

        var imgRandomPos = function(){

            imageArray = shuffle(imageArray);

            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            }
        };

         var countPairs = function(){
             pairs_total++;
             if(pairs_total === 19){

                 //stop Timer and save the player time & initialize score
                 var gameStop = new CustomEvent('gameStop');
                 document.dispatchEvent(gameStop);
                 var timerStop = new CustomEvent('timerStop');
                 document.dispatchEvent(timerStop);

                 onGameStart();

                 $('.score').css('visibility', 'visible');
                 $('.game').css('visibility', 'hidden');
                 pairs_total = 1;
             }
         };

        var onCanvas = function() {

            $(canvas).unbind('click').on('click', function(e) {
                var row = parseInt(e.offsetX / size);
                var col = parseInt(e.offsetY / size);

                var ell = matrix[row][col];
                ctx.beginPath();
                img = new Image();   // Create new img element

                function startLoad(){
                    if ((reveled.includes(ell) === false)) {

                        ctx.drawImage(img, row * size, col * size, size, size);

                        //wait for the second click
                        setTimeout(function () {
                            if (action === 0) {
                                click_1 = ell;
                                first = click_1.sourceImg.slice(-6, -4);
                                action = 1;
                            }
                            else if (action === 1) {
                                click_2 = ell;
                                second = click_2.sourceImg.slice(-6, -4);
                                action = 0;

                                if ((first === second) && ((click_1.x !== click_2.x) || (click_1.y !== click_2.y))) {

                                    ctx.beginPath();
                                    ctx.fillStyle = 'rgb(199, 188, 86)';
                                    ctx.fillRect(click_1.x, click_1.y, size, size);

                                    ctx.beginPath();
                                    ctx.fillStyle = 'rgb(199, 188, 86)';
                                    ctx.fillRect(click_2.x, click_2.y, size, size);

                                    countPairs();

                                    reveled.push(click_1);
                                    reveled.push(click_2);

                                }
                                else {
                                    ctx.beginPath();
                                    ctx.fillStyle = click_1.color;
                                    ctx.fillRect(click_1.x, click_1.y, size, size);

                                    ctx.beginPath();
                                    ctx.fillStyle = click_2.color;
                                    ctx.fillRect(click_2.x, click_2.y, size, size);
                                }
                            }
                        }, 200);
                    }
                }

                img.addEventListener("load", function () {

                    startLoad();

                }, false);

                img.src = ell.sourceImg;

            });
        };

        function onGameStart(){

            imageArray = ['assets/images/img_01.jpg', 'assets/images/img_02.jpg', 'assets/images/img_03.jpg', 'assets/images/img_04.jpg', 'assets/images/img_05.jpg', 'assets/images/img_06.jpg', 'assets/images/img_07.jpg', 'assets/images/img_08.jpg', 'assets/images/img_09.jpg',
                'assets/images/img_10.jpg', 'assets/images/img_11.jpg', 'assets/images/img_12.jpg', 'assets/images/img_13.jpg', 'assets/images/img_14.jpg', 'assets/images/img_15.jpg', 'assets/images/img_16.jpg', 'assets/images/img_17.jpg', 'assets/images/img_18.jpg', 'assets/images/img_01.jpg', 'assets/images/img_02.jpg', 'assets/images/img_03.jpg', 'assets/images/img_04.jpg', 'assets/images/img_05.jpg', 'assets/images/img_06.jpg', 'assets/images/img_07.jpg', 'assets/images/img_08.jpg', 'assets/images/img_09.jpg',
                'assets/images/img_10.jpg', 'assets/images/img_11.jpg', 'assets/images/img_12.jpg', 'assets/images/img_13.jpg', 'assets/images/img_14.jpg', 'assets/images/img_15.jpg', 'assets/images/img_16.jpg', 'assets/images/img_17.jpg', 'assets/images/img_18.jpg'];

            canvas = document.getElementById("visibleCanvas");
            ctx = canvas.getContext("2d");
            drawMatrix(6,6);
            imgRandomPos();
            draw();
            reveled.length = 0;
            onCanvas();
        }

        function bindEvents(){
            document.addEventListener('gameStart', onGameStart, false);
        }

        var init = function() {
            bindEvents();
        };

        return {
            init: init
        }
    })();
     $(document).ready(function () {
        game.init();
     });

