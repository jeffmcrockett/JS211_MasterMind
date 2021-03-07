'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) => {
// your code here
// lets guess [a, b, c, d]
  let guessArray = guess.split("");
  let solutionArray = solution.split("");

  let hint1 = 0;
  let hint2 = 0;

// This needs to calculate how many of the guesses are correct
  for (let i = 0; i < 4; i++) {
    if (guessArray[i] === solutionArray[i]) {
      hint1 = hint1 + 1;
      guessArray[i] = 1;
      solutionArray[i] = 0;
    }
  }

// This needs to calculate how many guesses are in the wrong place but correct color
  for (let i = 0; i < 4; i++) {
    for (let ii = 0; ii < 4; ii++) {
      if (guessArray[i] === solutionArray[ii]) {
        hint2 = hint2 + 1;
        guessArray[i] = 1;
        solutionArray[ii] = 0;
      }
    }
  }

// Return number correct - number close
  return hint1 + "-" + hint2;
}

const mastermind = (guess, solution) => {
// solution = 'abcd';
// your code here
// If the guess matches the solution, end the game as a victory.
  if (guess == solution) {
    board = [];
    console.log(`That's the correct answer. Great Job!`);
    return `That's right!`;
  } else {
    console.log(generateHint(guess));
    board.push(guess);
  }

// If the player has used 10 attempts and not achieved success, end the game
  if (board.length == 10) {
    console.log(`Out of attempts. Better luck next time!`);
    board = [];
    solution = "";
    generateSolution();
  }
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

  //! Double checking my work as I'm turning in, this test below
  //! Should have just been added to the test above for generate hint...
  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });
    it('should understand letters that do not belong in the game', () => {
      assert.equal(generateHint('akby'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}