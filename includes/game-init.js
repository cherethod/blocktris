// Variables de elementos
const mainMenu = document.querySelector('.menu__container')
const startBtn = document.querySelector('.menu__start--btn');
const finishBtn = document.querySelector('.menu__finish--btn');
const gameBoardContainer = document.querySelector('.game__container');
const gameBoard = document.querySelector('.game__board');
const context = gameBoard.getContext('2d');

//Variables de configuracion
const boardBgColor = '#000'
const boardWidth = 10; 
const boardHeight = 20;
const cellSize = 30;
const intervalTimer = 1000;
let keyLeft = 37;
let keyRight = 39;
let keyDown = 40;
let keyRotate = 32;


//Variables generales del juego
let internalIntervalId;
gameBoard.width = boardWidth * cellSize;
gameBoard.height = boardHeight * cellSize;
let board = [];
const pieces = {
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

//Variables de la pieza actual
let currentPiece;
let currentPieceX;
let currentPieceY;
let currentPieceColor;
let currentPieceHeight;

const getHeightOfPiece = () => {
    let pieceHeight = 0;
    for (let row = 0; row < currentPiece.length; row++) {
      for (let col = 0; col < currentPiece[row].length; col++) {
        if (currentPiece[row][col] === 1) {
          pieceHeight = Math.max(pieceHeight, row + 1);
        }
      }
    }
    return pieceHeight;
  };


// MATRIZ DE ROTACIÓN

const rotatePiece = (piece)=> {
    let size = piece.length;
    let layers = Math.floor(size / 2);  

    for (let layer = 0; layer < layers; layer++) {
        let first = layer;
        let last = size - 1 - layer;
        for (let i=first; i < last; i++) {
           const offset = i - first;
           const temp = piece[first][i];
           piece[first][i] = piece[last - offset][first];
           piece[last - offset][first] = piece[last][last - offset];
           piece[last][last - offset] = piece[i][last];
           piece[i][last] = temp;
        }
    }
    // FIX PARA PIEZAS DE 4 CELDAS DE LONGITUD
    // if (size === 4) {
    //     const temp = piece[0][1];
    //     piece[0][1] = piece[1][0];
    //     piece[1][0] = temp;
    
    //     const temp2 = piece[0][2];
    //     piece[0][2] = piece[2][0];
    //     piece[2][0] = temp2;
    
    //     const temp3 = piece[1][2];
    //     piece[1][2] = piece[2][1];
    //     piece[2][1] = temp3;
    //   }
}

// MATRIZ DE TRANSFORMACIÓN

// const rotatePiece = (piece) => {
//     const size = piece.length;
//     const matrix = [
//       [0, -1],
//       [1, 0]
//     ];
  
//     for (let row = 0; row < size; row++) {
//       for (let col = 0; col < size; col++) {
//         const newRow = matrix[0][0] * col + matrix[0][1] * row;
//         const newCol = matrix[1][0] * col + matrix[1][1] * row;
//         piece[row][col] = piece[newRow][newCol];
//       }
//     }
//   };

const setPieceColor = (pieceType)=> {
    switch (pieceType) {
        case 'O':
            currentPieceColor = 'blue'
            break;
        case 'I':
            currentPieceColor = 'red'
            break;
        case 'L':
            currentPieceColor = 'green'
            break;
        case 'J':
            currentPieceColor = 'green'
            break;
        case 'T':
            currentPieceColor = 'blue'
            break;
        case 'S':
            currentPieceColor = 'purple'
            break;
        case 'Z':
            currentPieceColor = 'purple'
            break;
        default:
            break;
    }
}

const getRandomNumber = (max)=> {
    let num = Math.floor(Math.random() * (max + 1))
    return num;
}

const createPiece = (templatedPiece) => {
    const newPiece = [];
    for (let i = 0; i < templatedPiece.length; i++) {
      newPiece[i] = templatedPiece[i].slice();
    }
    return newPiece;
}
  
const selectRandomPiece = ()=>{
    const piecesKeys = Object.keys(pieces);   
    const randomIndex = getRandomNumber(piecesKeys.length - 1);    
    const randomPiece = pieces[piecesKeys[randomIndex]];
    setPieceColor(piecesKeys[randomIndex]);
    return randomPiece;
}

const generateNewPiece = () => {
    currentPiece = createPiece(selectRandomPiece());
    const maxPosX = boardWidth - currentPiece[0].length + 1;
    const initialX = getRandomNumber(maxPosX - 1);
  
    currentPieceX = initialX;
    currentPieceY = 0;
    currentPieceHeight = getHeightOfPiece();
    drawPiece();
  };
  

const movePieceDown = ()=> {
    if (currentPieceY < boardHeight - currentPieceHeight) {
        currentPieceY += 1;
    }
    else {
        alert()
    }
}

const drawCell = (x, y) => {
    context.fillStyle = currentPieceColor; // Color de relleno de la celda
    context.strokeStyle = 'black'; // Color del borde de la celda
    context.lineWidth = 1; // Ancho del borde de la celda
  
    context.fillRect(x, y, cellSize, cellSize); // Dibuja el rectángulo de la celda
    context.strokeRect(x, y, cellSize, cellSize); // Dibuja el borde de la celda
  };
  

const drawPiece = () => {    
    for (let row = 0; row < currentPiece.length; row++) {
      for (let col = 0; col < currentPiece[row].length; col++) {
        if (currentPiece[row][col] === 1) {
          const x = (currentPieceX + col) * cellSize;
          const y = (currentPieceY + row) * cellSize;
          drawCell(x, y);
        }
      }
    }
  };
  const cleanCell = (x, y) => {
    context.fillStyle = boardBgColor; // Color de relleno de la celda  
    context.fillRect(x, y, cellSize, cellSize); // Dibuja el rectángulo de la celda
  };
  const cleanPiece = () => {    
    for (let row = 0; row < currentPiece.length; row++) {
      for (let col = 0; col < currentPiece[row].length; col++) {
        if (currentPiece[row][col] === 1) {
          const x = (currentPieceX + col) * cellSize;
          const y = (currentPieceY + row) * cellSize;
          cleanCell(x, y);
        }
      }
    }
  }; 


const initBoard = () => {
    board = [];
    for (let row = 0; row < boardHeight; row++) {
      board[row] = [];
      for (let col = 0; col < boardWidth; col++) {
        board[row][col] = 0; // Inicializa todas las celdas como vacías (0)
      }
    }
  };

 
const drawBoard = ()=> {
    context.fillStyle = boardBgColor;
    context.fillRect(0, 0, gameBoard.width, gameBoard.height);

    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
            const x = col * cellSize;
            const y = row * cellSize;
            const cell = board[row][col];

            if (cell === 1) {
                context.fillStyle = '#f00';
                context.fillRect(x, y, cellSize, cellSize);
            }
        }
    }
}

