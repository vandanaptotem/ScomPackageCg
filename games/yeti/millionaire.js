var node;
var base;
var messagebox;
var qholder;
var ladder;
var lifelinepanel;
var lifelines;
var player;
var time = 0;
var pollSelected;
var halfSelected;
var changeSelected;
var flag=0;
var pointsEarned;
var answered;
var e;
var quesbank=[];
var correctmessage;
var gcount=1;
var question;

$(function () {
    window.ondragstart = function() {return false}
    initVariables();
});

function initVariables() {
    $(".environment").remove();
    base = new Environment("base");
    messagebox = new Environment("messagebox");
    qholder = new Environment("qholder")
    ladder = new Environment("ladder");
    lifelinepanel = new Environment("lifelinepanel");
    lifelines = new Environment("lifelines");

    player = new Entity("player");
    correctmessage = new Environment("correctmessage");
    initTheme();
}

function initTheme() {
    loadConfig(base);
    $("#help").find('img').attr('src', getImg("kbc-button-know-more"));
    loadConfig(qholder);
    initQuiz();
    $("#knowmore").find('img').attr('src', getImg("kbc-button-know-more"));
    loadConfig(ladder);
    loadConfig(player);

    loadConfig(lifelinepanel);
    loadConfig(lifelines);

    loadConfig(messagebox);
    loadConfig(correctmessage);
    runGlobalObservers();

    player.location(ladder.ladder1);
    var lives = new Currency("lives");
    player.createWallet(lives, 0, 1, 1);
    initGame();
}

function runGlobalObservers() {
    $("#lifeline1img").mouseover(function() {
        lifelines.text.setState('lifeline1');
    });

    $("#lifeline2img").mouseover(function() {
        lifelines.text.setState('lifeline2');
    });

    $("#lifeline3img").mouseover(function() {
        lifelines.text.setState('lifeline3');
    });

    $("#lifelines .location").mouseout(function() {
        lifelines.text.setState('default');
    });

    $("#help").unbind('click').on('click', function(e) {
        initHowto(config.howtoData);
    });

}

function initGame() {
    pollSelected = false;
    halfSelected = false;
    changeSelected = false;
    pointsEarned = 0;
    answered = false;
    gameOn = true;
    showStartPage();
    if(flag==0) {
        quesbank = [];
        quesbank=Question.getAllByWeight(5, 3);
        quesbank = shuffle(quesbank);
    }
    else {
        quesbank = [];
        for(var i=flag; i<5; i++) {
            if(i==flag) {
                quesbank.push(Question.getBySubCat(5, question.subslide));
            }
            else
                quesbank.unshift(Question.getByWeightExSubcat(5,question.subslide));
        }
    }
}

function showStartPage() {
    messagebox.setState('instructions');

    showInstructions();
    $("#startgame").mouseover(function() {
        $(this).find('img').attr('src', getImg("kbc-button-start-hover"));
    });
    $("#startgame").mouseout(function() {
        $(this).find('img').attr('src', getImg("kbc-button-start"));
    });

    $("#showinst").mouseover(function() {
        $(this).find('img').attr('src', getImg("kbc-button-instruction-hover"));
    });
    $("#showinst").mouseout(function() {
        $(this).find('img').attr('src', getImg("kbc-button-instruction"));
    });

    $("#startgame").unbind('click').on('click', function() {
        $( "#kbc-back" ).attr( "src", getImg("kbc-background1"));
        gameTimer('start');
        messagebox.setState('default');
        $("#messagebox").fadeOut();
        playGame();
    });

    $("#showinst").unbind('click').on('click', function() {
        messagebox.setState('instructions');

        showInstructions();
    });

}

function showInstructions() {
    messagebox.setState('instruction');
    $("#messagebox").show();

    $("#startgame-inst").unbind('mouseover').on('mouseover', function() {
        $(this).find('img').attr('src', getImg("kbc-button-start-hover"));
    });
    $("#startgame-inst").unbind('mouseout').on('mouseout', function() {
        $(this).find('img').attr('src', getImg("kbc-button-start"))
    });
    $("#startgame-inst").unbind('click').on('click', function() {
        $( "#kbc-back" ).attr( "src", getImg("kbc-background1"));
        messagebox.setState('default');
        $("#messagebox").fadeOut();
        gameTimer('start');
        playGame();
    });
} 

