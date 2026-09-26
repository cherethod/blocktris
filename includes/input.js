import { CONTROLS, boardWidth } from "./config.js";
import { state } from "./state.js";
import { cleanPiece, drawPiece } from "./renderer.js";

export const keyHandler = (event) => {
    if (CONTROLS.left.includes(event.key)) {
        if (state.currentPiece.x > 0) {
            cleanPiece();
            state.currentPiece.x -= 1;
            drawPiece();
        }
    }
    if (CONTROLS.right.includes(event.key)) {
        if (
            state.currentPiece.x + state.currentPiece.matrix[0].length
            < boardWidth
        ) {
            cleanPiece();
            state.currentPiece.x += 1;
            drawPiece();
        }
    }
};