const startTimer= ()=> {
    internalIntervalId = setInterval(() => {        
        console.log(`Current piece: ${currentPiece.length}\nCurrent X position: ${currentPieceX}\nCurrent Y position: ${currentPieceY}`)
        cleanPiece();
        movePieceDown();
        drawPiece();
    }, intervalTimer);
}

const stopTimer = ()=> {
    clearInterval(internalIntervalId);
}

const loadGameBoard = ()=> {
    mainMenu.style.display='none';
    gameBoardContainer.style.display='grid';
    initBoard();
    drawBoard();
    generateNewPiece();
    document.addEventListener('keydown', keyHandler);
    // setTimeout(() => {
        startTimer();
    // }, intervalTimer); 
}
const endGame = ()=> {
    stopTimer();
    document.removeEventListener('keydown', keyHandler);
    currentPiece = undefined;
    currentPieceX = undefined;
    currentPieceY = undefined;
    currentPieceColor = undefined;
    currentPieceHeight = undefined;
    mainMenu.style.display='flex';
    gameBoardContainer.style.display='none';    
}

const keyHandler = (event)=> {
    let keyCode = event.keyCode || event.which;

    switch (keyCode) {
        case keyLeft:
            if (currentPieceX > 0) {
                cleanPiece();
                currentPieceX -= 1;
                drawPiece();
            }            
            break;
        case keyRight:
            if (currentPieceX + currentPiece.length < boardWidth ) {
                cleanPiece();
                currentPieceX += 1;
                drawPiece();
            }
            break;
        case keyDown:
            
            break;
        case keyRotate:
            cleanPiece();
            rotatePiece(currentPiece);
            currentPieceHeight = getHeightOfPiece();
            drawPiece();
            break;
        default:
            break;
    }
}


const initGame = ()=> {
    startBtn.addEventListener('click', loadGameBoard);    
    finishBtn.addEventListener('click', endGame);
}

window.addEventListener("DOMContentLoaded", ()=> {
    initGame();
})