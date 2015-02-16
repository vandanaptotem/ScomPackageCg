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
var flag;
var pointsEarned;
var answered;
var e;
var quesbank=[];
var correctmessage;
$(function () {
    window.ondragstart = function() {return false}
    initVariables();
    window.parent.initCommunications();
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
    flag = 1;
    pointsEarned = 0;
    answered = false;
    gameOn = true;
    showStartPage();
    quesbank=Question.getAllByWeight(5, 4);

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
    var question=quesbank.pop();
    $('#quiz').fadeIn(function () {
        Question.showQuizPanel(quiz, question);
        answered = false;
        $(".answer-block-back").attr('src', getImg("kbc-answer-back"));
        answerHover();
    });
    $(question).unbind('answered').on('answered', function (e, data) {
        if(answered == false) {
            answered = true;
            flag++;
            if(player.location().name == "ladder3")
            gameOn = false;
            if (data.correct == "true") {
                $("#correctmessage").fadeIn(500).delay(2000).fadeOut(500);
                $(data.$this).find('img').attr('src', getImg("kbc-answer-correct-back"));
                setTimeout(function() {
                    player.location(ladder.nextLocation(player.location()));
                    ladder[ladder.prevLocation(player.location()).name].setState('complete');
                    var playerLocation = parseInt(player.location().name.split('ladder')[1]);
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
                flag++;
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

function incFlag() {
    flag++;
    if(flag == Question.all.length){
        flag = 0;
//        quizShuffle();
    }

}

function usePoll(question) {
    var sum = 0;
    var ctx = $("#poll-chart").get(0).getContext("2d");
    var data = {
        labels: ["A", "B", "C", "D"],
        datasets: [
            {
                label: "Poll",
                fillColor: "rgba(61, 37, 16,0.5)",
                strokeColor: "rgba(61, 37, 16,0.8)",
                highlightFill: "rgba(61, 37, 16,0.75)",
                highlightStroke: "rgba(61, 37, 16,1)",
                data: []
            }
        ]
    };

    for(var i = 0; i < question.options.length; i++) {
        if(i != question.options.length-1) {

            if(question.options[i].correct == "true") {
                var random = randBetween(30, 100);
                if((sum+random) > 100)
                    random -= ((sum+random)-100);
                sum += random;
                data.datasets[0].data.push(random);
//                data.labels[i] = data.labels[i]+" - "+random+"%";
            } else {
                var random = randBetween(0, 25);
                if((sum+random) > 100)
                    random -= ((sum+random)-100);
                sum += random;
                data.datasets[0].data.push(random);
//                data.labels[i] = data.labels[i]+" - "+random+"%";
            }
        } else {
            random = (100-sum);
            data.datasets[0].data.push(random);
//            data.labels[i] = data.labels[i]+" - "+random+"%";
        }
    }

    var myBarChart = new Chart(ctx).Bar(data, {

    });
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
        parent.$("#story-zone-close").trigger('click').trigger('click');
    });
}

function sendScore(){
    return Math.floor(500/time);
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