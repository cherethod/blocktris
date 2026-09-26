import {
    mainMenu,
    startBtn,
    finishBtn,
    gameBoardContainer
} from "./dom.js";

import {
    initBoard
} from "./board.js";

import {
    boardWidth,
    intervalTimer
} from "./config.js";

import {
    getHeightOfPiece,
    getRandomNumber,
    createPiece,
    selectRandomPiece
} from "./pieces.js";

import {
    keyHandler
} from "./input.js";

import {
    movePieceDown
} from "./movement.js";

import {
    state
} from "./state.js"

import {
    drawPiece,
    drawBoard,
    cleanPiece
} from "./renderer.js";

const generateNewPiece = () => {
    state.currentPiece.matrix = createPiece(selectRandomPiece());
    const maxPosX = boardWidth - state.currentPiece.matrix[0].length + 1;
    const initialX = getRandomNumber(maxPosX - 1);

    state.currentPiece.x = initialX;
    state.currentPiece.y = 0;
    state.currentPiece.height = getHeightOfPiece();
    drawPiece();
};

const startTimer = () => {
    state.internalIntervalId = setInterval(() => {
        console.log(`
            Current piece: ${state.currentPiece.matrix.length}\n
            Current X position: ${state.currentPiece.x}\n
            Current Y position: ${state.currentPiece.y}`)
        cleanPiece();
        movePieceDown();
        drawPiece();
    }, intervalTimer);
}

const stopTimer = () => {
    clearInterval(state.internalIntervalId);
}

const loadGameBoard = () => {
    mainMenu.style.display = 'none';
    gameBoardContainer.style.display = 'grid';
    initBoard();
    drawBoard();
    generateNewPiece();
    document.addEventListener('keydown', keyHandler);
    // setTimeout(() => {
    startTimer();
    // }, intervalTimer); 
}
const endGame = () => {
    stopTimer();
    document.removeEventListener('keydown', keyHandler);
    state.currentPiece = undefined;
    state.currentPiece.x = undefined;
    state.currentPiece.y = undefined;
    state.currentPiece.color = undefined;
    state.currentPiece.height = undefined;
    mainMenu.style.display = 'flex';
    gameBoardContainer.style.display = 'none';
}

const initGame = () => {
    startBtn.addEventListener('click', loadGameBoard);
    finishBtn.addEventListener('click', endGame);
}

window.addEventListener("DOMContentLoaded", () => {
    initGame();
})