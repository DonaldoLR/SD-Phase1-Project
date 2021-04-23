// Step 1, get the data
// Fetchs the Data
function fetchJoke(inputSearchGenre = 'random'){
    const baseUrl = `https://official-joke-api.appspot.com/jokes`;

    // Output: A promise with the data formatted to JSON
    if (inputSearchGenre === 'random'){
        return fetch(`${baseUrl}/random`).then(r => r.json())
    } else {
        return (fetch(`${baseUrl}/${inputSearchGenre}/random`)
                .then(r => r.json())
                // Have to get the first object from the array using this endpoint 
                .then(arr => arr[0])
                )
    }
}

// Step 2 handling the data 
// Step 2.1 How I was the joke to be structured in HTML
/* 
<div id="joke">
    <p>What is a centipedes's favorite Beatle song?</h1>
    <button>I don't know, what?</button>
    <p>I want to hold your hand, hand, hand, hand...</h2>
</div>
*/
// Step 2.2 creating a function that takes in an object containing the joke
// Output: A div that can be used on the DOM
function createJokeDiv(jokeObj){

    
    const setupLine = jokeObj.setup;
    const punchLine = jokeObj.punchline;
    
    const createDiv = document.createElement('div');
    const createSetupP = document.createElement('p');
    const createPunchP = document.createElement('p');

    
    createSetupP.innerText = setupLine;
    createButton.setAttribute('id', 'user-response-button');

    //Creates the H2 with the puncline in it, the line is hidden 
    createPunchP.innerText = punchLine;
    createPunchP.setAttribute('id', 'punch-line-p')
    createPunchP.classList.add('hidden');

    createDiv.appendChild(createSetupP);
    createDiv.appendChild(createPunchP);
   
    return createDiv; 
}   

function displayJoke(div) {
    return document.getElementById('joke-container').appendChild(div);
}
function displayPunchline(){
    setTimeout(() => {
        //Hide the form 
        document.getElementById('select-genre-form').classList.add('hidden');
        // Hides H1 (Setup Line)
        document.getElementsByTagName('p')[0].classList.add('hidden');
        // Displays the Punchline 
        document.getElementsByTagName('p')[0].after(document.getElementById('punch-line-p'));
        document.getElementById('punch-line-p').classList.remove('hidden');

        const createButton = document.createElement('button');
        createButton.setAttribute('id', 'user-response-button');
        createButton.innerText = 'Next Joke'
        document.getElementsByTagName('div')[1].appendChild(createButton);

        nextJoke(createButton)
    }, 4000)
    
}
// function displayPunchline(){
//     const userResponseButton = document.getElementById('user-response-button');

//     userResponseButton.addEventListener('click', (e) => {
//         e.preventDefault();

//         //Hide the form 
//         document.getElementById('select-genre-form').classList.add('hidden');
//         // Hides H1 (Setup Line)
//         document.getElementsByTagName('p')[0].classList.add('hidden');

//         // Changes the text from "I don't know" => "Next Joke"
//         document.getElementById('user-response-button').innerText = `Next joke...`;

//         // Displays the Punchline 
//         document.getElementsByTagName('p')[0].after(document.getElementById('punch-line-p'));
//         document.getElementById('punch-line-p').classList.remove('hidden');

//         nextJoke(userResponseButton)
//     })  
// }

function nextJoke(nextButton){
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();

        document.getElementById('select-genre-form').classList.remove('hidden');
        clearJokeContainer()
    })
}
function clearJokeContainer() {
    document.getElementById('joke-container').innerHTML = ``;
}

function runProgram(){
    document.getElementById('submit-genre-button').addEventListener('click', (e) => {
        e.preventDefault();
        clearJokeContainer();
        fetchJoke(document.getElementById('select-genre-input').value)
        .then(createJokeDiv)
        .then(displayJoke)
        .then(displayPunchline)
    })   
}

runProgram()
    