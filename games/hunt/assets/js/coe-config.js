var config = {};

config.initMana = 0;
config.initPower = 0;

config.launchpad = {
    type: "environment",
    states: [
        {name: "default", representation: "<img src='assets/img/background_page01.jpg'/>"}
    ],
    locations: [
        {name: "inst-txt", states: [
            {name: "inst-btn", representation: "<div id='game-back'><img src='assests/img/background_page01.jpg'/>"}
        ]},
        {name: "inst-btn", states: [
            {name: "inst-btn", representation: "<img src='assets/img/start_button1.png'><span class='inst-btn-txt'>Start Game</span>"}
        ]},

        {name: "start", states: [
            {name: "start-btn", representation: "<img src='assets/img/start_button1.png'><span>Start</span>"}
        ]}
    ]
};
config.mainPage = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: "<img id='mainPageBg' src='assets/img/background_page02.jpg'/>"
        }
    ]
};

config.instruction= {
    type: "environment",
    states: [
        {name: "default", representation: ""}
    ],
    locations: [
        {name: "inst-txt", states: [
            {name: "inst-btn", representation: "<div id='inst-header'>HOW TO PLAY</div><div id='inst-content'><p>To save yourself, you will have to trap the beast.</p>" +
                "<p>Turn off the 3 wrong options to bring down the trap.</p>" +
                "<p '>You need to answer all the 3 questions correctly to get away safely.</div>"}
        ]},
        {name: "inst-btn", states: [
            {name: "inst-btn", representation: "<img src='assets/img/start_button1.png'><span class='inst-btn-txt'>Start Game</span>"}
        ]}


    ]

};
config.correctmessage = {
    type: "environment",
    states: [
        {name: "default", representation: "<img src='assets/img/correctmess.jpg'/>"}
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
            {name: "default", representation: "<img src='assets/img/about_task.png'><span>Can you see the snow leopard over there? He's ready to pounce on you. But you can save your self and there's only one way to do that. Trap him!Answer the Questions correctly to trap the leopard!.</span>"}

        ]},
        {name: "gameDisplay", states: [
            {name: "default", representation: "<img src='assets/img/snow_leopard_bg.png'>"}
        ]},
        {name: "smokes", states: [
            {name: "default", representation: "<img id='cageimg' src='assets/img/cage.png'>"},


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
                    {name: "default", representation: "<img src='assets/img/button_false.png'>"},
                    {name: "false", representation: "<img src='assets/img/button_false.png'>"},
                    {name: "true", representation: "<img src='assets/img/button_true.png'>"}
                ]});
        }
        return allLevels;
    }()
};

config.victoryState = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: "<div class='victory-txt'><span class='header'>Bravo! You may proceed now! And be careful!</span><span type='button' class='btn-ok' onclick='getMessage();'>Continue</span></div>"
        }
    ]

};



