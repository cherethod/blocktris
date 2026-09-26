import { gameBoard, context } from "./dom.js";
import { boardWidth, boardHeight, cellSize, boardBgColor } from "./config.js";
import { state } from "./state.js";

gameBoard.width = boardWidth * cellSize;
gameBoard.height = boardHeight * cellSize;

export const drawCell = (x, y) => {
    context.fillStyle = state.currentPiece.color; // Color de relleno de la celda
    context.strokeStyle = 'black'; // Color del borde de la celda
    context.lineWidth = 1; // Ancho del borde de la celda

    context.fillRect(x, y, cellSize, cellSize); // Dibuja el rectángulo de la celda
    context.strokeRect(x, y, cellSize, cellSize); // Dibuja el borde de la celda
};


export const drawPiece = () => {
    for (let row = 0; row < state.currentPiece.matrix.length; row++) {
        for (let col = 0; col < state.currentPiece.matrix[row].length; col++) {
            if (state.currentPiece.matrix[row][col] === 1) {
                const x = (state.currentPiece.x + col) * cellSize;
                const y = (state.currentPiece.y + row) * cellSize;
                drawCell(x, y);
            }
        }
    }
};


export const drawBoard = () => {
    context.fillStyle = boardBgColor;
    context.fillRect(0, 0, gameBoard.width, gameBoard.height);

    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
            const x = col * cellSize;
            const y = row * cellSize;
            const cell = state.board[row][col];

            if (cell === 1) {
                context.fillStyle = '#f00';
                context.fillRect(x, y, cellSize, cellSize);
            }
        }
    }
}
