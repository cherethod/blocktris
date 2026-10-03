import { state } from "./state.js";
import { boardHeight, boardWidth } from "./config.js";
import { getHeightOfPiece, rotatePiece } from "./pieces.js";

const canMove = (deltaX, deltaY) => {
    for (let row = 0; row < state.currentPiece.matrix.length; row++) {
        for (let col = 0; col < state.currentPiece.matrix[row].length; col++) {
            if (state.currentPiece.matrix[row][col] === 1) {

                const futureX =
                    state.currentPiece.x + col + deltaX;

                const futureY =
                    state.currentPiece.y + row + deltaY;

                if (
                    futureX < 0 ||
                    futureX >= boardWidth ||
                    futureY < 0 ||
                    futureY >= boardHeight || 
                    state.board[futureY][futureX] === 1
                ) {
                    return false;
                }
            }
        }
    }

    return true;
};

export const movePieceDown = () => {
    if (canMove(0, 1)) state.currentPiece.y += 1;
}

export const movePieceLeft = () => {
    if (canMove(-1, 0)) state.currentPiece.x -= 1;
};

export const movePieceRight = () => {
    if (canMove(1, 0)) state.currentPiece.x += 1;
}

export const rotateCurrentPiece = () => {
    rotatePiece(state.currentPiece.matrix);

    state.currentPiece.height =
        getHeightOfPiece(state.currentPiece.matrix);
};