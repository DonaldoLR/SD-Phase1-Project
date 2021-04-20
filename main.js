function fetchJoke(){
    const baseUrl = `https://official-joke-api.appspot.com/jokes`;

    // Creates a variable to hold the search genre input
    let searchTopic = ` `;

    return fetch(`${baseUrl}/random`).then(r => r.json())
}
/*
<div id="joke">
    <h1>What is a centipedes's favorite Beatle song?</h1>
    <button>I don't know, what?</button>
    <h2>I want to hold your hand, hand, hand, hand...</h2>
</div>
*/
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

fetchJoke()
    .then(createJokeDiv)
    