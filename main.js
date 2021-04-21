// Step 1, get the data
// Fetchs the Data
function fetchJoke(){
    const baseUrl = `https://official-joke-api.appspot.com/jokes`;

    // Creates a variable to hold the search genre input
    let searchTopic = ` `;

    // Output: A promise with the data formatted to JSON
    return fetch(`${baseUrl}/random`).then(r => r.json())
}

// Step 2 handling the data 
// Step 2.1 How I was the joke to be structured in HTML
/* 
<div id="joke">
    <h1>What is a centipedes's favorite Beatle song?</h1>
    <button>I don't know, what?</button>
    <h2>I want to hold your hand, hand, hand, hand...</h2>
</div>
*/
// Step 2.2 creating a function that takes in an object containing the joke
// Output: A div that can be used on the DOM
function createJokeDiv(jokeObj){

    const setupLine = jokeObj.setup;
    const punchLine = jokeObj.punchline;
    
    const createDiv = document.createElement('div');
    const createH1 = document.createElement('h1');
    const createButton = document.createElement('button');
    const createH2 = document.createElement('h2');

    createH1.innerText = setupLine;
    createButton.innerText = `I don't know?`;
    createButton.setAttribute('id', 'user-response-button');

    //Creates the H2 with the puncline in it, the line is hidden 
    createH2.innerText = punchLine;
    createH2.setAttribute('id', 'punch-line-h2')
    createH2.classList.add('hidden');

    createDiv.appendChild(createH1);
    createDiv.appendChild(createButton);
    createDiv.appendChild(createH2);

    return createDiv; 
}   

function displayJoke(div) {
    return document.getElementById('jokes-container').appendChild(div);
}

function displayPunchline(){
    const userResponseButton = document.getElementById('user-response-button');

    userResponseButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Displays the Punchline 
        document.getElementsByTagName('h1')[0].after(document.getElementById('punch-line-h2'));
        document.getElementById('punch-line-h2').classList.remove('hidden');

        // Hides H1 (Setup Line)
        document.getElementsByTagName('h1')[0].remove();

        // Changes the text from "I don't know" => "Next Joke"
        document.getElementsByTagName('button')[0].innerText = `Next joke...`;

        


    })
}
fetchJoke()
    .then(createJokeDiv)
    .then(displayJoke)
    .then(displayPunchline)
    