function answerHover() {
    $(".answer-block").mouseover(function() {
        if(answered == false)
            $(this).find('img').attr('src', getImg("kbc-answer-hover-back"));
    });
    $(".answer-block").mouseout(function() {
        if(answered == false)
            $(".answer-block-back").attr('src', getImg("kbc-answer-back"));
    });

    $("#knowmore").mouseover(function() {
        $("#knowmore").find('img').attr('src', getImg("kbc-button-know-more-hover"));
        $("#knowmore").css({color: "white"});
    });
    $("#knowmore").mouseout(function() {
        $("#knowmore").find('img').attr('src', getImg("kbc-button-know-more"));
        $("#knowmore").css({color: "#3d2510"});
    });

    $("#help").mouseover(function() {
        $("#help").find('img').attr('src', getImg("kbc-button-know-more-hover"));
        $("#help").css({color: "white"});
    });
    $("#help").mouseout(function() {
        $("#help").find('img').attr('src', getImg("kbc-button-know-more"));
        $("#help").css({color: "#3d2510"});
    });
}

function playGame() {
    $("#player").find('img').attr('src', getImg("kbc-ladder-current"));
    lifelinepanel.setState('default');
    $("#lifelines .location").css({'pointer-events': "auto", 'cursor': "pointer"});
    question=quesbank.pop();

    $('#quiz').fadeIn(function () {
        Question.showQuizPanel(quiz, question);
        answered = false;
        $(".answer-block-back").attr('src', getImg("kbc-answer-back"));
        answerHover();
    });
    $(question).unbind('answered').on('answered', function (e, data) {
        flag++;
        if(answered == false) {
            answered = true;
            if(gcount==3)
                gameOn = false;
            if (data.correct == "true") {
                gcount++;
                $("#correctmessage").fadeIn(500).delay(2000).fadeOut(500);
                $(data.$this).find('img').attr('src', getImg("kbc-answer-correct-back"));
                setTimeout(function() {
                    player.location(ladder.nextLocation(player.location()));
                    ladder[ladder.prevLocation(player.location()).name].setState('complete');
                    if (gameOn)
                        playGame();
                    else {

                        endGame("I am very pleased. You did not make the wrong choice even though you needed my help. I am happy to" +
                            " direct you now. Go Forward!", question);
                        window.parent.setNodeCompleted(node);
                        var timr=gameTimer('stop');
                        window.parent.appendScore(sendScore());
                        window.parent.appendTime(sendTime());
                        window.parent.changeNodeState();
                        window.parent.scormCommit();
                    }

                }, 500);


            } else {
                setTimeout(function() {
                    player.lives.is(-1);
                }, 500);
                flag=gcount;
            }
        }
    });

    $(player.lives).unbind('min').on('min', function () {
        endGame("You have made the wrong choices! Please refer to the backpack and try again!", question);
        var timr=gameTimer('stop');
    });


    //---------------lifeline function----------------------


    $("#lifeline1img").unbind('click').on('click', function () {
        if(pollSelected == false) {
            $("#lifelinepanel").fadeIn();
            lifelinepanel.setState('lifeline1');
            $("#close").hide();

            $("#ok").unbind('click').on('click', function() {
                pollSelected = true;
                $("#poll-text").hide();
                $("#poll-chart").show();
                $(".button").hide();
                $("#close").show();
                lifelines.lifeline1img.setState('complete');
                $("#lifelines .location").css({'pointer-events': "none", 'cursor': "default"});
                usePoll(question);
            });

            $("#cancel").unbind('click').on('click', function() {
                lifelinepanel.setState('default');
            });

            $("#close").unbind('click').on('click', function() {
                lifelinepanel.setState('default');
                $("#lifelinepanel").hide();
                $("#lifelines .location").css({'pointer-events': "auto", 'cursor': "pointer"});
            });
        }
    });

    $("#lifeline2img").unbind('click').on('click', function () {
        if(halfSelected == false) {
            $("#lifelinepanel").fadeIn();
            lifelinepanel.setState('lifeline2');

            $("#ok").unbind('click').on('click', function() {
                halfSelected = true;
                useHalf(question);
                lifelines.lifeline2img.setState('complete');
//                $("#lifelines .location").css({'pointer-events': "auto", 'cursor': "pointer"});
                lifelinepanel.setState('default');
            });

            $("#cancel").unbind('click').on('click', function() {
                lifelinepanel.setState('default');
            });
        }
    });

    $("#lifeline3img").unbind('click').on('click', function () {
        if(changeSelected == false) {
            $("#lifelinepanel").fadeIn();
            lifelinepanel.setState('lifeline3');

            $("#ok").unbind('click').on('click', function() {
                changeSelected = true;
                playGame();
                lifelines.lifeline3img.setState('complete');
                lifelinepanel.setState('default');
            });

            $("#cancel").unbind('click').on('click', function() {
                lifelinepanel.setState('default');
            });
        }
    });
}

