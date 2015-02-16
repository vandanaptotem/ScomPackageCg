jQuery.fn.center = function(parent) {
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "absolute",
        "zIndex":   2,
        "top": ($(parent).height() - (this.outerHeight() / 2)) + /*$(parent).scrollTop()) +*/ "px",
        "left": ($(parent).width() - (this.outerWidth() / 2)) + /*$(parent).scrollLeft()) +*/ "px"
    });
    return this;
};

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

var node = 0, score= 0, time= 0, question;
var launchpad, mainPage,leftPanel, messages, transitions, strcompare="",qcount=0, quesbank = [], gcount=0;

$(function(){
   initGame();
});

function initGame() {
    launchpad = new Environment("launchpad");
    mainPage = new Environment("mainPage");
    leftPanel = new Environment("leftPanel");
    rightPanel = new Environment("rightPanel");
    answerPanel = new Environment("answerPanel");
    letterPanel = new Environment("letterPanel");
    messages = new Environment("messages");
	transitions = new Environment("transitions");

    loadConfig(launchpad);
    loadConfig(mainPage);
    loadConfig(leftPanel);
    loadConfig(rightPanel);
    loadConfig(answerPanel);
    loadConfig(letterPanel);
    loadConfig(messages);
	loadConfig(transitions);
    initQuiz();

    leftPanel.statue.setState("0");

    $("img").mousedown(function(){
        return false;
    });

    $("#start").unbind('click').on("click", function() {
		quesbank=[];
		Question.all = shuffle(Question.all);
		for(i in Question.all)
			quesbank.push(Question.all[i]);
		gcount = quesbank.length;
        $("#launchpad").fadeOut();
        $("#mainPage").fadeIn();
        paneldisplay();
        playQuiz();
    });


    initletter();
}

function paneldisplay() {
    gameTimer('start');
    $("#leftPanel").show();
    $("#rightPanel").show();
    $("#answerPanel").show();
    $("#letterPanel").show();
    $("#quiz").show();
	for(var i=0; i<$(".letter-block").length; i++) {
			letterPanel[$(".letter-block").eq(i).attr("id")].setState("default");
		}
}

function playQuiz() {

    $("#options").remove();
	
    question= quesbank.pop();
    var answer=Question.getAnswer(question);
    generateAnswerBlock(answer);

    $("#quiz").fadeIn(500,function(){
        Question.showQuizPanel(quiz,question);
    });
	
    $(".letter-block").unbind('click').on('click', function() {
        var charcode = parseInt($(this).attr("id").split('letter')[1]);
        var alphabet = String.fromCharCode(charcode);

        checkAnswer(answer, alphabet, this);
		letterPanel[$(this).attr("id")].setState("clicked");
    });
}

function generateAnswerBlock(answer)
{
    //$("#answerPanel").effect("slide");
    strcompare = "";
    $("#answerPanel").empty();

    for(var i=0;i<answer.length;i++)

        if(answer[i] != " ") {
            strcompare+="_";
            $("#answerPanel").append("_");
        }
        else {
            strcompare+=" ";
            $("#answerPanel").append(" ");
        }
}

function checkAnswer(answer, alphabet, obj) {

    var count=0;

    for(var i=0; i<answer.length; i++)
    {
        if(answer.charAt(i) == alphabet.toString() || answer.charAt(i) == alphabet.toString().toLowerCase()) {
		
            strcompare = setCharAt(strcompare, i, alphabet);
            $("#answerPanel").empty().append(strcompare);
            $(obj).addClass("no-click");
            count++;
        }
        else {
            $(obj).addClass("no-click");
        }
    }

    if(strcompare.toLowerCase()==answer.toLowerCase()) {
		showTransition(1);
		qcount++;
		
        count = parseInt(leftPanel.statue.getState());
        if(count<6) {
            	count--;
            	leftPanel.statue.setState(count+"");
        	}
		
        if(qcount==gcount) {
            displayMessage("Well done, Traveller! Only the righteous come this far! Go ahead and create history!", 1);
            window.parent.setNodeCompleted(node);
            var timr=gameTimer('stop');
            window.parent.appendScore(sendScore());
            window.parent.appendTime(sendTime());
            window.parent.changeNodeState();
            window.parent.scormCommit();
        }
        else {
            $(".letter-block").removeClass("no-click less-opacity");
            $("#start").trigger('click');
        }
    }

    if(count==0) {
        count = parseInt(leftPanel.statue.getState());
        if(count<6) {
            count++;
            leftPanel.statue.setState(count+"");
        }
        else {
            count++;
            leftPanel.statue.setState(count+"");
            displayMessage("Aha! You have lost her! Try again to seek her blessings!", 2);
        }
    }
}

function displayMessage(str,n) {
    $("#messages").removeClass("environment");
    $("#messages").css("display", "table");
    $("#messageBox").empty().append("<span id='txtMsg'>" + str + "</span>");

    if(n==1) {
        $("#messageBox").append("<span id='continue'>Continue</span>");
        $("#continue").unbind('click').on('click', function() {

        });
    }
    if(n==2) {
        $("#messageBox").append("<span id='try-again'>Try Again</span>");
        $("#try-again").unbind('click').on('click', function() {
            $("#start").trigger('click');
            $("#messages").fadeOut();
            $(".letter-block").removeClass("no-click");
            for(var i=0; i<$(".letter-block").length; i++) {
                letterPanel[$(".letter-block").eq(i).attr("id")].setState("default");
            }
            leftPanel.statue.setState("0");
        })
        $("#messageBox").append("<span id='backpack'>Backpack</span>");
        $("#backpack").unbind('click').on('click', function() {
            window.parent.openbackPack(question.slide, question.subslide);
            parent.$("#story-zone-close").trigger('click').trigger('click');
        });
    }
    $("#messages").fadeIn();
}

function initletter()
{
    for(var i=0; i<$("#letterPanel div").length; i++) {
        $("#letterPanel div").eq(i).addClass("letter-block");
    }
}

function showTransition(number) {
	
	if(number==0)
		var str = "Incorrect";
	else if(number==1)
		var str = "Correct";
	else
		var str = "Default";
	
	$("#transitionMessage span").text(str);
	$("#transitions").fadeIn(500);
	setTimeout(function() { $("#transitions").fadeOut(500); }, 1500);
	
}

function setCharAt (str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function shuffle(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function sendScore(){
    return Math.floor(1050/time);
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

function getMessage() {
    parent.$("#story-zone-close").trigger('click').trigger('click');
}

