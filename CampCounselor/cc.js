const NOUN = 0
const VERB = 1
const NAME = 2
const ADJECTIVE = 3
const ADVERB = 4
const GREETING = 5
const RULE = 7
const QUESTION = 8
const FEAR = 9
const VERBN = 10 //not -ing
const REASON = 11


var playerCount = 3
playerCount = sessionStorage['playerCount'];
// sessionStorage.removeItem( 'playerCount' ); // Clear the localStorage
console.log("Player Count:" + playerCount)

var container = document.getElementById('input-container')

var intros = [
    ["Good morning, campers! My name is ", NAME, " and I'll be your counselor this week. I'm excited to have lots of ", ADJECTIVE, " ", NOUN, " here at Camp ", NOUN, "!"],
    [GREETING, " My name is ", NAME, ". We're going to have lot's of fun this week. We'll start off the week by watching me ", VERB, ". But only if all you campers are ", ADJECTIVE, "!"],
    ["Hey, I'm ", NAME, ". I'm only here because I was wondering ", QUESTION, "I thought about the answer to that while I was ", VERB, ", and after some serious thought, I realized I would find the answer here at Camp ", NOUN, "." ],

]
var facts = [
    [" Just to break the ice, I'd like to tell a story about my childhood. When I was 7, I was ", VERB, " my favorite ", NOUN, " when I was approched by a stranger who asked me ", QUESTION, ". "],
    [" Here's a fun fact about me: everyday I ", VERBN, " with my ", NOUN, " out. Now, I know what you're thinking: ", QUESTION, ". But don't worry, you'll find out over this next very ", ADJECTIVE, " week! "],
    [" I want to use my time up here in front of you to share a little poem I wrote: \nRoses are red, \nViolets are ", ADJECTIVE, " , \n", QUESTION, "\n"],
    [" One little fact about me is that I extremely afraid of ", FEAR, ". But I'm even more scared of ", FEAR, ". "],
    [" My favorite food is ", NOUN, ". I can't go a single day without putting my tastebuds on those ", ADJECTIVE, " things. "]
]
var rules = [
    ["Alright, now for a serious note. I only have one rule: ", RULE, ". "],
    ["I'm pretty ", ADJECTIVE, ". I only have one rule for you guys: ", RULE, ". "]
]
var closings = [
    ["I'm super ", ADJECTIVE, " to be your counselor, and look forward to seeing you all ", VERB, "!"],
    ["Thanks for listening. I know my voice can be really ", ADJECTIVE, ". Great to meet you all!"],
    ["That's all the time the ", NOUN, " will allow me. Looking forward to camp!"],

]

var story = ""
var promptIndices = []
var turn = 0
var curIndices = []

var intro = intros[Math.floor(Math.random() * intros.length)] //select random intro
var fact1 = facts[Math.floor(Math.random() * facts.length)] //select random fact 1
var fact2 = facts[Math.floor(Math.random() * facts.length)] //select random fact 2
var rule = rules[Math.floor(Math.random() * rules.length)] //select random rule
var close = closings[Math.floor(Math.random() * closings.length)]

var ending_message = "Alright, counselor. Prepare to introduce yourself to these lovely campers! Stand up and press \"Let's Go\" when you're ready."

var questionPrompts = ["A question that, deep down, we all want to know the answer to", "A question that we're all thinking, but are afraid to ask",
 "A question that might be a little too awkward to ask right now", "A question that you can't ask your mother"]
var rulePrompts = ["A rule everyone breaks anyway", "A rule worth breaking"]

// Add a input text box based on input part of speech (see constants)
function makeInput(part_of_speech) {
    inp = document.createElement("input")
    inp.setAttribute('type', 'text');
    inp.setAttribute('class', 'story-input')
    inp.setAttribute('style', 'width: 80%; border-radius: 5px;')
    switch (part_of_speech) {
        case NOUN:
            inp.setAttribute('placeholder', 'Noun');
            container.appendChild(inp)
            break;
        case VERB:
            inp.setAttribute('placeholder', 'Verb (ending in -ing)');
            container.appendChild(inp)
            break;
        case NAME:
            inp.setAttribute('placeholder', 'Name (of a person)');
            container.appendChild(inp)
            break;
        case ADJECTIVE:
            inp.setAttribute('placeholder', 'Adjective');
            container.appendChild(inp)
            break;
        case ADVERB:
            inp.setAttribute('placeholder', 'Adverb');
            container.appendChild(inp)
            break;
        case GREETING:
            inp.setAttribute('placeholder', 'Greeting');
            container.appendChild(inp)
            break;
        case RULE:
            s = rulePrompts[Math.floor(Math.random() * rulePrompts.length)]
            inp.setAttribute('placeholder', s);
            container.appendChild(inp)
            break;
        case QUESTION:
            s = questionPrompts[Math.floor(Math.random() * questionPrompts.length)]
            inp.setAttribute('placeholder', s);
            container.appendChild(inp)
            break;
        case FEAR:
            inp.setAttribute('placeholder', 'An irrational fear');
            container.appendChild(inp)
            break;
        case VERBN:
            inp.setAttribute('placeholder', 'Verb (not ending in -ing)');
            container.appendChild(inp)
            break;
    }
}

function getStory() {
    story = intro.concat(fact1.concat(fact2.concat(rule.concat(close))))
    for (var i = 0; i < story.length; i++) {
        if (story[i] >= 0) {
            promptIndices.push(i)
        }
    }
}

// start the nth turn
function startTurn(n) {
    curIndices = []
    for (var i = 0; i < promptIndices.length; i++) {
        if (i % (playerCount - 1) == n) {
            makeInput(story[promptIndices[i]])
            curIndices.push(promptIndices[i])
        }
    }
}

// reads in whatever is in the input boxes and places them in story
function grabStoryElements() {
    m = document.getElementsByClassName("story-input")
    for (var i = 0; i < m.length; i++) {
        answer = m[i].value
        story[curIndices[i]] = answer
    }
}

// remove all input boxes from page
function killInputs() {
    // b = document.getElementsByClassName("story-input")
    // console.log(b.length)
    // for (var j = 0; j < m.length; j++) {
    //     b[j].remove()
    // }
    // console.log(b.length)
    var l = document.getElementsByClassName("story-input")
    while (l.length > 0) {
        l[0].remove()
        l = document.getElementsByClassName("story-input")
    }
}

// when called, transitions turns
function nextTurn() {
    console.log("next!")
    grabStoryElements()
    turn += 1
    killInputs()
    if (turn == playerCount - 1) {
        endRound()
    } else {
        //display PASS
        console.log("PASS")
        document.getElementById('camper-number').innerHTML = "Camper " + (turn + 1)
        startTurn(turn)
        console.log(story)
    }
}

function endRound() {
    // destroy everything, then make ready statement and add button that brings to reading place
    document.getElementById('camper-number').remove()
    document.getElementById('next-button').remove()
    var eg = document.getElementById('end-game')
    var eg_text = document.createElement("p")
    eg_text.innerHTML = ending_message
    eg.appendChild(eg_text)
    var done_button = document.createElement("button")
    done_button.setAttribute('id', 'done-button')
    done_button.setAttribute('onClick', 'goToEndPage()')
    done_button.innerHTML = "Let's Go!"
    eg.appendChild(done_button)
}

function goToEndPage() {
    res = ""
    for (var i = 0; i < story.length; i++) {
        res = res.concat(story[i])
    }
    sessionStorage.setItem('story', res);
    location.href = './result.html';
}

function startGame() {
    getStory()
    startTurn(0)
}
startGame()
