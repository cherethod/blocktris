import { state } from "./state.js"

export const pieces = {
    O: [
        [1,1],
        [1,1]
    ],
    I: [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    L: [
        [0,0,1],
        [1,1,1],
        [0,0,0]        
    ],
    J: [
        [1,0,0],
        [1,1,1],
        [0,0,0]        
    ],
    T: [
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ],
    S: [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    Z: [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ]
}

export const getHeightOfPiece = (piece) => {
    let pieceHeight = 0;

    for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece[row].length; col++) {
            if (piece[row][col] === 1) {
                pieceHeight = Math.max(pieceHeight, row + 1);
            }
        }
    }

    return pieceHeight;
};

export const rotatePiece = (piece) => {
    let size = piece.length;
    let layers = Math.floor(size / 2);

    for (let layer = 0; layer < layers; layer++) {
        let first = layer;
        let last = size - 1 - layer;
        for (let i = first; i < last; i++) {
            const offset = i - first;
            const temp = piece[first][i];
            piece[first][i] = piece[last - offset][first];
            piece[last - offset][first] = piece[last][last - offset];
            piece[last][last - offset] = piece[i][last];
            piece[i][last] = temp;
        }
    }
}

export const setPieceColor = (pieceType) => {
    switch (pieceType) {
        case 'O':
            state.currentPiece.color = 'blue'
            break;
        case 'I':
            state.currentPiece.color = 'red'
            break;
        case 'L':
            state.currentPiece.color = 'green'
            break;
        case 'J':
            state.currentPiece.color = 'green'
            break;
        case 'T':
            state.currentPiece.color = 'blue'
            break;
        case 'S':
            state.currentPiece.color = 'purple'
            break;
        case 'Z':
            state.currentPiece.color = 'purple'
            break;
        default:
            break;
    }
}

export const getRandomNumber = (max) => {
    let num = Math.floor(Math.random() * (max + 1))
    return num;
}

export const createPiece = (templatedPiece) => {
    const newPiece = [];
    for (let i = 0; i < templatedPiece.length; i++) {
        newPiece[i] = templatedPiece[i].slice();
    }
    return newPiece;
}

export const selectRandomPiece = () => {
    const piecesKeys = Object.keys(pieces);
    const randomIndex = getRandomNumber(piecesKeys.length - 1);
    const randomPiece = pieces[piecesKeys[randomIndex]];
    setPieceColor(piecesKeys[randomIndex]);
    return randomPiece;
}