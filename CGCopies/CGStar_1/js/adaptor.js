var i;
var score= 0;
var nodeId;
var completedNode=[];
var e;
var time=0;
var currentNode = -1;

function initPage() {
    initCommunications();
    score = getScore()*100;
    time = parseInt(getSuspendData());
    if(isNaN(time))
        time  = 0;

    $('#story-wrapper').css('background-image', 'url(img/' + storyConfig.background + ')');
    $('#story-zone').css({
        backgroundImage: 'url(img/' + (platformData.formal ? storyConfig.zone.formalBack : storyConfig.zone.casualBack) + ')',
        left: storyConfig.zone.px + "%",
        top: storyConfig.zone.py + "%"
    });
    /* Set the Story Presenter */
    $('#story-presenter').css({
        left: storyConfig.presenter.px + "%",
        top: storyConfig.presenter.py + "%",
        width: storyConfig.presenter.width + "%"
    }).attr('src', 'img/' + storyConfig.presenter.image);

    /* Set the Story Nameplate */
    $('#story-nameplate').css({
        left: storyConfig.nameplate.px + "%",
        top: storyConfig.nameplate.py + "%",
        width: storyConfig.nameplate.width + "%"
    }).attr('src', 'img/' + storyConfig.nameplate.image);

    $('#story-compass').css({
        left: storyConfig.compass.px + "%",
        top: storyConfig.compass.py + "%",
        width: storyConfig.compass.width + "%"
    }).attr('src', 'img/' + storyConfig.compass.image);

    setTimeout(function () {
        $('#story-wrapper').fadeIn('slow')
        addNodes();
    }, 1000);


    initSideIcons();
    startPagebtn();
    initInstructions();
}
function startPagebtn(){

    $("#story-wrapper").append("<div id='start_button' class=' start_button'></div>");
    $("#start_button").append("<img src='img/start_button.png' id='start_first' />");

    $("#start_first").click(function (e){
        initBackpack();
        if(score === 0)
            scoredisp = 0;
        else
            scoredisp =score;

        if(time==0)
            timedisp="00:00"
        else
            timedisp = formatTime(time)

        $("#story-wrapper").append("<img src='img/scoreboard.png' id='story-scoreboard-container'/><span class='score_heading'>SCORE BOARD</span><span class='score_hurdle-name' id='score_node_name'></span><span class='score_hurdle-time' id='score_node_time'>" + timedisp + "</span><span class='score_hurdle-score' id='score_node'><b>"+scoredisp+"</b></span>");
        $("#start_first").css("display","none");
        $("#story-compass").css("display","none");
        $("#story-nodes").css("display","block");
        $("#score_node_name" ).html(storyConfig.nodes[0].name);

        if(parseInt(scormGetValue("cmi.objectives.0.id"))!=0 || scormGetValue("cmi.objectives.0.id") != "")
            changeNodeState();
    });
}

