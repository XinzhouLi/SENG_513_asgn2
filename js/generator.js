"use strict";

const round = 1;
const currentPlayer = round%2;
const chessBoard = []
const chessRecord = []

// init the
window.onload = function (){
    document.getElementById("round_num").innerHTML = round;
};


async function drawBoard(){
    const boardRoot = document.getElementById("checkerboard")
    let tempNode = await emptyPiece()
    // tempNode.innerHTML = 'hello'
    boardRoot.appendChild(tempNode)
}


async function emptyPiece(){
    let boardGrid = document.createElement("div")
    boardGrid.className = "chessGrid"
    let h = document.createElement("div")
    h.className = "h"
    let v = document.createElement("div")
    v.className = "v"
    let piece = document.createElement("button")
    piece.className = "white"
    boardGrid.appendChild(h)
    boardGrid.appendChild(v)
    boardGrid.appendChild(piece)
    return boardGrid
}

function placedPiece(){

}

function temp (){
    console.log("wh")
    drawBoard()
}

