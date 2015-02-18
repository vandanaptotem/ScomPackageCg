var platformData = {
        introduction: "",
        endMessage: "",
        formal: true,
        sequential: false,
        nodes: [
            {
                description: "So, you're ready to climb the Everest? Not so fast! You will have to go through a security check. Answer my questions and I'll let you pass.",
                sequence: 1,
                decks: [1],
                games: [4],
                videos: []
            },
            {
                description: "Snowstorm! Can't see a thing ahead, Can you? I could help but I need your expert advice first. If you give me the correct advice, I will let you enter my cave.",
                sequence: 2,
                decks: [2],
                games: [5],
                videos: []
            },
            {
                description: "Running is not an option here. You can't outrun the beast. How about trapping the beast? Try this quiz and you might be able to save yourself!",
                sequence: 3,
                decks: [3],
                games: [6],
                videos: []
            },
            {
                description: "Everything is under snow. All the roads leading up must be blocked now. You must find a way out of this mess. Try solving this quiz; it might lead you to your saviour!",
                sequence: 4,
                decks: [3],
                games: [2],
                videos: []
            },
            {
                description: "Lost your way?! I could help but I am hungry and have no money to eat at the taverns. Plus I am so bored.",
                sequence: 5,
                decks: [4],
                games: [3],
                videos: []
            },
            {
                description: "Welcome, Traveller! Many have come this far but only few could seek my blessings! Answer my questions and I shall bless you or else I shall disappear forever!",
                sequence: 6,
                decks: [6],
                games: [1],
                videos: []
            }
        ]
    };

var decks = [
    {
        id: '1',
        title: "Introduction to Ptotem",
        html: "An executive summary of Ptotem's business and plan",
        slides: 1
    },
    {
        id: '2',
        title: "Understand Serious Games",
        html: "Serious Games are big. Get an idea of what this space is all about.",
        slides: 1
    },
    {
        id: '3',
        title: "The Need Gap",
        html: "Every emerging industry comes with its set of opportunities. Discover them like we have.",
        slides: 1
    },
    {
        id: '4',
        title: "Discover Ptotemy",
        html: "The definitive global platform for building, buying and selling Serious Games",
        slides: 4
    },
    {
        id: '5',
        title: "Meet Ptotem",
        html: "Software is not just code. It is made of people too. Meet the Team and our Clients that make Ptotemy possible.",
        slides: 3
    },
    {
        id: '6',
        title: "The Plan",
        html: "We love it when a plan comes together. Get an idea of what is in store for the future.",
        slides: 3
    }
];

var games = [
    {
        id: '1',
        title: "The Final Test",
        html: "Click here to play the game!",
        name: "hangman",
        fullscreen: false
    },
    {
        id: '3',
        title: "Engage the Yeti",
        html: "Click here to play the game!",
        name: "yeti",
        fullscreen: false
    },
    {
        id: '2',
        title: "Find a way!",
        html: "Click here to play the game!",
        name: "icyterror",
        fullscreen: false
    },
    {
        id: '4',
        title: "Start Security Check",
        html: "Click here to play the game!",
        name: "securitypost",
        fullscreen: false
    },

    {
        id: '5',
        title: "Advice the Caveman",
        html: "Click here to play the game!",
        name: "cavemandilema",
        fullscreen: false
    },
    {
        id: '6',
        title: "Trap the Snow Leopard",
        html: "Click here to play the game!",
        name: "hunt",
        fullscreen: false
    }

];

var videos = [
    {
        id: '1',
        title: "The Ptotem Video",
        file: "img/ptotemy.mp4"
    }
];

var userdata = {
    decks: [
        {
            deckId: 1,
            complete: true
        },
        {
            deckId: 2,
            complete: true
        },
        {
            deckId: 3,
            complete: true
        },
        {
            deckId: 4,
            complete: true
        },
        {
            deckId: 5,
            complete: true
        },
        {
            deckId: 6,
            complete: true
        },
        {
            deckId: 7,
            complete: false
        },
        {
            deckId: 8,
            complete: false
        }
    ],
    games: [
        {
            gameId: 1,
            complete: true
        },
        {
            gameId: 2,
            complete: true
        },
        {
            gameId: 3,
            complete: true
        },
        {
            gameId: 4,
            complete: true
        },
        {
            gameId: 5,
            complete: true
        },
        {
            gameId: 6,
            complete: true
        }
    ]
};

