// selections
let startGame = document.querySelector(".start-game span");
let startGameContainer = document.querySelector(".start-game");
let myName = document.querySelector(".container .head-container .name span");
let timer = document.querySelector(".container .head-container .timer span");
let tries = document.querySelector(".container .head-container .tries span");
let allBlocks = Array.from(document.querySelectorAll(".memory-game-blocks .game-block"));
let backgroundSound = document.querySelector(".sound");

// set options
let time = 1000;
let timerDuration = 300;

startGame.onclick = startGameOption;

let orderRange = [...Array(allBlocks.length).keys()];

// shuffle the allBlocks array
shuffleArray();

allBlocks.forEach((block, index) => {
    // add order property
    block.style.order = orderRange[index];

    // add event to trager the flipBlock function
    block.addEventListener('click', () => {
        // add flip class
        flipBlock(block);
    });
});

// start game function
function startGameOption() {
    // start the backgrond sound
    backgroundSound.play();

    startGame.remove();

    // create the name panel
    createNamePanel();

    // selections after creation of elements
    let myConfirm = document.querySelector(".start-game .control .control-option .ok");
    let myCancel = document.querySelector(".start-game .control .control-option .cancel");
    let myInput = document.querySelector(".start-game .control .input-field input");
    
    myConfirm.onclick = () => {
        if (myInput.value === '') {
            myName.innerHTML = `Unknown`;
        } else {
            myName.innerHTML = myInput.value;
        }
        startGameContainer.remove();

        // start the counter timer
        timerCountdown(timerDuration)
    };
    myCancel.onclick = () => {
        location.reload();
    };
}

// create name panel function
function createNamePanel() {
    // create control div
    let control = document.createElement("div");
    control.className = 'control';

    let input = document.createElement("input");
    input.placeholder = "Enter Your Name";
    let inputField = document.createElement("div")
    inputField.className = 'input-field';

    // create control option div
    let controlOption = document.createElement("div");
    controlOption.className = 'control-option';
    
    // create the buttons to click ok or cancel
    let confirmBtn = document.createElement("button");
    let cancelBtn = document.createElement("button");

    // add classes to buttons 
    confirmBtn.className = 'ok';
    cancelBtn.className = 'cancel';


    confirmBtn.appendChild(document.createTextNode("Ok"));
    cancelBtn.appendChild(document.createTextNode("Cancel"));
    
    // add element into control 
    controlOption.appendChild(confirmBtn);
    controlOption.appendChild(cancelBtn);
    inputField.appendChild(input)
    
    control.appendChild(inputField);
    control.appendChild(controlOption);

    // add control to the div 
    startGameContainer.appendChild(control);

}

// function to create timer
function timerCountdown(duration) {
    countdown = setInterval(() => {
        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60);

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
    
        timer.innerHTML = `${minutes}:${seconds}`;
        if (duration === 0) {
            clearInterval(countdown);

            // to end the game
            stopGame();
        } else {
            duration--
        }
    }, 1000)
}

// stop function
function stopGame() {
    // create container to end the game
    let myParent = document.querySelector(".start-container")
    let myEndContainer = document.createElement("div");
    myEndContainer.className = 'end-game';

    let mySpan = document.createElement("span");
    mySpan.appendChild(document.createTextNode(`Play Again`));

    myEndContainer.appendChild(mySpan);
    myParent.appendChild(myEndContainer);

    // let playAgainBtn = 
    document.querySelector(".end-game span").onclick = () => {
        location.reload();
    };
}

// flip block function
function flipBlock(selectedBlocck) {
    selectedBlocck.classList.add('is-flipped')
    
    // collect all flip blocks
    let allFlipBlocks = allBlocks.filter((flippedBlock) => flippedBlock.classList.contains('is-flipped'));

    // if there are two blocks are flipped
    if (allFlipBlocks.length === 2) {
        // stop clicking 
        stopClicking();

        // check matched blocks
        isMatch(allFlipBlocks[0], allFlipBlocks[1]);
        
        let end = allBlocks.every((block) => {
            return block.classList.contains('is-matched');
        });

        if (end === true) {
            // to end the game
            stopGame();
        }

    } else {

    }
}

// stop clicking function
function stopClicking() {
    // stop pointer event
    document.querySelector(".memory-game-blocks").classList.add('prevent-cursor');

    // set time out to return te pointer event
    setTimeout(() => {
        // stop pointer even
        document.querySelector(".memory-game-blocks").classList.remove('prevent-cursor');

    }, time);
}

// match function
function isMatch(firstBlock, secondBlock) {
    if (firstBlock.dataset.person === secondBlock.dataset.person) {
        // add match class
        firstBlock.classList.add('is-matched');
        secondBlock.classList.add('is-matched');

        // remove is-flipped class
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

    } else {
        // increase the tries by 1
        tries.innerHTML = parseInt(tries.innerHTML) + 1

        setTimeout(() => { 
            // remove is-flipped class
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
            
        }, time);
    }
}

// create shuffle function
function shuffleArray() {
    for (let i = orderRange.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        
        // swapt the j and i
        [orderRange[i], orderRange[j]] = [orderRange[j], orderRange[i]];
    }
}