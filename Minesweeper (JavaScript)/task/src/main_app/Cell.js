class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isBomb = false;
        this.adjacentBombs = 0;
        this.isOpen = false;
        this.isFlagged = false;
    }

    toggleFlag() {
        this.isFlagged = !this.isFlagged;
    }

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }

    setBomb() {
        this.isBomb = true;
    }

    setAdjacentBombs(count) {
        this.adjacentBombs = count;
    }

    toString() {
        return `Cell at (${this.row}, ${this.col}): Bomb=${this.isBomb}, Open=${this.isOpen}, Flagged=${this.isFlagged}`;
    }
}


export default Cell;
