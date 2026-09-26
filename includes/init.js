import {
    mainMenu,
    startBtn,
    finishBtn,
    gameBoardContainer,
    gameBoard,
    context
} from "./dom.js";

import {

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
    pieces
} from "./pieces.js";

import {

} from "./input.js";

import {

} from "./movement.js";

import {
    state
} from "./state.js"


const getHeightOfPiece = () => {
    let pieceHeight = 0;
    for (let row = 0; row < state.currentPiece.length; row++) {
        for (let col = 0; col < state.currentPiece[row].length; col++) {
            if (state.currentPiece[row][col] === 1) {
                pieceHeight = Math.max(pieceHeight, row + 1);
            }
        }
    }
    return pieceHeight;
};


// MATRIZ DE ROTACIÓN

const rotatePiece = (piece) => {
    let size = piece.length;
    let layers = Math.floor(size / 2);

    for (let layer = 0; layer < layers; layer++) {
        let first = layer;
        let last = size - 1 - layer;
        for (let i = first; i < last; i++) {
            const offset = i - first;
            const temp = piece[first][i];
            piece[first][i] = piece[last - offset][first];
            piece[last - offset][first] = piece[last][last - offset];
            piece[last][last - offset] = piece[i][last];
            piece[i][last] = temp;
        }
    }
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
}

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

const setPieceColor = (pieceType) => {
    switch (pieceType) {
        case 'O':
            state.currentPiece.color = 'blue'
            break;
        case 'I':
            state.currentPiece.color = 'red'
            break;
        case 'L':
            state.currentPiece.color = 'green'
            break;
        case 'J':
            state.currentPiece.color = 'green'
            break;
        case 'T':
            state.currentPiece.color = 'blue'
            break;
        case 'S':
            state.currentPiece.color = 'purple'
            break;
        case 'Z':
            state.currentPiece.color = 'purple'
            break;
        default:
            break;
    }
}

const getRandomNumber = (max) => {
    let num = Math.floor(Math.random() * (max + 1))
    return num;
}

const createPiece = (templatedPiece) => {
    const newPiece = [];
    for (let i = 0; i < templatedPiece.length; i++) {
        newPiece[i] = templatedPiece[i].slice();
    }
    return newPiece;
}

const selectRandomPiece = () => {
    const piecesKeys = Object.keys(pieces);
    const randomIndex = getRandomNumber(piecesKeys.length - 1);
    const randomPiece = pieces[piecesKeys[randomIndex]];
    setPieceColor(piecesKeys[randomIndex]);
    return randomPiece;
}

const generateNewPiece = () => {
    state.currentPiece = createPiece(selectRandomPiece());
    const maxPosX = boardWidth - state.currentPiece[0].length + 1;
    const initialX = getRandomNumber(maxPosX - 1);

    state.currentPiece.x = initialX;
    state.currentPiece.y = 0;
    state.currentPiece.height = getHeightOfPiece();
    drawPiece();
};


const movePieceDown = () => {
    if (state.currentPiece.y < boardHeight - state.currentPiece.height) {
        state.currentPiece.y += 1;
    }
    else {
        alert()
    }
}

const drawCell = (x, y) => {
    context.fillStyle = state.currentPiece.color; // Color de relleno de la celda
    context.strokeStyle = 'black'; // Color del borde de la celda
    context.lineWidth = 1; // Ancho del borde de la celda

    context.fillRect(x, y, cellSize, cellSize); // Dibuja el rectángulo de la celda
    context.strokeRect(x, y, cellSize, cellSize); // Dibuja el borde de la celda
};


const drawPiece = () => {
    for (let row = 0; row < state.currentPiece.length; row++) {
        for (let col = 0; col < state.currentPiece[row].length; col++) {
            if (state.currentPiece[row][col] === 1) {
                const x = (state.currentPiece.x + col) * cellSize;
                const y = (state.currentPiece.y + row) * cellSize;
                drawCell(x, y);
            }
        }
    }
};
const cleanCell = (x, y) => {
    context.fillStyle = boardBgColor; // Color de relleno de la celda  
    context.fillRect(x, y, cellSize, cellSize); // Dibuja el rectángulo de la celda
};
const cleanPiece = () => {
    for (let row = 0; row < state.currentPiece.length; row++) {
        for (let col = 0; col < state.currentPiece[row].length; col++) {
            if (state.currentPiece[row][col] === 1) {
                const x = (state.currentPiece.x + col) * cellSize;
                const y = (state.currentPiece.y + row) * cellSize;
                cleanCell(x, y);
            }
        }
    }
};


const initBoard = () => {
    state.board = [];
    for (let row = 0; row < boardHeight; row++) {
        state.board[row] = [];
        for (let col = 0; col < boardWidth; col++) {
            state.board[row][col] = 0; // Inicializa todas las celdas como vacías (0)
        }
    }
};


const drawBoard = () => {
    context.fillStyle = boardBgColor;
    context.fillRect(0, 0, gameBoard.width, gameBoard.height);

    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
            const x = col * cellSize;
            const y = row * cellSize;
            const cell = state.board[row][col];

            if (cell === 1) {
                s
                context.fillStyle = '#f00';
                context.fillRect(x, y, cellSize, cellSize);
            }
        }
    }
}

const startTimer = () => {
    state.internalIntervalId = setInterval(() => {
        console.log(`
            Current piece: ${state.currentPiece.length}\n
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