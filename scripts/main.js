const gameboardGrid = document.querySelector('.gameboard-grid')

const game = (() => {
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

  const handleCellClick = (e) => {
    console.log(e.target.dataset.cell)
    e.target.textContent = 'X'
    gameboard[e.target.dataset.cell] = 'X'
  }

  const displayGameboard = () => {
    let div
    for (let i = 1; i < gameboard.length + 1; i++) {
      div = document.createElement('div')
      div.setAttribute('class', 'cell')
      div.setAttribute('data-cell', i)
      div.textContent = i
      div.addEventListener('click', handleCellClick)
      gameboardGrid.appendChild(div)
    }
  }

  return {
    displayGameboard,
  }
})()

game.displayGameboard(gameboardGrid)
