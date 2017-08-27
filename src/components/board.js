class Board {
	constructor(){
		this.size = 10
		this.numberOfMines = 20
		this.cellsArray = []
	}

	init(){
		this.addCells()
		this.addMines()
		this.addAdjacentNumbers()
	}

	addCells(){
		for (let i = 0; i < (this.size * this.size); i++){
			this.cellsArray.push(new Cell(parseInt(this.size)))
		}
	}

	addMines(){
		let minesToAssign = this.numberOfMines
		while (minesToAssign > 0){
			let position = Math.floor(Math.random() * this.cellsArray.length)
			if (!this.cellsArray[position].isMine) {
				this.cellsArray[position].isMine = true
				minesToAssign--
			}
		}
	}

	addAdjacentNumbers(){
		let all = this.cellsArray
		for (let i = 0; i < all.length; i++){
			// to the left
			if (all[i - 1] && all[i - 1].isMine && all[i].row == all[i - 1].row){
				all[i].adjacent++
			}
			// upper left
			if (all[((i - 1) - this.size)] && all[((i -1 ) - this.size)].isMine && ((all[((i - 1) - this.size)].row) + 1) == all[i].row){
				all[i].adjacent++
			// above
			}
			if (all[i - this.size] && all[i - this.size].isMine){
				all[i].adjacent++}
			// upper right
			if (all[((i + 1) - this.size)] && all[((i + 1) - this.size)].isMine && ((all[((i + 1) - this.size)].row) + 1) == all[i].row){
				all[i].adjacent++
			}
			// right
			if (all[i + 1] && all[i + 1].isMine && all[i].row == all[i + 1].row){
				all[i].adjacent++
			}
			// lower right 
			if (all[((i + 1) + this.size)] && all[((i + 1) + this.size)].isMine && ((all[((i + 1) + this.size)].row) - 1) == all[i].row){
				all[i].adjacent++
			}
			// below
			if (all[i + this.size] && all[i + this.size].isMine){
				all[i].adjacent++
			}
			// lower left
			if (all[((i - 1) + this.size)] && all[((i - 1) + this.size)].isMine && ((all[((i - 1) + this.size)].row) - 1) == all[i].row){
				all[i].adjacent++
			}

		}
	}



// not being used right now
	shuffle(array){
	  var m = array.length, t, i;

	  // While there remain elements to shuffle…
	  while (m) {

	    // Pick a remaining element…
	    i = Math.floor(Math.random() * m--);

	    // And swap it with the current element.
	    t = array[m];
	    array[m] = array[i];
	    array[i] = t;
	  }

	  return array;
	}

	renderAll(){
		// return (this.shuffle(this.renderEmpty().concat(this.renderMines())).join(''))
		return this.cellsArray.map(cell => cell.render()).join('')
	}
}