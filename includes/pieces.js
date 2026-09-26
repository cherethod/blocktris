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

export const getPieceColor = (pieceType) => {
    switch (pieceType) {
        case 'O':
            return 'blue';
        case 'I':
            return 'red';
        case 'L':
        case 'J':
            return 'green';
        case 'T':
            return 'blue';
        case 'S':
        case 'Z':
            return 'purple';
        default:
            return null;
    }
};

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
    const pieceType = piecesKeys[randomIndex];

    return {
        matrix: pieces[pieceType],
        color: getPieceColor(pieceType)
    };
};