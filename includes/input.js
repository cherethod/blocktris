import {
    CONTROLS
} from "./config.js";
import { state } from "./state.js";
import {
    cleanPiece,
    drawPiece
} from "./renderer.js";
import {
    movePieceDown,
    movePieceLeft,
    movePieceRight,
    getHeightOfPiece,
    rotatePiece
} from "./movement.js";

export const keyHandler = (event) => {
    if (CONTROLS.left.includes(event.key)) {
        cleanPiece();
        movePieceLeft();
        drawPiece();
    }

    if (CONTROLS.right.includes(event.key)) {
        cleanPiece();
        movePieceRight();
        drawPiece();
    }

    if (CONTROLS.down.includes(event.key)) {
        cleanPiece();
        movePieceDown();
        drawPiece();
    }

    if (CONTROLS.rotate.includes(event.key)) {
        cleanPiece();
        rotatePiece(state.currentPiece.matrix);
        state.currentPiece.height = getHeightOfPiece(state.currentPiece.matrix);
        drawPiece();
    }
};