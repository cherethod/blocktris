import { state } from "./state.js"
import { 
    boardWidth, 
    boardHeight
} from "./config.js";

export const initBoard = () => {
    state.board = [];
    for (let row = 0; row < boardHeight; row++) {
        state.board[row] = [];
        for (let col = 0; col < boardWidth; col++) {
            state.board[row][col] = 0; // Inicializa todas las celdas como vacías (0)
        }
    }
};