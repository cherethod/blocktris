import { state } from "./state.js";
import { boardHeight, boardWidth } from "./config.js";
import { getHeightOfPiece, rotatePiece } from "./pieces.js";

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

export const rotateCurrentPiece = () => {
    rotatePiece(state.currentPiece.matrix);

    state.currentPiece.height =
        getHeightOfPiece(state.currentPiece.matrix);
};