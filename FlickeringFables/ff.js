
numPlayers = sessionStorage['numPlayers'];
prompt = sessionStorage['prompt'];
document.getElementById('prompt').textContent = prompt;
document.getElementById('previous').textContent = prompt;

var turnsLeft = Math.max(10, numPlayers)
document.getElementById('turns').textContent = "Turns remaining: " + turnsLeft
var story = "";
const prev = document.getElementById('previous');

stopwords = new Set(["a", "about", "above", "after", "again", "against", "all", "am",
    "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been",
    "before", "being", "below", "between", "both", "but", "by", "can't", "cannot",
    "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing",
    "don't", "down", "during", "each", "few", "for", "from", "further", "had",
    "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll",
    "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his",
    "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is",
    "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most",
    "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once",
    "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over",
    "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should",
    "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their",
    "theirs", "them", "themselves", "then", "there", "there's", "these", "they",
    "they'd", "they'll", "they're", "they've", "this", "those", "through", "to",
    "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll",
    "we're", "we've", "were", "weren't", "what", "what's", "when", "when's",
    "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's",
    "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're",
    "you've", "your", "yours", "yourself", "yourselves"])

function endgame() {
    const arr = Array.from(document.getElementsByClassName('removeAtEnd'));
    arr.forEach(function(element) {element.remove()});
    document.getElementById('story').textContent = "Your Story:"
    document.getElementById('previous').textContent = story;
    document.getElementById('endgame').innerHTML = '<button onClick="location.reload()">Reset</button>'
}

document.getElementById('submit').onclick = function() {
    response = document.getElementById('response');
    story += " " + response.value;
    
    var usedPrev = true;
    const arr = response.value.split(" ");
    for (let i = 1; i < arr.length; ++i) {
        var lastChar = ""
        if (arr[i].slice(-1) === ".") {
            arr[i] = arr[i].slice(0, -1);
            lastChar = ".";
        }

        if (stopwords.has(arr[i].toLowerCase())) {
            continue;
        }

        if (usedPrev) {
            arr[i] = "_".repeat(arr[i].length) + lastChar;
            usedPrev = false;
        } else {
            arr[i] += lastChar;
            usedPrev = true;
        }
    }

    prev.textContent = arr.join(" ");
    response.value = "";

    document.getElementById('turns').textContent = "Turns remaining: " + --turnsLeft

    if (turnsLeft == 0) {
        endgame();
        return;
    }
 }