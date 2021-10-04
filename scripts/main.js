const PLAYERSSELECTION = ['pvp', 'pvcpu']
const playersSelection = document.querySelector('#players')
const startBTN = document.querySelector('button.btn-start')
const rowStartGame = document.querySelector('div.row-game-start')
const rowGameBoard = document.querySelector('div.row-gameboard-grid')
const gameBoardGrid = document.querySelector('div.gameboard-grid')
const resetBTN = document.querySelector('button.btn-reset')
const rowEndGame = document.querySelector('div.row-end-game')
const restartBTN = document.querySelector('button.btn-restart')
const resultGame = document.querySelector('h1.result-game')

let playerType = PLAYERSSELECTION[0]
let gameboard = []
let lastPlayer = undefined
let winner = undefined
let players = []
let playerOne = undefined
let playerTwo = undefined

function player(name, type = 'X') {
  const listMovePlayed = []
  const addMove = (move) => {
    listMovePlayed.push(move)
  }
  return { name, type, addMove, listMovePlayed }
}

// SELECTION Player vs Player or Player vs CPU
function handlePlayerSelection(e) {
  playerType = e.target.value || PLAYERSSELECTION[0]
}

function cpuChoice(gameboard) {
  let num = Math.floor(Math.random() * 10)
  if (gameboard[num]) {
    cpuChoice(gameboard)
  }
  // if (players[1] === 'pvcpu') {
  //   let cpu = cpuChoice(gameboard)
  //   let div = document.querySelector(`div[data-cell='${cpu}']`)
  //   div.textContent = playerTwo.type
  //   gameboard[cpu] = playerTwo.type
  //   playerTwo.addMove(cpu)
  //   lastPlayer = playerTwo
  // }
  return num
}

function handleCellClick(e, cellNum) {
  // console.log(gameboard[cellNum])
  // already something in cell
  if (gameboard[cellNum]) {
    return
  }
  if (!lastPlayer || lastPlayer.type === playerTwo.type) {
    e.target.textContent = playerOne.type
    gameboard[cellNum] = playerOne.type
    playerOne.addMove(cellNum)
    lastPlayer = playerOne
  } else {
    e.target.textContent = playerTwo.type
    gameboard[cellNum] = playerTwo.type
    playerTwo.addMove(cellNum)
    lastPlayer = playerTwo
  }
}

// START handler
function handleStartBtnClick(e) {
  playerType = playerType || PLAYERSSELECTION[0]
  rowStartGame.style.display = 'none'
  rowGameBoard.style.display = 'flex'

  // handle player
  playerOne = player('X', 'X')
  if (playerType === 'pvp') {
    playerTwo = player('O', 'O')
  }
  if (playerType === 'pvcpu') {
    playerTwo = player('CPU', 'O')
  }
  players.push(playerOne)
  players.push(playerTwo)

  // Display the grid
  displayGrid(gameBoardGrid, gameboard)
}

function displayGrid(gameBoardHTML, gameBoardArray) {
  let div
  lastPlayer = undefined
  winner = undefined
  for (let i = 0; i < 9; i++) {
    div = document.createElement('div')
    div.setAttribute('class', 'cell')
    div.setAttribute('data-cell', i)
    div.addEventListener('click', (e) => {
      handleCellClick(e, i)
      winner = isEndGame(gameboard)
      if (!winner && gameboard.every((c) => typeof c === 'string')) {
        rowEndGame.style.display = 'flex'
        resultGame.textContent = `It's a Tie!`
      }
      if (winner) {
        rowEndGame.style.display = 'flex'
        resultGame.textContent = `Winner is ${winner} !`
      }
    })
    gameBoardArray[i] = null
    gameBoardHTML.appendChild(div)
  }
}

function handleResetBtnClick(e) {
  rowStartGame.style.display = 'flex'
  rowGameBoard.style.display = 'none'
  gameBoardGrid.textContent = ''
  players = []
}

function handleRestartBtnClick(e) {
  rowEndGame.style.display = 'none'
  handleResetBtnClick()
}

/**
 * GAME
 */
function isArrayFull(array) {
  return array.every((el) => el)
}

function isEndGame(gameboardArray) {
  return (
    (gameboardArray[0] === gameboardArray[1] &&
      gameboardArray[0] === gameboardArray[2] &&
      gameboardArray[0]) ||
    (gameboardArray[3] === gameboardArray[4] &&
      gameboardArray[3] === gameboardArray[5] &&
      gameboardArray[3]) ||
    (gameboardArray[6] === gameboardArray[7] &&
      gameboardArray[6] === gameboardArray[8] &&
      gameboardArray[6]) ||
    (gameboardArray[0] === gameboardArray[3] &&
      gameboardArray[0] === gameboardArray[6] &&
      gameboardArray[0]) ||
    (gameboardArray[1] === gameboardArray[4] &&
      gameboardArray[1] === gameboardArray[7] &&
      gameboardArray[1]) ||
    (gameboardArray[2] === gameboardArray[5] &&
      gameboardArray[2] === gameboardArray[8] &&
      gameboardArray[2]) ||
    (gameboardArray[0] === gameboardArray[4] &&
      gameboardArray[0] === gameboardArray[8] &&
      gameboardArray[0]) ||
    (gameboardArray[2] === gameboardArray[4] &&
      gameboardArray[2] === gameboardArray[6] &&
      gameboardArray[2])
  )
}

/**
 * EVENT LISTENER
 */
playersSelection.addEventListener('click', handlePlayerSelection)
startBTN.addEventListener('click', handleStartBtnClick)
resetBTN.addEventListener('click', handleResetBtnClick)
restartBTN.addEventListener('click', handleRestartBtnClick)
