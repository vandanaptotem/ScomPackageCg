var config = {};

config.initMana = 0;
config.initPower = 0;

config.launchpad = {
    type: "environment",
    states: [
        {name: "default", representation: "<img src='assets/img/background_pg01.jpg'/>"}
    ],
    locations: [
        {name: "inst-txt", states: [
            {name: "inst-btn", representation: "<div id='game-back'><img src='assests/img/background_page01.jpg'/>"}
        ]},

        {name: "start", states: [
            {name: "start-btn", representation: "<img src='assets/img/start_button.png'><span>START</span>"}
        ]}
    ]
};


config.instruction= {
    type: "environment",
    states: [
        {name: "default", representation: ""}
    ],
    locations: [
        {name: "inst-txt", states: [
            {name: "inst-btn", representation: "<div id='inst-header'>HOW TO PLAY</div>" +
                "<div id='inst-content' class='mCustomScrollbar'>" +
                "<p class='content'>To save yourself, you will have to trap the beast.</p>" +
                "<p class='content'>Turn off the 3 wrong options to bring down the trap.</p>" +
                "<p class='content'>You need to answer all the 3 questions correctly to get away safely.</div>"}
        ]},
        {name: "inst-btn", states: [
            {name: "inst-btn", representation: "<img src='assets/img/start_button.png'><span class='inst-btn-txt'>Start Game</span>"}
        ]}


    ]

};


config.correctmessage = {
    type: "environment",
    states: [
        {name: "default", representation: "<img src='assets/img/correctmess.jpg'/>"}
    ]
};
config.mainPage = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: "<img id='mainPageBg' src='assets/img/caves.jpg'/>"
        }
    ]
};

config.leftPanel = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: ""
        }
    ],
    locations: [
        {name: "statusPanel", states: [
            {name: "default", representation: "<img src='assets/img/about_task1.png'><span>The Caveman has 6 tickets worth INR 5000 each. His wife wants to exchange these tickets for a tiger-skin dress whereas his friend is offering twice the price. Also, the army man at the nearest post is asking for these tickets. And, then there is a client - an agency representative - who wants all 6 to take his family to the match and does not want the caveman to accompany him. Please advice the caveman appropriately.</span>"},

        ]},
        {name: "gameDisplay", states: [
            {name: "default", representation: "<img src='assets/img/caveman.png'>"}
        ]},
        {name: "smokes", states: [
            {name: "default", representation: "<div id='fog-holder'></div>"},
            {name: "0", representation: "<div class='st-0-op' id='fog-holder'></div>"},
            {name: "1", representation: "<div class='st-1-op' id='fog-holder'></div>"},
            {name: "2", representation: "<div class='st-2-op' id='fog-holder'></div>"},
            {name: "3", representation: "<div class='st-3-op' id='fog-holder'></div>"},
            {name: "4", representation: "<div class='st-4-op' id='fog-holder'></div>"},
            {name: "5", representation: "<div class='st-5-op' id='fog-holder'></div>"},
            {name: "6", representation: "<div class='st-6-op' id='fog-holder'></div>"},
            {name: "7", representation: "<div class='st-7-op' id='fog-holder'></div>"},
            {name: "8", representation: "<div class='st-8-op' id='fog-holder'></div>"},
            {name: "9", representation: "<div class='st-9-op' id='fog-holder'></div>"},
        ]}

    ]
};
config.switches = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: ""
        }
    ],
    locations: function () {
        var allLevels = [];
        for (var i = 1; i <= 4; i++) {
            allLevels.push({
                name: "switch"+i,
                states: [
                    {name: "default", representation: "<img src='assets/img/button_true.png'>"},
                    {name: "false", representation: "<img src='assets/img/button_false.png'>"},
                    {name: "true", representation: "<img src='assets/img/button_true.png'>"}
                ]});
        }
        return allLevels;
    }()
};
//<img src="assets/img/start_button.png">
config.victoryState = {
    type: "environment",
    states: [
        {
            name: "default",
//            representation: "<div class='victory-txt'><span>Thank you! You may enter now!</span><input type='button' value='Continue' class='btn-ok' onclick='getMessage();'></div>"
            representation: "<div class='victory-txt'><span class='header'>Thank you! You may enter now! Make yourself at home!</span><span type='button' class='btn-ok' onclick='getMessage();'>Continue</span></div>"
//            representation: "<div class='victory-txt'><img src='assets/img/start_button.png' id='end_game' onclick='alert('hi') '><span class='won_txt_span'>You Won<span></span></div>"
        }
    ]

};



