import { state } from "./state.js";
import { boardHeight } from "./config.js";

export const movePieceDown = () => {
    if (state.currentPiece.y < boardHeight - state.currentPiece.height) {
        state.currentPiece.y += 1;
    }
    else {
        alert()
    }
}