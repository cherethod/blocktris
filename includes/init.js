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
    boardWidth
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
    state,
    resetCurrentPiece
} from "./state.js"

import {
    initRenderer,
    drawPiece,
    drawBoard
} from "./renderer.js";

import {
    startGameLoop,
    stopGameLoop
} from "./game-loop.js";

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

const loadGameBoard = () => {
    mainMenu.style.display = 'none';
    gameBoardContainer.style.display = 'grid';
    initBoard();
    drawBoard();
    generateNewPiece();
    document.addEventListener('keydown', keyHandler);
    startGameLoop();
}

const endGame = () => {
    stopGameLoop();
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