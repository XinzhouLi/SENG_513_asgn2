"use strict";

const round = 1;
const currentPlayer = round%2;
const chessBoard = []
const chessRecord = []

// init the
window.onload = function (){
    document.getElementById("round_num").innerHTML = round;
    initEmptyBoard()
};


async function initEmptyBoard(){
    const boardRoot = document.getElementById("checkerboard")
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            let tempNode = await pieces("empty")
            boardRoot.appendChild(tempNode)
        }
    }
}


async function drawBoard(){
    const boardRoot = document.getElementById("checkerboard")
    let tempNode = await pieces()
    boardRoot.appendChild(tempNode)
}

async function updateBoard(index, pieceType){
    // need calculation for the index
    let position = 3

    let boardRoot = document.getElementById("checkerboard")
    //remove the old element
    boardRoot.removeChild(boardRoot.children[position])
    //append the new element
    let newPiece = await pieces(pieceType)
    console.log(newPiece)
    // need to handle the last and first boundary case
    boardRoot.children[position].insertAdjacentElement("beforebegin", newPiece)
}


async function pieces(pieceType){
    let boardGrid = document.createElement("div")
    boardGrid.className = "chessGrid"
    let h = document.createElement("div")
    h.className = "h"
    let v = document.createElement("div")
    v.className = "v"
    let piece = document.createElement("button")
    if (pieceType === "black"){
        piece.className = "black"
    }
    else if (pieceType === "white"){
        piece.className = "white"
    }
    else{
        piece.className = "empty"
        // piece.addEventListener("click", )
    }
    boardGrid.appendChild(h)
    boardGrid.appendChild(v)
    boardGrid.appendChild(piece)
    return boardGrid
}


function placingPiece(){

}





function temp (){
    console.log("wh")
    updateBoard(3,"black")
}

