var config = {};

config.initMana = 0;
config.initPower = 0;

config.launchpad = {
    type: "environment",
    states: [
        {name: "default", representation: "<img src='assets/img/background_page01.jpg'/>"}
    ],
    locations: [
        {name: "instructions", states: [
            {name: "start-btn", representation: "<img src='assets/img/start_button1.png'><span>Instructions</span>"}
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
            {name: "inst-btn", representation: "<span>Objective: Answer the questions correctly to trap the snow leopard.<br> Read the questions and try to answer them correctly to complete the game. Click on the buttons to turn off the wrong answers. Once you select the correct answer, the next question will appear.</span>"}
        ]},
        {name: "inst-btn", states: [
            {name: "inst-btn", representation: "<img src='assets/img/start_button1.png'><span class='inst-btn-txt'>Start Game</span>"}
        ]}


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
            representation: "<div class='victory-txt'><span>Bravo! You may proceed now!</span><span type='button' class='btn-ok' onclick='getMessage();'>Continue</span></div>"
        }
    ]

};



