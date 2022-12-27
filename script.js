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

function game() {
    let playerPoints = 0;
    let computerPoints = 0;

    for (let i = 0; i < 5; i++) {
        const playerSelection = prompt("Rock? Paper or Scissors? ", "rock");
        const roundResult = playRound(playerSelection, getComputerChoice());
        
        if (roundResult.winner === "player") {
            playerPoints++;
        } else if (roundResult.winner === "computer") {
            computerPoints++;
        }
    }

    console.log("Player points: " + playerPoints);
    console.log("Computer points: " + computerPoints);
    console.log(`The winner is the ${calculateWinner(playerPoints, computerPoints)}!`);
}

const playerSelection = "Scissors";
const computerSelection = getComputerChoice();

game();