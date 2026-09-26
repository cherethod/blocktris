import { intervalTimer } from "./config.js";
import { state } from "./state.js";
import { cleanPiece, drawPiece } from "./renderer.js";
import { movePieceDown } from "./movement.js";

export const startGameLoop = () => {
    state.gameLoopId = setInterval(() => {
        console.log(`
            Current piece: ${state.currentPiece.matrix.length}
            Current X position: ${state.currentPiece.x}
            Current Y position: ${state.currentPiece.y}
        `);

        cleanPiece();
        movePieceDown();
        drawPiece();
    }, intervalTimer);
};

export const stopGameLoop = () => {
    clearInterval(state.gameLoopId);
    state.gameLoopId = null;
};