function initBackpack() {
    $("#story-wrapper").append("<table id='backpack-icon-wrapper' style='display: none;margin-top:10px;'></table>");
    $("#backpack-icon-wrapper").append("<tr></tr><tr></tr>");
    for(i in back_pack) {
        $("#backpack-icon-wrapper tr:first-child").append("<td class='back_pack_img' id='back_pack_img-"+ parseInt(i)+"'><img class='back-pack-icon' src='img/" + back_pack[i].icon + "' currid='" + back_pack[i].id + "'  slideid='" + back_pack[i].slide_id + "' /></td>");
        $("#backpack-icon-wrapper tr:last-child").append("<td class='back-pack-icon-name'>" + back_pack[i].name + "</td>");
    }
    $("#story-wrapper").append('<div class="back_pack_content"  style="display: none" id="back_pack_table">' +
        '<div class="top-content-header"><div class="top-content"></div><div class="close-btn"><br/><img src="img/close_grey.png" id="close_btn" class="slide_btn" width="60%" ></div></div>' +
        '<div class="left-slide"><div class="left-content"> <img src="img/circle_left.png" width="25px" height="25px" id="left_slide_btn" class="slide_btn"></div></div>' +
        '<div class="mid-slide"></div>' +
        '<div class="right-slide"><div class="right-content"><img src="img/circle_next_arrow.png" width="25px" height="25px" id="right_slide_btn" class="slide_btn"></div></div>' +
        '</div>')
    $(".back-pack-icon").unbind('click').on('click', function() {
        $(".side-icon-image:first-child").addClass('no-click');
        $("#back_pack_table").fadeIn(200).css('display','block');
        var slidid = parseInt($(this).attr("currid"));
        for(var i=0;i<back_pack.length;i++) {
            $("#back_pack_img-"+i+" img").attr("src", 'img/' + back_pack[i].icon);
            $(this).attr("src", 'img/' + back_pack[slidid - 1].icon_active);
            $(".back-pack-icon-name").eq(i).removeClass("back-pack-icon-active");
        }
        $(".back-pack-icon-name").eq($(this).parent().index()).addClass("back-pack-icon-active");
        var data;
        $('.left-slide').css('visibility', 'hidden');
        $('.right-slide').css('visibility', 'visible');

        for(i in slide_config) {
            if(slide_config[i].slide_id==slidid){
                data=slide_config[i].sub_slide;
            }
        }

        $("#left_slide_btn").attr("sub_slide_id",data[0].id-1);
        $("#left_slide_btn").attr("slide_id",slidid);
        $("#right_slide_btn").attr("sub_slide_id",data[0].id+1);
        $("#right_slide_btn").attr("slide_id",slidid);
        $( ".top-content" ).empty();
        $( ".mid-slide" ).empty();
        $(".top-content").append('<h4><b>'+data[0].sub_header+'</b></h4><br/>')
        $(".mid-slide").append(data[0].sub_contents);

        $("#left_slide_btn").unbind('click').on('click', function() {
            var slideid = parseInt($(this).attr("slide_id"));
            var subslideid = parseInt($(this).attr("sub_slide_id"));
            if(subslideid>1){
                $('.left-slide').css('visibility', 'visible');
            }
            else{
                $('.left-slide').css('visibility', 'hidden');
            }
            var slideid = parseInt($(this).attr("slide_id"));
            var subslideid = parseInt($(this).attr("sub_slide_id"));
            $("#left_slide_btn").attr("sub_slide_id",subslideid-1);
            $("#right_slide_btn").attr("sub_slide_id",subslideid+1);

            getSubSlide(subslideid,slideid);

        });
        $("#right_slide_btn").unbind('click').on('click', function() {

            $('.right-slide').css('visibility', 'visible');
            var slideid = parseInt($(this).attr("slide_id"));
            var subslideid = parseInt($(this).attr("sub_slide_id"));
            $("#right_slide_btn").attr("sub_slide_id",subslideid+1);
            $("#left_slide_btn").attr("sub_slide_id",subslideid-1);
            if(subslideid>1){
                $('.left-slide').css('visibility', 'visible');
            }
            getSubSlide(subslideid,slideid);
        });

        $("#close_btn").unbind('click').on('click', function() {
            $("#back_pack_table").fadeOut(200);
            $(".side-icon-image:first-child").removeClass('no-click');
            for(var i=0;i<=back_pack.length;i++){
                $("#back_pack_img-"+i+" img").attr("src",'img/'+ back_pack[i].icon);
                $(".back-pack-icon-name").eq(i).removeClass("back-pack-icon-active");
            }
        });

    })

}

function getSubSlide(sub_slide_id,slide_id){
    $('.right-slide').css('visibility', 'visible');

    var data;
    for(i in slide_config) {
        if(slide_config[i].slide_id==slide_id){
            data=slide_config[i].sub_slide;
        }
    }
    if(sub_slide_id==data.length){
        $('.right-slide').css('visibility', 'hidden');
    }
    $(".top-content" ).empty();
    $(".top-content").append('<h4><b>'+data[sub_slide_id-1].sub_header+'</b></h4><br/>');
    $(".mid-slide" ).empty();
    $(".mid-slide").append(data[sub_slide_id-1].sub_contents);
}

