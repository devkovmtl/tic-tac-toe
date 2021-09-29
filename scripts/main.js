const gameboardGridROW = document.querySelector('.row-gameboard-grid')
const gameboardGrid = document.querySelector('.gameboard-grid')
const btnStart = document.querySelector('.btn-start')
const startGameRow = document.querySelector('.start-game')

const player = (name, type = 'X') => {
  const listMovePlayed = []

  const addMove = (move) => {
    listMovePlayed.push(move)
  }

  return { name, type, addMove, listMovePlayed }
}

const game = (() => {
  let lastPlayed = ''

  let winner = ''

  const gameboard = ['', '', '', '', '', '', '', '', '']

  const gameEnd = (gameboard) =>
    (gameboard[1] === gameboard[2] &&
      gameboard[2] === gameboard[3] &&
      gameboard[1]) ||
    (gameboard[4] === gameboard[5] &&
      gameboard[5] === gameboard[6] &&
      gameboard[4]) ||
    (gameboard[7] === gameboard[8] &&
      gameboard[8] === gameboard[9] &&
      gameboard[7]) ||
    (gameboard[1] === gameboard[4] &&
      gameboard[4] === gameboard[7] &&
      gameboard[1]) ||
    (gameboard[2] === gameboard[5] &&
      gameboard[5] === gameboard[8] &&
      gameboard[2]) ||
    (gameboard[3] === gameboard[6] &&
      gameboard[6] === gameboard[9] &&
      gameboard[3]) ||
    (gameboard[1] === gameboard[5] &&
      gameboard[5] === gameboard[9] &&
      gameboard[1]) ||
    (gameboard[3] === gameboard[5] &&
      gameboard[5] === gameboard[7] &&
      gameboard[3])

  const startGame = () => {
    while (!winner || !winner.length) {}
    alert('WE have a winner', winner)
  }

  const handleCellClick = (e) => {
    // if (playerCanPlay) {
    if (!lastPlayed || !lastPlayed.length || lastPlayed === 'O') {
      // console.log(e.target.dataset.cell)
      e.target.textContent = 'X'
      gameboard[e.target.dataset.cell] = 'X'
      lastPlayed = 'X'
    } else {
      e.target.textContent = 'O'
      gameboard[e.target.dataset.cell] = 'O'
      lastPlayed = 'O'
    }
    // }
    // return
  }

  const displayGameboard = (gameboardGrid) => {
    let div
    for (let i = 1; i < gameboard.length + 1; i++) {
      div = document.createElement('div')
      div.setAttribute('class', 'cell')
      div.setAttribute('data-cell', i)
      div.addEventListener('click', (e) => {
        // console.log(!gameEnd(gameboard))
        if (!gameEnd(gameboard)) {
          handleCellClick(e)
          winner = gameEnd(gameboard)
          console.log(winner)
        }
      })
      gameboardGrid.appendChild(div)
    }
  }

  return {
    displayGameboard,
    gameEnd,
    gameboard,
  }
})()

function onGameStart(e) {
  game.displayGameboard(gameboardGrid)
  startGameRow.style.display = 'none'
  gameboardGridROW.style.display = 'flex'
}

btnStart.addEventListener('click', onGameStart)
