var config = {};

config.initMana = 0;
config.initPower = 0;

config.launchpad = {
    type: "environment",
    states: [
        {name: "default", representation: "<img class='bg-img' src='"+getImg("hm-background")+"'/>"}
    ],
    locations: [
        {name: "main-logo", states: [
            {name: "default", representation:"<img src='"+getImg("hm-hang1")+"' />"}
        ]},
        {name: "instructions", states: [
            {name: "default", representation:"<h3 id='inst-heading'>HOW TO PLAY</h3> <span>"+ getText("hm-text-instructions") +"</span>"}
        ]},
        {name: "start", states: [
            {name: "start-btn", representation: "<span>START!</span>"}
        ]}
    ]
};

config.mainPage = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: "<img id='mainPageBg' src='"+getImg("hm-background")+"'/>"
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
        {name: "statue", states: [
            {name: "default", representation: "<img src='"+getImg("hm-hang1")+"'>"},
            {name: "0", representation: "<img class='st-0' src='"+getImg("hm-hang1")+"'>"},
            {name: "1", representation: "<img class='st-1' src='"+getImg("hm-hang1")+"'>"},
            {name: "2", representation: "<img class='st-2' src='"+getImg("hm-hang1")+"'>"},
            {name: "3", representation: "<img class='st-3' src='"+getImg("hm-hang1")+"'>"},
            {name: "4", representation: "<img class='st-4' src='"+getImg("hm-hang1")+"'>"},
            {name: "5", representation: "<img class='st-5' src='"+getImg("hm-hang1")+"'>"},
            {name: "6", representation: "<img class='st-6' src='"+getImg("hm-hang1")+"'>"},
            {name: "7", representation: "<img class='st-7' src='"+getImg("hm-hang1")+"'>"},
        ]}
    ]

};
config.rightPanel = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: "<img src='"+getImg("hm-right-panel")+"'>"
        }
    ]
};

config.messages = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: "<img src='assets/img/correct_page_bg.jpg' /><div id='messageBox'></div>"
        }
    ]
};

config.answerPanel = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: ""
        }
    ]
};

config.letterPanel = {
    type: "environment",
    states: [
        {
            name: "default",
            representation: ""
        }
    ],
    locations: function () {
        var allLevels = [];
        for (var i = 64; i < 90; i++) {
            var res = String.fromCharCode(i+1);
            allLevels.push({
                name: "letter"+(i+1),
                states: [
                    {name: "clicked", representation:"<img src='"+getImg("hm-tile-back-2")+"'><span>"+res+"</span>"},
					{name: "default", representation:"<img src='"+ getImg("hm-tile-back-1")+"'><span>"+res+"</span>"}
					
                ]});
        }

        return allLevels;
    }()
};

config.transitions = {
	type: "environment",
	states: [
		{
			name: "default",
			representation: "<img src='assets/img/correct_page_bg.jpg' />"
		}
	],
	locations: [
		{
			name: "transitionMessage",
			states: [
				{
					name: "default",
					representation: "<img src='assets/img/button.png' /><span></span>"
				}
			]
		}
	]
};