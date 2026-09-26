import { state } from "./state.js";
import { boardHeight, boardWidth } from "./config.js";

export const movePieceLeft = () => {
    if (state.currentPiece.x > 0)
        state.currentPiece.x -= 1;

};

export const movePieceRight = () => {
    if (
        state.currentPiece.x + state.currentPiece.matrix[0].length
        < boardWidth
    ) state.currentPiece.x += 1;
}

export const movePieceDown = () => {
    if (state.currentPiece.y < boardHeight - state.currentPiece.height) {
        state.currentPiece.y += 1;
    }
    else {
        alert()
    }
}

export const getHeightOfPiece = (piece) => {
    let pieceHeight = 0;

    for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece[row].length; col++) {
            if (piece[row][col] === 1) {
                pieceHeight = Math.max(pieceHeight, row + 1);
            }
        }
    }

    return pieceHeight;
};

export const rotatePiece = (piece) => {
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
}