import {
    CONTROLS
} from "./config.js";
import {
    cleanPiece,
    drawPiece
} from "./renderer.js";
import {
    movePieceDown,
    movePieceLeft,
    movePieceRight,
    rotateCurrentPiece,
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
        rotateCurrentPiece();
        drawPiece();
    }
};