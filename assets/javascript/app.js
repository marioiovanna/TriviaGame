
$( document ).ready(function() {

    var correctAns = 0;
    var wrongAns = 0;
    var startClock = false;

    var timer = 21;
    var timercount;

    // QUESTIONS
    var questions = [{

        text: 'THE SERIE WAS ORIGINALLY CALLED...',
        correct: 'THE FLAGSTONES',
        incorrect: 'THE STONE FAMILY', 
        incorrect1: 'PREHISTORIC FAMILY',
        span : 'A short pilot of  The Flagstones, seen here, introduced Fred lounging in a pool. The name was perhaps changed to avoid confusion with the Flagstons, the family from the daily comic strip Hi and Lois introduced to newspapers in 1954.'
    },{        
        text: 'HANNA-BARBERA CONSIDERED MAKING THE SHOW ABOUT A...',
        correct: 'A ROMAN FAMILY',
        incorrect: 'A ROMAN FAMILY', 
        incorrect1: 'A PILGRIM FAMILY',
        span : 'His studio considered a hillbilly family, a pilgrim family, a Native American family and a Roman family. Years after the success of The Flintstones, the latter idea would eventually come to fruition when Hanna-Barbera launched The Roman Holidays in 1972, about a family living in the year 63 CE.'
    },{        
        text: 'JOSEPH BARBERA PITCHED THE SHOW FOR...',
        incorrect: 'ONE YEAR', 
        correct: 'EIGHT WEEKS',
        incorrect1: 'FEW HOURS',
        span : 'Barbera, pictured standing here, spent eight weeks in Manhattan, living in a hotel, pitching the sitcom to potential sponsors and networks. Nobody was biting. Finally, on his last day in the city, he presented the show to ABC, who took a chance.'
    },{
        text: 'THE FLINTSTONES WERE ORIGINALLY GOING TO HAVE A...',
        incorrect: 'DOG', 
        incorrect1: 'CAT',
        correct: 'SON',        
        span : 'The family originally consisted of Fred, Wilma and Fred, Jr., seen here in a concept sketch. However, the tyke was ditched when the series began, as the show instead focused on the two adult couples. In season three, the creators decided to give the Flintstones a child. Again, the baby was going to be a boy, until a toy company explained there was much more money to be had selling a girl doll. Thus, Pebbles was born.'
    },{
        text: '"YABBA-DABBA-DOO" WAS INSPIRED BY A BRYLCREEM SLOGAN',
        incorrect: 'FALSE', 
        correct: 'TRUE',
        incorrect1: 'NONE',
        span : 'Alan Reed, the voice of Fred, was not thrilled with the scripts prompt to holler, Yahoo! Instead, he came up with the immortal "Yabba-dabba-doo!" Remembering a 1950s advertising campaign for the hair product Brylcreem, which proclaimed, "A little dab ll do ya, Reed came up with Freds familiar catchphrase.'
    },{
        text: '...COMPANY SPONSORED THE SHOW',
        incorrect: 'COCA COLA', 
        incorrect1: 'DONALD TRUMP',
        correct: 'WINSTON CIGAR',
        span : 'Now here is something you will never see again. As with most shows of the era, the characters were shown pitching their sponsor s products. Fred and Barney would light up Winston cigarettes in early seasons.'
    }]


    // TIMER 30 seg
    function timeron() {
        if (!startClock) {
        timercount = setInterval(decrement, 1000);
        startClock = true;
        }
    function decrement() {
    timer--;
    if (timer === 0) {
        stop()
    }
    $('#timer').html(timer);
    }
    function stop() {
        clearInterval(timercount);
    startClock = false;
    }  
};

// POP UP QUESTIONS
    var n = Math.floor(Math.random() * questions.length);

    function appques() {
    // EREASE ALL   
    $('.question').empty();
    $('.answer').empty();
    
    $('.question').append('<h2>' + questions[n].text + '</h2>');
    $('.answer').append('<button class="btnop" value=0>' +  questions[n].correct + '</button>');
    $('.answer').append('<button class="btnop">' + questions[n].incorrect + '</button>');
    $('.answer').append('<button class="btnop">' + questions[n].incorrect1 + '</button>');

    console.log(n);
    console.log(questions[n].text)
    console.log(questions[n].correct)
    };

    function span(){
        $('.span').append('<p>' + questions[n].span + '</p>'); 
    }


// START GAME
$('.start').click(function() {

    // TRIGGER EFFECTS, QUESTIONS, AUDIO
    $(this).hide();
    $('.picnav').show();
    $('.head').show();
    $('.rigth').show();
    $('.wrong').show();
    $('.audioDemo').trigger('play');



    appques();
    timeron();

    // PRESS BTNS
    $('button').click(function() {
        var userclick = ($(this).text());
          console.log(userclick);   

    // CONDICTIONS
    if ( userclick == questions[n].correct) {
      correctAns++;
      appques();
      
    } else if (userclick == questions[n].incorrect) {
        wrongAns++;
        appques();
        span();

    } else if (questions[n].incorrect1) {
        wrongAns++;
        appques();
        span();
        
    } else if (startClock === false) {
        alert('oooogggg');
        $('.span').append('<p>' + 'TIME\'S UP !!!!' + '</p>'); 

    };

    $('.rigth').append(correctAns);
    $('.wrong').append(wrongAns);

console.log('wrongs  ' + wrongAns);
console.log('wins  ' + correctAns);
console.log('time ' + startClock);
  });

});
$(".audioDemo").trigger('pause');


});