function initInstructions(){
    $("#story-wrapper").append('<div class="instruction_content"  style="display: none" id="instruction_table">' +
        '<div class="inst_content"><b>GAMEPLAY:</b><ul><li>You start at the base of the mountain.</li><li>Click on the checkpoints to play the mini-game</li><li>Complete the mini-game to move on to the next checkpoint</li><li>Click on "Backpack" if you need any help</li><li>Once you surpass the last checkpoint, you will get an acknowledgement.</li><li>Click "Ok" to register your score</li></ul><b>SCORING:</b><ul><li>Your score will be displayed on the bottom left corner along with the time</li><li>The faster you play, The more you score!</li><li>Earn bonus points by referring to the Backpack while playing a mini-game</li></ul><div class="close_instruction"><img src="img/close_grey.png" width="60%"></div></div></div>' +
        '</div>');
    $(".close_instruction").unbind('click').on('click', function() {
        $("#instruction_table").fadeOut(200);
    });
}
function initSideIcons() {
    $("#story-wrapper").append("<table id='sideiconpanel' class='sideicons'></table>");
    $("#sideiconpanel").append("<tr><td class='side-icon-image'><img src='img/back_pack.png' id='back_pack_img'/></td></tr>");
    $("#sideiconpanel").append("<tr><td class='side-icon-text'>Backpack</td></tr>");
    $("#sideiconpanel").append("<tr><td class='side-icon-image'><img src='img/instructions.png' id='instruction_img'/></td></tr>");
    $("#sideiconpanel").append("<tr><td class='side-icon-text'>How to Play</td></tr>");

//    On BackPack Click
    $("#back_pack_img").unbind('click').on('click', function (){
            var display_status_header=$('#backpack-icon-wrapper').css('display');
            if(display_status_header=='none'){
                $("#backpack-icon-wrapper").fadeIn(200).css('display','table');
            }
            else{
                $("#backpack-icon-wrapper").fadeIn(200).css('display','none');
            }
             $("#back_pack_table").fadeIn(200).css('display','none');
    });
    $("#instruction_img").click(function (e){
        var display_status_header=$('#instruction_table').css('display');
        if(display_status_header=='none') {
            $("#instruction_table").fadeIn(200).css('display', 'table');
        }
        else
        {
            $("#instruction_table").fadeIn(200).css('display','none');
        }
//            $("#backpack-icon-wrapper").fadeIn(200).css('display','none');
//            $("#back_pack_table").fadeIn(200).css('display','none');
    });
}

function addNodes() {
    var activeMarked = false;
    var nodeLength = storyConfig.nodes.length;
    for (i in storyConfig.nodes) {
        var nodeData = storyConfig.nodes[i];
        if (checkNodeInclusion(nodeData.sequence)) {
            var nodeStatus = checkNodeCompletion(nodeData.sequence);
            var nodePic, nodeClass;
            if (nodeStatus) {
                nodePic = storyConfig.nodepics.complete;
                nodeClass = "complete-node";
            } else {
                if (!activeMarked) {
                    nodePic = storyConfig.nodepics.active;
                    activeMarked = true;
                    nodeClass = "active-node";
                } else {
                    nodePic = storyConfig.nodepics.incomplete;
                    nodeClass = "incomplete-node";
                }
            }
            $('#story-nodes').append('<a href="#" tabindex="0" data-toggle="popover" class="story-node incomplete-node" id="story-node-' + (parseInt(i) + 1) + '" style="top:' + nodeData.py + '%;left:' + nodeData.px + '%"><img src="img/' + (nodeData.icon == "" ? nodePic : nodeData.icon_inactive) + '" alt=""/></a>');
            $("#story-node-1 img").attr("src", 'img/1.png');
            $( "#story-node-1" ).addClass("click-active" );


        }
    }
    bindToNodes("click1", "click-active");
    bindToNodes("hover", "story-node");

}

function bindToNodes(str, nodecls) {
    var storyNodes = $('.' + nodecls);
    if(str=="hover")
        storyNodes.popover({
            placement: function () {
                var thisNode = getNodeConfig(getSequence(this.$element));
                var direction;
                switch (true) {
                    case (thisNode.py < 40):
                        direction = "bottom";
                        break;
                    case (thisNode.py > 40 && thisNode.py < 60 && thisNode.px < 50):
                        direction = "right";
                        break;
                    case (thisNode.py > 40 && thisNode.py < 60 && thisNode.px > 50):
                        direction = "left";
                        break;
                    default:
                        direction = "top";
                }
                return direction
            },
            trigger: "hover",
            html: true,
            title: function () {
                return getNodeConfig(getSequence(this)).name
            },
            content: function () {
                var seq = getSequence(this);
                var photo = (getNodeConfig(seq).photo == "") ? '' : '<img class="popover-photo" src="img/' + getNodeConfig(seq).photo + '"/>';
                var desc = getNodeConfig(seq).description;
                var status = $(this).attr("class").split(" ")[1].split("-")[0];
                if (status == "final" || !platformData.sequential) {
                    return photo + desc;
                } else {
                    return photo + desc + '<br/><div class="popover-content-block ' + status + '-popover-content">' + status.toUpperCase() + '</div>';
                }
            }
    });
    if(str=="click1")
        storyNodes.on('click', function () {
            $('[data-toggle="popover"]').popover('hide');
            var seq = getSequence(this);
                 nodeId=seq;
            if (checkNodeAvailability(seq)) {
                showStoryZone(seq);
                $('#story-zone-close').on('click', function () {
                    $("#story-zone").fadeOut();
                    changeNodeState();
            });
            }
        });

    if(str=="click2")
        $(".complete-node").unbind('click').on('click', function () {
            ShowDialog();
        })
}

