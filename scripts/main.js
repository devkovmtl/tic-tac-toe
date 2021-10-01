const PLAYERSSELECTION = ['pvp', 'pvcpu']
const playersSelection = document.querySelector('#players')
const startBTN = document.querySelector('button.btn-start')
const rowStartGame = document.querySelector('div.row-game-start')
const rowGameBoard = document.querySelector('div.row-gameboard-grid')
const gameBoardGrid = document.querySelector('div.gameboard-grid')
const resetBTN = document.querySelector('button.btn-reset')

let playerType = PLAYERSSELECTION[0]
let gameboard = []

// SELECTION Player vs Player or Player vs CPU
function handlePlayerSelection(e) {
  playerType = e.target.value || PLAYERSSELECTION[0]
}

function handleCellClick(e, cellNum) {
  console.log(cellNum)
}

// START handler
function handleStartBtnClick(e) {
  playerType = playerType || PLAYERSSELECTION[0]
  rowStartGame.style.display = 'none'
  rowGameBoard.style.display = 'flex'

  // Display the grid
  displayGrid(gameBoardGrid, gameboard)
}

function displayGrid(gameBoardHTML, gameBoardArray) {
  let div
  for (let i = 0; i < 9; i++) {
    div = document.createElement('div')
    div.setAttribute('class', 'cell')
    div.setAttribute('data-cell', i)
    div.addEventListener('click', (e) => handleCellClick(e, i))
    gameBoardArray[i] = null
    gameBoardHTML.appendChild(div)
  }
}

function handleResetBtnClick(e) {
  rowStartGame.style.display = 'flex'
  rowGameBoard.style.display = 'none'
  gameBoardGrid.textContent = ''
}

/**
 * GAME
 */
function isArrayFull(array) {
  return array.every((el) => el)
}

/**
 * EVENT LISTENER
 */
playersSelection.addEventListener('click', handlePlayerSelection)
startBTN.addEventListener('click', handleStartBtnClick)
resetBTN.addEventListener('click', handleResetBtnClick)
