import {
    mainMenu,
    startBtn,
    finishBtn,
    gameBoardContainer,
    gameBoard,
    context
} from "./dom.js";

import {
    initBoard
} from "./board.js";

import {
    boardBgColor,
    boardWidth,
    boardHeight,
    cellSize,
    intervalTimer,
    CONTROLS
} from "./config.js";

import {
    pieces,
    getHeightOfPiece,
    rotatePiece,
    setPieceColor,
    getRandomNumber,
    createPiece,
    selectRandomPiece
} from "./pieces.js";

import {

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




// MATRIZ DE ROTACIÓN


    // FIX PARA PIEZAS DE 4 CELDAS DE LONGITUD
    // if (size === 4) {
    //     const temp = piece[0][1];
    //     piece[0][1] = piece[1][0];
    //     piece[1][0] = temp;

    //     const temp2 = piece[0][2];
    //     piece[0][2] = piece[2][0];
    //     piece[2][0] = temp2;

    //     const temp3 = piece[1][2];
    //     piece[1][2] = piece[2][1];
    //     piece[2][1] = temp3;
    //   }

// MATRIZ DE TRANSFORMACIÓN

// const rotatePiece = (piece) => {
//     const size = piece.length;
//     const matrix = [
//       [0, -1],
//       [1, 0]
//     ];

//     for (let row = 0; row < size; row++) {
//       for (let col = 0; col < size; col++) {
//         const newRow = matrix[0][0] * col + matrix[0][1] * row;
//         const newCol = matrix[1][0] * col + matrix[1][1] * row;
//         piece[row][col] = piece[newRow][newCol];
//       }
//     }
//   };





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

const keyHandler = (event) => {
    let keyCode = event.keyCode || event.which;

    switch (keyCode) {
        case keyLeft:
            if (currentPieceX > 0) {
                cleanPiece();
                currentPieceX -= 1;
                drawPiece();
            }
            break;
        case keyRight:
            if (currentPieceX + currentPiece.length < boardWidth) {
                cleanPiece();
                currentPieceX += 1;
                drawPiece();
            }
            break;
        case keyDown:

            break;
        case keyRotate:
            cleanPiece();
            rotatePiece(currentPiece);
            currentPieceHeight = getHeightOfPiece();
            drawPiece();
            break;
        default:
            break;
    }
}


const initGame = () => {
    startBtn.addEventListener('click', loadGameBoard);
    finishBtn.addEventListener('click', endGame);
}

window.addEventListener("DOMContentLoaded", () => {
    initGame();
})