import { state } from "./state.js";
import { boardHeight, boardWidth } from "./config.js";
import { getHeightOfPiece, rotatePiece } from "./pieces.js";

const canMoveDown = () => {
    return state.currentPiece.y < boardHeight - state.currentPiece.height;
}

const canMoveLeft = () => {
    return state.currentPiece.x > 0
}

const canMoveRight = () => {
    return state.currentPiece.x + state.currentPiece.matrix[0].length < boardWidth
}

export const movePieceDown = () => {
    if (canMoveDown()) state.currentPiece.y += 1;
}

export const movePieceLeft = () => {
    if (canMoveLeft()) state.currentPiece.x -= 1;
};

export const movePieceRight = () => {
    if (canMoveRight()) state.currentPiece.x += 1;
}

export const rotateCurrentPiece = () => {
    rotatePiece(state.currentPiece.matrix);

    state.currentPiece.height =
        getHeightOfPiece(state.currentPiece.matrix);
};