/* Show Story Zone */

function showStoryZone(sequence) {
    var thisNode = getNodeData(sequence);
    var thisNodeConfig = getNodeConfig(sequence);
    var $storyZone = $('#story-zone');
    $storyZone.empty();

    $('<a id="story-zone-close" href="#"><img src="img/close.png"/></a>').appendTo($storyZone);
    var $deck, $game, $video;
    if (platformData.formal) {

        var $zonePhoto = $('<img src="img/' + thisNodeConfig.photo + '" class="story-zone-photo"/>').appendTo($storyZone);
        var $zoneTale = $('<div class="story-zone-tale"><span>' + thisNode.description + '</span></div>').appendTo($storyZone);

        var $buttonBank = $('<div id="button-bank"></div>').appendTo($storyZone);

        for (i in thisNode.games) {
            var gameStatus = "";
            $game = $('<a href="#" class="zone-game zone-button ' + gameStatus + '" id="game-' + i + '-' + thisNode.games[i] + '">' + getGame(thisNode.games[i]).title + '</a>').appendTo($buttonBank);
        }

        bindZoneSections("left");
    } else {
        for (i in thisNode.decks) {
            $deck = $('<div class="zone-deck zone-section" id="deck-' + i + '-' + thisNode.decks[i] + '"></div>').appendTo($storyZone);
            $deck.append('<img src="img/' + storyConfig.zone.zoneIcons[Math.floor(Math.random() * storyConfig.zone.zoneIcons.length)] + '" />')
        }
        for (i in thisNode.games) {
            $game = $('<div class="zone-game zone-section" id="game-' + i + '-' + thisNode.games[i] + '"></div>').appendTo($storyZone);
            $game.append('<img src="img/' + storyConfig.zone.zoneIcons[Math.floor(Math.random() * storyConfig.zone.zoneIcons.length)] + '" />')
        }

        bindZoneSections("left");
        randomScatter('.zone-section', '#story-zone');
    }
    $storyZone.fadeIn();
}

function bindZoneSections(direction) {
    var zoneDecks = $('.zone-deck');
    var zoneGames = $('.zone-game');
    var zoneVideos = $('.zone-video');
    zoneDecks.popover({
        placement: direction,
        trigger: "hover",
        html: true,
        title: function () {
//            return getDeck($(this).attr("id").split("-")[2]).title;
        },
        content: function () {
            var deckId = $(this).attr("id").split("-")[2];
            var desc = getDeck(deckId).html;
            return desc;
        }
    });
    zoneGames.popover({
        placement: direction,
        trigger: "hover",
        html: true,
        title: function () {
//            return getGame($(this).attr("id").split("-")[2]).title;
        },
        content: function () {
            var gameId = $(this).attr("id").split("-")[2];
            var desc = getGame(gameId).html;
//            var status = checkGame(deckId) ? "complete" : "incomplete";
            return desc;
//            return desc + '<br/><div class="popover-content-block ' + status + '-popover-content">' + status.toUpperCase() + '</div>';
        }
    });

    zoneDecks.on('click', function () {
        showDeck($(this).attr("id").split("-")[2]);
    });
    zoneGames.on('click', function () {
        showGame($(this).attr("id").split("-")[2]);
        setTimeout(function () {
            var frm = $('.projector iFrame')[0].contentWindow;
            frm.setNodeId(nodeId);
        }, 1000);
    });
    zoneVideos.on('click', function () {
        showVideo($(this).attr("id").split("-")[2]);
    });

}


/* Get Sequence Number of node where event happens */

function getSequence(obj) {
    return parseInt($(obj).attr("id").split("-")[2]);
}