function usePoll(question) {
    var sum = 0;
    var pollData = [];

    for(var i = 0; i < question.options.length; i++) {
        if(i != question.options.length-1) {

            if(question.options[i].correct == "true") {
                var random = randBetween(30, 100);
                if((sum+random) > 100)
                    random -= ((sum+random)-100);
                sum += random;
                pollData.push(random);
            } else {
                var random = randBetween(0, 25);
                if((sum+random) > 100)
                    random -= ((sum+random)-100);
                sum += random;
                pollData.push(random);
            }
        } else {
            random = (100-sum);
            pollData.push(random);
        }
    }

    var data = google.visualization.arrayToDataTable([
        ['Option', 'Votes', { role: 'style' }],
        ['A ', pollData[0], '#222'],            // RGB value
        ['B ', pollData[1], '#222'],            // English color name
        ['C ', pollData[2], '#222'],
        ['D ', pollData[3], '#222']
    ]);

    var options = {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        legend: { position: "none" },
        hAxis: {
            title: 'Option'
        },
        vAxis: {
            title: 'Votes (%)',
            minValue: 0,
            maxValue: 100
        }
    };

    var chart = new google.visualization.ColumnChart(
        document.getElementById('poll-chart'));

    chart.draw(data, options);
}

function useHalf(question) {
    while(true) {
        var random1 = randBetween(0,100)%4;
        var random2 = randBetween(0,100)%4;
        while(random1 == random2) {
            random2 = randBetween(0,100)%4;
        }

        if((question.options[random1].correct == "false") && (question.options[random2].correct == "false")) {
            $(".answer-block").eq(random1).hide();
            $(".answer-block").eq(random2).hide();
            break;
        }
    }
}

function endGame(message, question) {
    messagebox.setState('endgame');
    if (message == "I am very pleased. You did not make the wrong choice even though you needed my help. I am happy to" +
    " direct you now. Go Forward!") {
        $("#playagain").css("visibility", "hidden");
        $("#backpack").css("visibility", "hidden");
        $("#messagebox").append("<input type='button' value='Continue' class='btn-ok'>");
        $(".btn-ok").css({
            top: "64%",
            left: "35%",
            "background-image": "url(img/active_instructionbutton.png)",
            width: "26%",
            height: "7%",
            border: "none",
            cursor:"pointer",
            color:"white",
            "font-size":"20px"
//            font-size:"24px"
        });
        $(".btn-ok").unbind('click').on('click', function () {
            parent.$("#story-zone-close").trigger('click').trigger('click');
        });
    }
    $("#messagebox").fadeIn();
    $("#endmessage").html('<span>'+message+'</span>');

    $("#playagain").unbind('mouseover').on('mouseover', function() {
        $(this).find('img').attr('src', getImg("kbc-button-play-again-hover"));
    });

    $("#playagain").unbind('mouseout').on('mouseout', function() {
        $(this).find('img').attr('src', getImg("kbc-button-play-again"))
    });

    $("#playagain").unbind('click').on('click', function() {
        messagebox.setState('default');
        $("#messagebox").hide();
        initVariables();
    });

    $("#backpack").unbind('click').on('click', function() {
        window.parent.openbackPack(question.slide, question.subslide);
    });
}

function sendScore(){
    return 0.16;
}

function setNodeId(nodeId){
    node=nodeId;
}

function getNodeId () {
    return node;

}

function sendTime(){
    return time;
}

function gameTimer(n){
    if(n=="start"){
        e=setInterval(function(){
            time++
        }, 1000);
    }
    else{
        clearInterval(e);
        return time;
    }
}

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}