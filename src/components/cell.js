const Cell = (function createCell(){

	let id = 0

	return class Cell {
		constructor(boardSize){
			this.isMine = false
			this.adjacent = 0
			this.state = 0
			this.display = ""
			this.id = ++id
			this.boardSize = boardSize
			this.row = Math.floor((this.id - 1)/ parseInt(boardSize)) + 1
		}

		render(){
			return `<div class="cell unclicked" data-mine="${this.isMine}" data-state="${this.state}" data-cell-id=${this.id} data-adjacent="${this.adjacent}" data-row-id=${this.row}>${this.display}</div>`
		}



	}
})()