/* Get Configuration for a given Node  */

function getNodeConfig(sequence) {
    return jQuery.grep(storyConfig.nodes, function (a) {
        return ( a.sequence == sequence );
    })[0];
}

/* Get Author Customizations (description, decks and games) for a given Node  */

function getNodeData(sequence) {
    return jQuery.grep(platformData.nodes, function (a) {
        return ( a.sequence == sequence );
    })[0];
}

/* Check if a particular node has decks and games assigned to it in the Author Customization */

function checkNodeInclusion(sequence) {
    var obj = jQuery.grep(platformData.nodes, function (a) {
        return ( a.sequence == sequence );
    })[0];
    return (obj != undefined);
}

/* Check if a particular Node has been completed */

function checkNodeCompletion(sequence) {
    var thisNode = getNodeData(sequence);
    var requiredDecks = thisNode.decks;
    var nodeStatus = true;
    for (deck in requiredDecks) {
        if (!checkDeck(requiredDecks[deck])) nodeStatus = false;
    }
    var requiredGames = thisNode.games;
    for (game in requiredGames) {
        if (!checkGame(requiredGames[game])) nodeStatus = false;
    }
    return nodeStatus;
}

function checkNodeAvailability(sequence) {
    var sequence_array = [];
    for (i in platformData.nodes) {
        sequence_array.push(parseInt(platformData.nodes[i].sequence));
    }
    sequence_array.sort();
    return (sequence == 1 || !platformData.sequential) ? true : checkNodeCompletion(sequence_array[sequence_array.indexOf(sequence) - 1]);
}

/* Get Deck by Id */

function getDeck(id) {
    return jQuery.grep(decks, function (a) {
        return ( a.id == id );
    })[0];
}
function getGame(id) {
    return jQuery.grep(games, function (a) {
        return ( a.id == id );
    })[0];
}

function getVideo(id) {
    return jQuery.grep(videos, function (a) {
        return ( a.id == id );
    })[0];
}

function checkDeck(id) {close
    var userDataDeck = jQuery.grep(userdata.decks, function (a) {
        return ( a.deckId == id );
    })[0];
    if (userDataDeck.complete) return true;
}

function checkGame(id) {
    var userDataGame = jQuery.grep(userdata.games, function (a) {
        return ( a.gameId == id );
    })[0];
    if (userDataGame.complete) return true;
}

function randomScatter(objects, plane) {
    var planeWidth = $(plane).width() * 0.6;
    var planeHeight = $(plane).height();
    var objectCount = $(objects).length;
    var hStep = parseInt(planeWidth / objectCount);
    $.each($(objects), function (index, elm) {
        $(elm).css({
            left: Math.floor(index * hStep + 0.33 * planeWidth),
            top: Math.floor(Math.random() * 0.4 * planeHeight) + 0.3 * planeHeight
        });
    });
}

function showDeck(deckId) {
    var thisDeck = getDeck(deckId);
    var $storyZone = $('#story-zone');

    $storyZone.append('<div class="projector-title projection">' + thisDeck.title + '<img src="img/fullscreen.png" class="fullscreener pull-right" title="Go FullScreen"/></div>');
    $storyZone.append('<div class="projector-nav projection"></div>');
    var $projector = $('<div class="projector projection"></div>').appendTo($storyZone);
    $('#story-zone-close').unbind().on('click', function () {

        $('.projection').remove();
        $('#story-nameplate').fadeIn();
        $(this).on('click', function () {
            $("#story-zone").fadeOut();
        });
        changeNodeState();
    });
    for (var j = 1; j < thisDeck.slides + 1; j++) {
        $projector.append('<div><img src="img/decks/' + deckId + '/Slide' + j + '.JPG"/></div>')
    }
    $projector.slick({
        autoplay: false,
        arrows: true,
        infinite: false,
        appendArrows: $('.projector-nav'),
        prevArrow: '<button type="button" class="btn btn-warning btn-lg" style="color: black">Previous</button>',
        nextArrow: '<button type="button" class="btn btn-warning btn-lg pull-right" style="color: black">Next</button>'
    });

    $('.fullscreener').click(function () {
        $('#story-wrapper').fadeOut();
        $('#full-wrapper').slideDown(function () {
            var $fullProjector = $('<div class="fullprojector fullprojection"></div>').appendTo($(this));
            var $fullCloser = $('<div class="fullcloser fullprojection"><button type="button" class="btn btn-danger btn-lg" style="color: black"> Close </button></div>').appendTo($(this));

            for (var j = 1; j < thisDeck.slides + 1; j++) {
                $fullProjector.append('<div><img src="img/decks/' + deckId + '/Slide' + j + '.JPG"/></div>')
            }
            $fullProjector.slick({
                autoplay: false,
                arrows: true,
                infinite: false,
                prevArrow: '<button type="button" class="btn btn-warning btn-lg" style="color: black"> Previous </button>',
                nextArrow: '<button type="button" class="btn btn-warning btn-lg pull-right" style="color: black"> Next </button>'
            });

            $fullCloser.on('click', function () {
                $('#full-wrapper').fadeOut();
                $('#story-wrapper').fadeIn();
                $('.fullprojection').remove();
            })

        });
    })

}

