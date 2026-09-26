import { intervalTimer } from "./config.js";
import { state } from "./state.js";
import { cleanPiece, drawPiece } from "./renderer.js";
import { movePieceDown } from "./movement.js";

export const startGameLoop = () => {
    state.gameLoopId = setInterval(() => {
        cleanPiece();
        movePieceDown();
        drawPiece();
    }, intervalTimer);
};

export const stopGameLoop = () => {
    clearInterval(state.gameLoopId);
    state.gameLoopId = null;
};