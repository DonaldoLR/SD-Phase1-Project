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
    createButton.innerText = `I don't know?`
    createH2.innerText = punchLine;

    createDiv.appendChild(createH1);
    createDiv.appendChild(createButton);
    createDiv.appendChild(createH2);

    return createDiv; 
}   

function displayJoke(div) {
    return document.body.appendChild(div);
}

fetchJoke()
    .then(createJokeDiv)
    .then(displayJoke)
    