function HideDialog(){
    $("#overlay").hide();
    $("#dialog").fadeOut(300);
}
$("#btnClose").click(function (e){
    HideDialog();
    e.preventDefault();
});
$("#btnSubmit").click(function (e){
    HideDialog();
    setScore(0);
    setSuspendData("");
    scormSetValue("cmi.objectives.0.id", 0);
    scormCommit();
    var result =  window.location.href.substring(0,  window.location.href.length-1);
    window.location.replace(result);
    e.preventDefault();
});
function ShowDialog(modal){
    $("#overlay").show();
    $("#dialog").fadeIn(300);
    if (modal)
    {
        $("#overlay").unbind("click");
    }
    else
    {
        $("#overlay").click(function (e)
        {
            HideDialog();
        });
    }
}
function showGame(gameId) {
    var thisGame = getGame(gameId);
    var $storyZone = $('#story-zone');

    if (thisGame.fullscreen) {
        $('#story-wrapper').fadeOut();
        $('#full-wrapper').slideDown(function () {
            var $fullProjector = $('<div class="fullprojector fullprojection"></div>').appendTo($(this));
            $fullProjector.append(' <iframe src="games/' + thisGame.name + '/index.html" width="1080px" height="640px"></iframe>')

            var $fullCloser = $('<div class="fullcloser fullprojection"><button type="button" class="btn btn-danger btn-lg" style="color: black"> Close </button></div>').appendTo($(this));
            $fullCloser.on('click', function () {
                $('#full-wrapper').fadeOut();
                $('#story-wrapper').fadeIn();
                $('.fullprojection').remove();
            })
        });
    }
    else {

        var $projector = $('<div class="projector projection" style="top:48px"></div>').appendTo($storyZone);
        $('#story-zone-close').unbind('click').on('click', function () {
            if($('.projector iFrame').length>0) {
                changeNodeState();
            }

            $('.projection').remove();
            $('#story-nameplate').fadeIn();
            $(this).on('click', function () {
                $(this).unbind('click');
                $("#story-zone").fadeOut();
            });
        });
        $projector.append(' <iframe src="games/' + thisGame.name + '/index.html" width="640" height="480"></iframe>')
    }




}

function showVideo(videoId) {
    var thisVideo = getVideo(videoId);
    var $storyZone = $('#story-zone');
    $storyZone.append('<div class="projector-title projection">' + thisVideo.title + '<img src="img/fullscreen.png" class="fullscreener pull-right" title="Go FullScreen"/></div>');
    var $projector = $('<div class="projector projection"></div>').appendTo($storyZone);
    $('#story-zone-close').unbind().on('click', function () {
        $('.projection').remove();
        $('#story-nameplate').fadeIn();
        $(this).on('click', function () {
            $("#story-zone").fadeOut();
            changeNodeState();
        });
    });
    $projector.append('<video id="bgvid"><source src="' + thisVideo.file + '" poster="img/poster.jpg" type="video/mp4"></video><div id="buttonbar" class="video-nav projection"><button id="story-video-restart" class="btn btn-warning btn-lg" onclick="restart();">Restart</button><button id="story-video-play" class="btn btn-danger btn-lg pull-right" onclick="vidplay()">Play</button></div>');
    $('.fullscreener').click(function () {
        var video = document.getElementById("bgvid");
        video.pause();
        $('#story-wrapper').fadeOut();
        $('#full-wrapper').slideDown(function () {
            var $fullProjector = $('<div class="fullprojector fullprojection"></div>').appendTo($(this));
            var $fullCloser = $('<div class="fullcloser fullprojection"><button type="button" class="btn btn-danger btn-lg" style="color: black"> Close </button></div>').appendTo($(this));

            $fullProjector.append('<video id="bgvidFull"><source src="' + thisVideo.file + '" type="video/mp4"></video><div id="buttonbar" class="video-nav projection"><button id="story-video-restart-full" class="btn btn-warning btn-lg" onclick="fullrestart();">Restart</button><button id="story-video-play-full" class="btn btn-danger btn-lg pull-right" onclick="fullvidplay()">Play</button></div>');

            $fullCloser.on('click', function () {
                $('#full-wrapper').fadeOut();
                $('#story-wrapper').fadeIn();
                $('.fullprojection').remove();
            })

        });
    })
}

