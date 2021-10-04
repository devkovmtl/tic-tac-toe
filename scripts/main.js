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

function player(name, type = 'X') {
  const listMovePlayed = []
  const addMove = (move) => {
    listMovePlayed.push(move)
  }
  return { name, type, addMove, listMovePlayed }
}

function isArrayFull(array) {
  return array.every((el) => el)
}

// SELECTION Player vs Player or Player vs CPU
function handlePlayerSelection(e) {
  playerType = e.target.value || PLAYERSSELECTION[0]
}

let playerType = PLAYERSSELECTION[0]

/**
 * GAME
 */

const game = (() => {
  let gameboard = []
  let lastPlayer = undefined
  let winner = undefined
  let players = []
  let playerOne = undefined
  let playerTwo = undefined

  const handleRestartBtnClick = (e) => {
    rowEndGame.style.display = 'none'
    handleResetBtnClick()
  }

  const handleResetBtnClick = (e) => {
    rowStartGame.style.display = 'flex'
    rowGameBoard.style.display = 'none'
    gameBoardGrid.textContent = ''
    players = []
  }
  const cpuMove = (gameboard) => {
    if (winner || gameboard.every((c) => typeof c === 'string')) {
      return
    }
    let num = Math.floor(Math.random() * 9)
    while (gameboard[num] !== null) {
      num = cpuMove(gameboard)
    }
    return num
  }

  const tieOrWinner = (w) => {
    if (!w && gameboard.every((c) => typeof c === 'string')) {
      rowEndGame.style.display = 'flex'
      resultGame.textContent = `It's a Tie!`
    }
    if (w) {
      rowEndGame.style.display = 'flex'
      resultGame.textContent = `Winner is ${w} !`
    }
  }
  // Check if we have a winner
  const isEndGame = (gameboardArray) => {
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
  // handle the click cell to add 'X' or 'O'
  const handleCellClick = (e, cellNum) => {
    if (playerType === 'pvcpu') {
      if (gameboard[cellNum]) {
        return
      }
      winner = isEndGame(gameboard)
      if (winner) {
        tieOrWinner(gameboard)
        return
      }
      if (!lastPlayer || lastPlayer.type === playerTwo.type) {
        e.target.textContent = playerOne.type
        gameboard[cellNum] = playerOne.type
        playerOne.addMove(cellNum)
        lastPlayer = playerOne
        // check winner
        winner = isEndGame(gameboard)

        if (winner) {
          tieOrWinner(winner)
          return
        }
        setTimeout(() => {
          if (!winner || !gameboard.every((c) => typeof c === 'string')) {
            const cpuNum = cpuMove(gameboard)
            console.log('CPU MOVE RECEIVE,', cpuNum)
            let div = document.querySelector(`div[data-cell='${cpuNum}']`)
            div.textContent = playerTwo.type
            gameboard[cpuNum] = playerTwo.type
            playerTwo.addMove(cpuNum)
            lastPlayer = playerTwo
            winner = isEndGame(gameboard)
            tieOrWinner(winner)
          } else {
            winner = isEndGame(gameboard)
            tieOrWinner(winner)
          }
        }, 250)
      }
    } else {
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
  }

  // display grid
  const displayGrid = (gameBoardHTML, gameBoardArray) => {
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
        tieOrWinner(winner)
      })
      gameBoardArray[i] = null
      gameBoardHTML.appendChild(div)
    }
  }

  // START handler
  const handleStartBtnClick = (e) => {
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

  return { handleStartBtnClick, handleRestartBtnClick, handlePlayerSelection }
})()

/**
 * EVENT LISTENER
 */
playersSelection.addEventListener('click', handlePlayerSelection)
startBTN.addEventListener('click', game.handleStartBtnClick)
resetBTN.addEventListener('click', game.handleResetBtnClick)
restartBTN.addEventListener('click', game.handleRestartBtnClick)
