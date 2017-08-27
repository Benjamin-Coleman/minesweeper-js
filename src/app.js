const boardWrapper = document.getElementById('board-wrapper')
let board = new Board
board.init()

boardWrapper.innerHTML = board.renderAll()

let allCellEls = document.querySelectorAll('.cell')

// allCellEls.forEach(function(cell){
// 	cell.addEventListener('click', checkCell)
// 	cell.addEventListener('contextmenu', flagCell)
// })

boardWrapper.addEventListener('click', checkCell)
boardWrapper.addEventListener('contextmenu', flagCell)

function checkCell(e){
	console.log(e)
	let el = e.target
	el.classList.remove('unclicked')
	//check if bomb
	//reveal all empty cells
	if (el.dataset.mine == "true"){
		gameOver()
	} else {
		revealCount(el)
		findOpenAdjacent(parseInt(el.dataset.cellId))
		checkWin()
	}

}

function flagCell(e){
	e.preventDefault()
	console.log(e)

	if(parseInt(event.target.dataset.state) == 0){
		event.target.dataset.state = 1
	}
	else if (parseInt(event.target.dataset.state) == 1){
		event.target.dataset.state = 2
	}
	else {
		event.target.dataset.state = 0
	}

	switch(event.target.dataset.state){
    case '1':
      // event.target.innerHTML = '&#9873;';
      event.target.innerHTML = '🚩';
      break;
    case '2':
      event.target.innerHTML = '?';
      break;
    default:
      event.target.innerHTML = '';
  }
}

function revealCount(el){
	el.classList.remove('unclicked')
	el.innerHTML = el.dataset.adjacent
	findOpenAdjacent(parseInt(el.dataset.cellId))
}

function revealBoard(el){
	el.innerHTML = el.dataset.adjacent
}

function checkWin(){
	let allMines = Array.prototype.slice.call(document.querySelectorAll('.cell[data-mine="true"]'))
	let unclickedCells = document.querySelectorAll('.unclicked')
	if (allMines.every(cell => cell.dataset.state == 1) && unclickedCells.length === allMines.length){
		alert('You won!')
	}
}

function findOpenAdjacent(cellId){
	let el = document.querySelector(`.cell[data-cell-id="${cellId}"]`)
	// revealCount(el)
	if (el.dataset.adjacent == 0){
		// let current = all[(cellId - 1)]
		// if (document.querySelector(`.cell[data-cell-id="${(cellId - 1)}"]`).dataset.mine == 'false'){
		// 	findOpenAdjacent(parseInt(el.dataset.cellId) - 1)
		// }
		// to the left
		if (document.querySelector(`.cell[data-cell-id="${(cellId - 1)}"]`)){
			let next = document.querySelector(`.cell[data-cell-id="${(cellId - 1)}"]`)
			if (!next.classList.contains('unclicked')) return
			let nextIsSafe = next.dataset.mine == 'false';
			let nextRow = next.dataset.rowId
			if (nextIsSafe && nextRow == el.dataset.rowId){
				revealCount(next)
			}
		}
		// upper left
		if (document.querySelector(`.cell[data-cell-id="${(cellId - 1) - board.size}"]`)){
			let next = document.querySelector(`.cell[data-cell-id="${(cellId - 1) - board.size}"]`)
			if (!next.classList.contains('unclicked')) return
			let nextIsSafe = next.dataset.mine == 'false';
			let nextRow = next.dataset.rowId
			if (nextIsSafe && nextRow == (el.dataset.rowId - 1)){
				revealCount(next)
			}
		}

		// above
		if (document.querySelector(`.cell[data-cell-id="${cellId - board.size}"]`)){
			let next = document.querySelector(`.cell[data-cell-id="${cellId - board.size}"]`)
			if (!next.classList.contains('unclicked')) return
			let nextIsSafe = next.dataset.mine == 'false';
			let nextRow = next.dataset.rowId
			if (nextIsSafe && nextRow == (el.dataset.rowId - 1)){
				debugger
				revealCount(next)
			}
		}	
		// upper right
		if (document.querySelector(`.cell[data-cell-id="${(cellId + 1) - board.size}"]`)){
			let next = document.querySelector(`.cell[data-cell-id="${(cellId + 1) - board.size}"]`)
			if (!next.classList.contains('unclicked')) return
			let nextIsSafe = next.dataset.mine == 'false';
			let nextRow = next.dataset.rowId
			if (nextIsSafe && nextRow == (el.dataset.rowId - 1)){
				revealCount(next)
			}
		}
		// right
		if (document.querySelector(`.cell[data-cell-id="${(cellId + 1)}"]`)){
			let next = document.querySelector(`.cell[data-cell-id="${(cellId + 1)}"]`)
			if (!next.classList.contains('unclicked')) return
			let nextIsSafe = next.dataset.mine == 'false';
			let nextRow = next.dataset.rowId
			if (nextIsSafe && nextRow == el.dataset.rowId){
				revealCount(next)
			}
		}
		// lower right 
		if (document.querySelector(`.cell[data-cell-id="${(cellId + 1) + board.size}"]`)){
			let next = document.querySelector(`.cell[data-cell-id="${(cellId + 1) + board.size}"]`)
			if (!next.classList.contains('unclicked')) return
			let nextIsSafe = next.dataset.mine == 'false';
			let nextRow = next.dataset.rowId
			if (nextIsSafe && nextRow == (el.dataset.rowId + 1)){
				revealCount(next)
			}
		}
		// below
		if (document.querySelector(`.cell[data-cell-id="${cellId + board.size}"]`)){
			let next = document.querySelector(`.cell[data-cell-id="${cellId + board.size}"]`)
			if (!next.classList.contains('unclicked')) return
			let nextIsSafe = next.dataset.mine == 'false';
			let nextRow = next.dataset.rowId
			if (nextIsSafe && nextRow == (el.dataset.rowId + 1)){
				debugger
				revealCount(next)
			}
		}	
		// lower left
		if (document.querySelector(`.cell[data-cell-id="${(cellId - 1) + board.size}"]`)){
			let next = document.querySelector(`.cell[data-cell-id="${(cellId - 1) + board.size}"]`)
			if (!next.classList.contains('unclicked')) return
			let nextIsSafe = next.dataset.mine == 'false';
			let nextRow = next.dataset.rowId
			if (nextIsSafe && nextRow == (el.dataset.rowId + 1)){
				revealCount(next)
			}
		}
	}
}

function gameOver(){
	alert('You Lost!')
	Array.prototype.slice.call(allCellEls).map(el => {
		if (el.dataset.mine == "true"){
			el.innerHTML = "💣"
		}
		else {
			revealBoard(el)
		}
	})
}