function vidplay() {
    var video = document.getElementById("bgvid");
    var button = document.getElementById("story-video-play");
    if (video.paused) {
        video.play();
        button.textContent = "Pause";
    } else {
        video.pause();
        button.textContent = "Play";
    }
}

function restart() {
    var video = document.getElementById("bgvid");
    video.currentTime = 0;
}

function fullvidplay() {
    var video = document.getElementById("bgvidFull");
    var button = document.getElementById("story-video-play-full");
    if (video.paused) {
        video.play();
        button.textContent = "Pause";
    } else {
        video.pause();
        button.textContent = "Play";
    }
}

function fullrestart() {
    var video = document.getElementById("bgvidFull");
    video.currentTime = 0;
}

function setNodeCompleted(n){
    scormSetValue("cmi.objectives.0.id", n);
    scormCommit();
}

function changeNodeState(){

    if(currentNode === -1)
        var curCompleteNode = parseInt(scormGetValue("cmi.objectives.0.id"));
    else
        var curCompleteNode = currentNode;

    for(var i=1;i<=curCompleteNode;i++){
        var nodeData = storyConfig.nodes[i-1];
        $("#story-node-"+ i +" img").attr("src",'img/'+ nodeData.icon_complete);
        $("#story-node-"+ i).removeClass( "incomplete-node").addClass("complete-node");
        if(i<6) {
            var curnode = storyConfig.nodes[i];
            $("#story-node-" + (i + 1) + " img").attr("src", 'img/' + curnode.icon_active);
            $("#story-node-" + (i + 1)).removeClass("incomplete-node").addClass("click-active");
        }
        else {
            modale_last();
        }
    }

    bindToNodes("click1", "click-active");
    bindToNodes("click2", "complete-node");
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


function appendScore(gamescore){
    score+=gamescore;
    $("#score_node").html(score);
    setScore(score/100);
    scormCommit();
}

function appendTime(gametime){
    time+=gametime;

    var hh = Math.floor(time / 3600);
    time -= hh * 3600;
    var mm = Math.floor(time / 60);
    time -= mm * 60;
    var ss = time;

    if (mm<10) mm = "0" + mm;
    if (ss<10) ss = "0" + ss;

    $("#score_node_time").html(mm +":" + ss);
    setSuspendData(time);
    scormCommit();
}

function modale_last()
{
    var  d=new Date();
    var date= d.toLocaleDateString()
    $("#story-wrapper").append('<div class="modal-main"></div>');
    $(".modal-main").append('<div class="modal-text">'+
        '<h4>'+'Acknowledgement' +'</h4>'+'<p>'
        +'"I have received a copy of STAR India BU’s Corporate Governance Policies and Procedures.'+
        'These Policies and Procedures outline certain responsibilities that I have to STAR INDIA while performing ' +
        'the services to them. These Policies and Procedures are not intended to cover every situation that may ' +
        'arise during performance of my services to STAR INDIA; I will consult with the Corporate Governance ' +
        'committee of STAR INDIA if any questions arise.' +'</p>'+'<p>'+
        'I will familiarize myself with the contents of the policies and procedures and comply with them.”' +'</p><p>'+
        date+'</p></div>'+'<div class="ack-btn-box">'+'<input type="button" class="ack-btn" value="ok">'+'</div>');

    $(".ack-btn").unbind('click').on('click', function() {
        $(".modal-main").fadeOut(500);
        setCompletionStatus("completed");
        scormCommit();
    });
}

function openbackPack(n){
    $("#back_pack_img").trigger('click');
    $(".back-pack-icon").eq(n-1).trigger('click');

}
