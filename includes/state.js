export const state = {
    board: [],

    currentPiece: {
        matrix: null,
        x: 0,
        y: 0,
        color: null,
        height: 0
    },

    internalIntervalId: null
};

export const resetCurrentPiece = () => {
    state.currentPiece.matrix = null;
    state.currentPiece.x = 0;
    state.currentPiece.y = 0;
    state.currentPiece.color = null;
    state.currentPiece.height = 0;
};