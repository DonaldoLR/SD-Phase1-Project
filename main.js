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
    
    //Hide the form - causes issues when the user changes the genre and searches before the punchline/next joke button display
    document.getElementById('select-genre-form').classList.add('hidden')
    
    const setupLine = jokeObj.setup, 
            punchLine = jokeObj.punchline,
            createDiv = document.createElement('div'), 
            createSetupP = document.createElement('p'), 
            createPunchP = document.createElement('p');

    
    createSetupP.innerText = setupLine;

    //Creates the H2 with the puncline in it, the line is hidden 
    createPunchP.innerText = punchLine;
    createPunchP.setAttribute('id', 'punch-line-p')
    createPunchP.classList.add('hidden');

    createDiv.append(createSetupP,createPunchP);

   
    return createDiv; 
}   

function displayJoke(div) {
    return document.getElementById('joke-container').appendChild(div);
}
function displayPunchline(){
    setTimeout(() => {
        
        // Hides H1 (Setup Line)
        // document.getElementsByTagName('p')[0].classList.add('hidden');
        
        // Removing the setup P tag as it will no longer be needed once punchline is displayed
        document.getElementsByTagName('p')[0].remove()
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
    document.getElementById('select-genre-form').addEventListener('submit', (e) => {
        e.preventDefault();
        clearJokeContainer();
        fetchJoke(document.getElementById('select-genre-input').value)
        .then(createJokeDiv)
        .then(displayJoke)
        .then(displayPunchline)
    })   
}

runProgram()
    