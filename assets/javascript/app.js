// QUESTIONS
var questions = [
    {
        text: 'THE SERIE WAS ORIGINALLY CALLED...',
        correct: 'THE FLAGSTONES',
        incorrect: 'THE STONE FAMILY',
        incorrect1: 'PREHISTORIC FAMILY',
        span: 'A short pilot of  The Flagstones, introduced Fred lounging in a pool. The name was perhaps changed to avoid confusion with the Flagstons, the family from the daily comic strip Hi and Lois introduced to newspapers in 1954.'
    }, {
        text: 'HANNA-BARBERA CONSIDERED MAKING THE SHOW ABOUT A...',
        incorrect: 'A FUTURE FAMILY',
        incorrect1: 'A PILGRIM FAMILY',
        correct: 'A ROMAN FAMILY',
        span: 'His studio considered a hillbilly family, a pilgrim family, a Native American family and a Roman family. Years after the success of The Flintstones, the latter idea would eventually come to fruition when Hanna-Barbera launched The Roman Holidays in 1972, about a family living in the year 63 CE.'
    }, {
        text: 'JOSEPH BARBERA PITCHED THE SHOW FOR...',
        incorrect: 'ONE YEAR',
        correct: 'EIGHT WEEKS',
        incorrect1: 'FEW HOURS',
        span: 'Barbera, pictured standing here, spent eight weeks in Manhattan, living in a hotel, pitching the sitcom to potential sponsors and networks. Nobody was biting. Finally, on his last day in the city, he presented the show to ABC, who took a chance.'
    }, {
        text: 'THE FLINTSTONES WERE ORIGINALLY GOING TO HAVE A...',
        incorrect: 'DOG',
        incorrect1: 'CAT',
        correct: 'SON',
        span: 'The family originally consisted of Fred, Wilma and Fred, Jr., seen here in a concept sketch. However, the tyke was ditched when the series began, as the show instead focused on the two adult couples. In season three, the creators decided to give the Flintstones a child. Again, the baby was going to be a boy, until a toy company explained there was much more money to be had selling a girl doll. Thus, Pebbles was born.'
    }, {
        text: '"YABBA-DABBA-DOO" WAS INSPIRED BY A BRYLCREEM SLOGAN',
        incorrect: 'FALSE',
        correct: 'TRUE',
        incorrect1: 'NONE',
        span: 'Alan Reed, the voice of Fred, was not thrilled with the scripts prompt to holler, Yahoo! Instead, he came up with the immortal "Yabba-dabba-doo!" Remembering a 1950s advertising campaign for the hair product Brylcreem, which proclaimed, "A little dab ll do ya, Reed came up with Freds familiar catchphrase.'
    }, {
        text: '...COMPANY SPONSORED THE SHOW',
        incorrect: 'COCA COLA',
        correct: 'WINSTON CIGAR',
        incorrect1: 'DONALD TRUMP',
        span: 'Now here is something you will never see again. As with most shows of the era, the characters were shown pitching their sponsor s products. Fred and Barney would light up Winston cigarettes in early seasons.'
    }];

var thisquestion = 0;

var correctAns = 0;
var wrongAns = 0;

var startClock = false;

var timer = 2;
var timercount;

var gamescounts = 0;

// CLOCK TIMER 30 seg  -------------------- >
function timeron() {
    $('.mainbox').html('<h1 class="timer"></h1>');
    if (startClock === false) {
        timer = 2;
        $('.timer').html(timer);
        timercount = setInterval(decrement, 1000);
    }
    startClock = true;
}
// Stop clock counting
function stop() {
    clearInterval(timercount);
    startClock = false;
}
// function decrement clock
function decrement() {
    // trigger timer less counting
    $('.timer').html(timer);
    timer--;

    if (startClock === true) {
        // when reach -1 seg add this to screen
        if (timer === -1) {
            $('.timer').hide();
            $('.span').append('<h1>TIME\'S UP</h1>' + '<p class="spananswer">' + questions[thisquestion].span + '</p>');
            $('.answer').hide();
            $('.question').hide();

            // ADD wrong counter +1
            wrongAns++;
            $('.countW').html(wrongAns);

            // change question
            thisquestion++;

            // when reach -6 seg stop counting and clear
        } else if (timer === -3) {
            gamescounts++;
            if (gamescounts !== 6) {
                stop();
                clear();
                populate();
            } else if (gamescounts === 6) {
                clear();
                gameover();
            }
        }
    }
} //  CLOCK FUNCTION END  <---------------------

function gameover() {
    if (gamescounts === 6) {
        clear();
        stop();
        $('.span').html('<h1 class="gameover">GAME OVER</h1>' + '<img src="assets/img/back2.jpg" class="thumbnail gameoverimg">');

        // show finals answers
        if (wrongAns > correctAns) {
            $('.wrong').css('color', 'red').css('font-size', '55px')
        }
        else if (wrongAns < correctAns) {
            $('.rigth').css('color', 'green').css('font-size', '55px')
        }
    }
}

// EREASE ALL MAIN BOX
function clear() {
    $('.mainbox').empty();
    $('.question').empty();
    $('.answer').empty();
    $('.span').empty();
}

// add legend of the qestion
function addspantext() {
    $('.span').append('<p class="incorrect">INCORRECT</p>' + '<button class="btn btn-success next">NEXT</button>' + '<p class="spananswer">' + questions[thisquestion].span + '</p>');
}

function populate() {
    // create buttons with user options. Correct and Incorrect
    $('.answer').html('<button class="btnop">' + questions[thisquestion].correct + '</button>').append('<button class="btnop">' + questions[thisquestion].incorrect + '</button>').append('<button class="btnop">' + questions[thisquestion].incorrect1 + '</button>');

    $('.question').show().append('<h2>' + questions[thisquestion].text + '</h2>');

    // call timer on and display ...
    timeron();

    // on user click btns conditions
    $('.btnop').on('click', function () {
        var userclick = $(this).text();

        // correct option
        if (userclick === questions[thisquestion].correct) {
            correctAns++;
            thisquestion++;
            gamescounts++;
            stop();
            clear();
            $('.rightanswer').show().fadeOut(3000, function () {
                if (gamescounts !== 6) {
                    populate()
                } else {
                    gameover();
                }
            });
        }
        // incorrect options
        else if (userclick === questions[thisquestion].incorrect || questions[thisquestion].incorrect1) {
            wrongAns++;
            gamescounts++;
            thisquestion++;
            stop();
            clear();
            if (gamescounts !== 6) {
                addspantext();
                $('.next').on('click', function () {
                    clear();
                    populate();
                })
            }
            else {
                gameover();
            }
        }
        // add rigth or wrong NUMBER to page
        $('.countR').html(correctAns);
        $('.countW').html(wrongAns);
    });
}

$(document).ready(function () {

    $('.rightanswer').hide()
// START GAME
    $('.start').on('click', function () {

        // TRIGGER EFFECTS, QUESTIONS, AUDIO
        $(this).hide();
        $('.picnav').show();
        $('.head').show();

        // ADD counters questions
        $('.rigth').show();
        $('.wrong').show();
        $('.audioDemo').trigger('play');

        populate();
    });

    $(".audioDemo").trigger('pause')
});


