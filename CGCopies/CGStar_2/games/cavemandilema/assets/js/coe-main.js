var time=0;
var e;
var node;

jQuery.fn.center = function(parent) {
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "absolute",
        "zIndex":   2,
        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
    });
    return this;
};
var launchpad, mainPage,leftPanel, switches, opacityState= 0,quesbank=[],count= 0,victoryState;
$(function(){
   initGame();

});
function initGame() {
    launchpad = new Environment("launchpad");
    instruction = new Environment("instruction");
    mainPage = new Environment("mainPage");
    leftPanel = new Environment("leftPanel");
    switches = new Environment("switches");
    victoryState = new Environment("victoryState");


    loadConfig(launchpad);
    loadConfig(instruction);
    loadConfig(mainPage);
    loadConfig(leftPanel);
    loadConfig(switches);
    loadConfig(victoryState);
    initQuiz();


    $("img").mousedown(function(){
        return false;
    });

    $("#start").unbind('click').on("click", function() {
        gameTimer('start');
        $("#launchpad").fadeOut();
        $("#mainPage").fadeIn();
        paneldisplay();
    });
    $("#inst-btn").unbind('click').on("click", function() {
        gameTimer('start');
        $("#launchpad").fadeOut();
        $("#mainPage").fadeIn();
        paneldisplay();
    });

    $("#instructions").unbind('click').on("click", function() {
        $("#launchpad").fadeOut();
        $("#instruction").fadeIn();

    });

//    $("#end_game").unbind('click').on("click", function() {
//        getMessage();
//    });

}

function paneldisplay() {

    $("#leftPanel").show();
    $("#statements").show();
    $("#switches").show();
    $("#statement-area").show();

    quesbank=shuffle(Question.getAllByWeight(2));
    leftPanel.statuspanel.setState("default");
    leftPanel.smokes.setState("default");
    playQuiz();


//    for(var i=1; i<=4; i++) {
//        switches["switch" + i].setState("true");
//    }
}


function playQuiz() {
    $("#switches").removeClass("no-click");
    for(var i=1; i<=4; i++) {
        switches["switch" + i].setState("true");
    }

    var dataset1 = [];
    var dataset2 = [];


    var question=quesbank.pop();

    for(i in question.options)
        dataset1.push(question.options[i].correct.toString());

    $("#quiz").fadeIn(500,function(){
        Question.showQuizPanel(quiz,question);
    });

    $(question).on('answered', function(e, data) {
        dataset2 = [];

        for(var i=0; i<switches.locations.length; i++)
            dataset2.push(switches["switch" + (i+1)].getState());
        var switchobj = switches["switch" + (data.optionId+1)];
        if(switchobj.getState() == (data.correct).toString()) {
            opacityState++;
        }
        else {
            opacityState--;

        }

        if(opacityState<0)
            opacityState=0;
        if(opacityState>9)
            opacityState=9;


        leftPanel.smokes.setState(opacityState + "");

        if(dataset1.join()==dataset2.join())
        {
            count++;
            if(count==3) {

                $("#victoryState").show();
                victoryState.setState("default");
                $("#switches").addClass("no-click");
                window.parent.setNodeCompleted(node);
                var timr=gameTimer('stop');
                window.parent.appendScore(sendScore());
                window.parent.appendTime(sendTime());

                window.parent.scormCommit();
                leftPanel.statuspanel.setState("victory");
                $("#switches").addClass("no-click");
            }
            else
                $("#statement-area, #options, #switches").animate({
                        opacity: 0
                    },
                    {
                        start: function() { $("#switches").addClass("no-click");},
                        complete: function() {
                            $(this).animate({
                                    opacity: 1
                                },
                                {
                                    start: playQuiz,
                                    complete: function() {
                                        $("#switches").removeClass("no-click");
                                    },
                                    duration: 600
                                });
                        },
                        duration: 600
                    });
        }
    });

    $("#switches div").unbind("click").on("click",function(){
        var switchobj = switches[$(this).attr("id")];
        if(switchobj.getState()=="true")
            switchobj.setState("false");
        else
            switchobj.setState("true");

        var index = $(this).index();
        $("#option-block-" + index).trigger("click");
    });

}

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
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

function sendTime (){
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
function getMessage() {
    parent.$("#story-zone-close").trigger('click').trigger('click');
}