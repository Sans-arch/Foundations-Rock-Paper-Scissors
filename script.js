const options = ['Rock', 'Paper', 'Scissors'];

function generateRandomIndex() {
    const min = Math.ceil(0);
    const max = Math.floor(options.length - 1);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getComputerChoice() {
    const generatedIndex = generateRandomIndex(); 
    return options[generatedIndex];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        return {
            message: `Drawn between ${playerSelection} and ${computerSelection}!`,
            winner: null
        };
    }

    if (playerSelection === "rock" && computerSelection === "scissors") {
        return {
            message: "You winned! Rock beats Scissors",
            winner: "player"
        };
    } else if (playerSelection === "rock" && computerSelection === "paper") {
        return {
            message: "You Lose! Paper beats Rock",
            winner: "computer"
        };
    }

    if (playerSelection === "paper" && computerSelection === "rock") {
        return {
            message: "You winned! Paper beats Rock",
            winner: "player"
        };
    } else if (playerSelection === "paper" && computerSelection === "scissors") {
        return {
            message: "You Lose! Scissors beats Paper",
            winner: "computer"
        };
    }

    if (playerSelection === "scissors" && computerSelection === "paper") {
        return {
            message: "You winned! Scissors beats Paper",
            winner: "player"
        };
    } else if (playerSelection === "scissors" && computerSelection === "rock") {
        return {
            message: "You Lose! Rock beats Scissors",
            winner: "computer"
        };
    }
}

function calculateWinner(playerPoints, computerPoints) {
    if (playerPoints === computerPoints) return "Tied game!";
    return playerPoints > computerPoints ? "Player" : "Computer";
}

const resultContainer = document.getElementById("resultContainer");
const winnerContainer = document.getElementById("winner");
const playerPointsH2 = document.getElementById("playerPoints");
const computerPointsH2 = document.getElementById("computerPoints");
const buttonsList = document.querySelectorAll("button");

let playerPoints = 0;
let computerPoints = 0;

let someoneWon = false;

buttonsList.forEach(button => {
    
    button.addEventListener('click', e => {
        // Remover o ganhador após pontuar again
        if (someoneWon) {
            hideWinner();
            someoneWon = false;
        }

        const playerSelection = e.target.value;
        const result = playRound(playerSelection, getComputerChoice());

        if (result.winner === "player") {
            updatePlayerPoints();
        } else if (result.winner === "computer") {
            updateComputerPoints();
        }
        
        if (computerPoints === 5) {
            showWinner();
            winnerContainer.textContent = "Computer is the winner!";
            someoneWon = true;
            resetGame();
            return;
        }
        
        if (playerPoints === 5) {
            showWinner();
            winnerContainer.textContent = "Player is the winner!";
            someoneWon = true;
            resetGame();
            return;
        }

        const resultDiv = createResultDiv(result.message);
        resultContainer.appendChild(resultDiv);
    });

});

function resetGame() {
    playerPoints = 0;
    computerPoints = 0;
    playerPointsH2.textContent = `Player score: ${+playerPoints}`;
    computerPointsH2.textContent = `Computer score: ${+computerPoints}`;

    const resultDivs = document.querySelectorAll("div.resultElement");
    resultDivs.forEach(div => {
        div.remove();
    });
}

function updatePlayerPoints() {
    playerPoints++;
    playerPointsH2.textContent = `Player score: ${+playerPoints}`;
}

function updateComputerPoints() {
    computerPoints++;
    computerPointsH2.textContent = `Computer score: ${+computerPoints}`;
}

function createResultDiv(resultMessage) {
    const resultDiv = document.createElement("div");
    resultDiv.classList.add("resultElement");
    resultDiv.style.border = "2px solid #fff";
    resultDiv.style.background = "#034f84";
    resultDiv.style.color = "#fff";
    resultDiv.style.padding = "20px";
    resultDiv.style.width = "100%";
    resultDiv.style.textAlign = "center";
    resultDiv.style.boxSizing = "border-box";
    resultDiv.textContent = resultMessage;

    return resultDiv;
}

function hideWinner() {
    winnerContainer.style.display = "none";
}

function showWinner() {
    winnerContainer.style.display = "flex";
}
