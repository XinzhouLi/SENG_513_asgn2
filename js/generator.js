"use strict";

let round = 0;
let currentPlayer = round%2;


// init the board when the window load
window.onload = function (){
    document.getElementById("round_num").innerHTML = round;
    initEmptyBoard()
};



async function resetGame() {
    const boardRoot = document.getElementById("checkerboard")
    for (let i = 224; i >= 0; i--) {
        boardRoot.children[i].remove()
    }
    round = 0
    currentPlayer = round%2
    document.getElementById("player").innerHTML = "Black";
    document.getElementById("round_num").innerHTML = round;
    for (let i = 0; i <= 224; i++) {
        let tempNode = await pieces("empty", i)
        boardRoot.appendChild(tempNode)
    }
}

async function initEmptyBoard(){
    const boardRoot = document.getElementById("checkerboard")
    for (let i = 0; i <= 224; i++) {
            let tempNode = await pieces("empty", i)
            boardRoot.appendChild(tempNode)
        }
}

// This function return a element of a single chess grid, and it chessgrid should display different status of
// chess (black, white, empty), for empty when need to implement the replacing the piece based on the current
// player

async function pieces(pieceType,position){
    let boardGrid = document.createElement("div")
    boardGrid.className = "chessGrid"
    boardGrid.id = position
    let h = document.createElement("div")
    h.className = "h"
    let v = document.createElement("div")
    v.className = "v"
    let piece = document.createElement("button")
    let pos= document.createElement("div")
    pos.innerHTML = position
    pos.className = "test"

    if (pieceType === "black"){
        piece.className = "black"
    }
    else if (pieceType === "white"){
        piece.className = "white"
    }
    else{
        piece.className = "empty"
        piece.addEventListener("click", async function () {
            round = round + 1
            currentPlayer = round%2
            document.getElementById("round_num").innerHTML = round;
            if (currentPlayer === 1){
                document.getElementById("player").innerHTML = "Black";
                boardGrid.replaceWith(await pieces("black", position))

            }
            else{
                document.getElementById("player").innerHTML = "White";
                boardGrid.replaceWith(await pieces("white", position))
            }
            if (await checkWiningCondition(position)){
                window.alert(+ currentPlayer?"Winner is black":"Winner is white")
                resetGame()
            }
        })
    }
    boardGrid.appendChild(pos)
    boardGrid.appendChild(h)
    boardGrid.appendChild(v)
    boardGrid.appendChild(piece)
    return boardGrid
}


// Every time a piece was placed, check all four direction of piece, if number of same type of connected piece
// are five. if is five then declare the winner

async function checkWiningCondition(pos) {
    let currentPiece = document.getElementById(pos).children[3]
    let currentType = currentPiece.className
    let twoDcoord = convert1Dto2D(pos)
    let connected = -1

    // check up direction
    let checkCood = twoDcoord
    let checkNode = null
    while (validator(checkCood)){
        checkNode = document.getElementById(convert2Dto1D(checkCood)).children[3]
        if (checkNode.className !== currentType) {
            break
        } else {
            connected = connected + 1
        }
        checkCood = [checkCood[0] - 1, checkCood[1]]
    }
    // check down direction
    checkCood = twoDcoord
    checkNode = null
    while (validator(checkCood)){
        checkNode = document.getElementById(convert2Dto1D(checkCood)).children[3]
        if (checkNode.className === currentType){
            connected = connected + 1
        }
        else {
            break
        }
        checkCood = [checkCood[0] + 1, checkCood[1]]
    }
    console.log(connected)
    if (connected === 5){
        return true
    }else {
        connected = -1
    }


    // check left direction
    checkCood = twoDcoord
    checkNode = null
    while (validator(checkCood)){
        checkNode = document.getElementById(convert2Dto1D(checkCood)).children[3]
        if (checkNode.className === currentType){
            connected = connected + 1
        }
        else {
            break
        }
        checkCood = [checkCood[0] , checkCood[1]-1]
    }

    // check right direction
    checkCood = twoDcoord
    checkNode = null
    while (validator(checkCood)){
        checkNode = document.getElementById(convert2Dto1D(checkCood)).children[3]
        if (checkNode.className === currentType){
            connected = connected + 1
        }
        else {
            break
        }
        checkCood = [checkCood[0] , checkCood[1]+1]
    }
    console.log(connected)
    if (connected === 5){
        return true
    }else {
        connected = -1
    }

    // check upright direction
    checkCood = twoDcoord
    checkNode = null
    while (validator(checkCood)){
        checkNode = document.getElementById(convert2Dto1D(checkCood)).children[3]
        if (checkNode.className === currentType){
            connected = connected + 1
        }
        else {
            break
        }
        checkCood = [checkCood[0]-1 , checkCood[1]+1]
    }

    // check downleft direction
    checkCood = twoDcoord
    checkNode = null
    while (validator(checkCood)){
        checkNode = document.getElementById(convert2Dto1D(checkCood)).children[3]
        if (checkNode.className === currentType){
            connected = connected + 1
        }
        else {
            break
        }
        checkCood = [checkCood[0]+1 , checkCood[1]-1]
    }

    console.log(connected)
    if (connected === 5){
        return true
    }else {
        connected = -1
    }



    // check upleft direction
    checkCood = twoDcoord
    checkNode = null
    while (validator(checkCood)){
        checkNode = document.getElementById(convert2Dto1D(checkCood)).children[3]
        if (checkNode.className === currentType){
            connected = connected + 1
        }
        else {
            break
        }
        checkCood = [checkCood[0]-1 , checkCood[1]-1]
    }

    // check downright direction
    checkCood = twoDcoord
    checkNode = null
    while (validator(checkCood)){
        checkNode = document.getElementById(convert2Dto1D(checkCood)).children[3]
        if (checkNode.className === currentType){
            connected = connected + 1
        }
        else {
            break
        }
        checkCood = [checkCood[0]+1 , checkCood[1]+1]
    }

    if (connected === 5){
        return true
    }
    console.log(connected)

    return false

}

// Convert the 1D array coordinate to 2D array coordinate
function convert1Dto2D(pos1d){
    let col = pos1d % 15
    let row = (pos1d-col) / 15
    return[row, col]
}

// Convert the 2D array coordinate to 1D array coordinate for easy calculating
function convert2Dto1D(pos2d){
    return pos2d[0] * 15 + pos2d[1]
}


// Check if the 2D coordinate is out of the boundary of the chessboard.
function validator(pos2d){
    if (pos2d[0] >= 0 && pos2d[0] <= 14 && pos2d[1] >= 0 && pos2d[1] <= 14){
        return true
    }
    return false
}

