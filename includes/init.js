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
    state,
    resetCurrentPiece
} from "./state.js"

import {
    initRenderer,
    drawPiece,
    drawBoard,
    cleanPiece
} from "./renderer.js";

const generateNewPiece = () => {
    const selectedPiece = selectRandomPiece();

    state.currentPiece.matrix = createPiece(selectedPiece.matrix);
    state.currentPiece.color = selectedPiece.color;

    const maxPosX =
        boardWidth - state.currentPiece.matrix[0].length + 1;

    const initialX = getRandomNumber(maxPosX - 1);

    state.currentPiece.x = initialX;
    state.currentPiece.y = 0;
    state.currentPiece.height =
        getHeightOfPiece(state.currentPiece.matrix);

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
    state.internalIntervalId = null;
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
    resetCurrentPiece();
    mainMenu.style.display = 'flex';
    gameBoardContainer.style.display = 'none';
}

const initGame = () => {
    initRenderer();
    startBtn.addEventListener('click', loadGameBoard);
    finishBtn.addEventListener('click', endGame);
}

window.addEventListener("DOMContentLoaded", () => {
    initGame();
})