import Cell from "./Cell";

const createRandomBombField = (rows, cols) => {
    const field = placeRandomBombOnField(rows, cols);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (field[i][j].isBomb) {
                addAdjacentBombNumbers(field, i, j);
            }
        }
    }

    return field;
}

const placeRandomBombOnField = (rows, cols) => {
    const field = [];

    const tenthRandomRowNum = getRandomInt(0, rows - 1);
    const tenthRandomColNum = getRandomInt(1, cols - 2);


    for (let i = 0; i < rows; i++) {
        const innerField = []
        const randomIndex = getRandomInt(0, cols - 1);
        for (let j = 0; j < cols; j++) {
            if (randomIndex === j) {
                const cell = new Cell(i, j);
                cell.setBomb();
                innerField.push(cell);
            } else {
                innerField.push(new Cell(i, j))
            }
        }
        field.push(innerField);
    }

    if (field[tenthRandomRowNum][tenthRandomColNum].isBomb) {
        field[tenthRandomRowNum][tenthRandomColNum + 1].setBomb();
    } else {
        field[tenthRandomRowNum][tenthRandomColNum].setBomb();
    }

    return field;
}


const addAdjacentBombNumbers = (field, rowNum, colNum) => {
    const totalRows = field.length;
    const totalCols = field[0].length;

    let toLeftUpperCell = null;
    let upperCell = null;
    let toRightUpperCell = null;
    let toRightCell = null;
    let toRightBelowCell = null;
    let belowCell = null;
    let toLeftBelowCell = null;
    let toLeftCell = null;

    // check top left corner cell
    if (rowNum === 0 && colNum === 0) {
        toRightCell = field[rowNum][colNum + 1];
        toRightBelowCell = field[rowNum + 1][colNum + 1];
        belowCell = field[rowNum + 1][colNum];

        toRightCell.setAdjacentBombs(toRightCell.adjacentBombs + 1);
        toRightBelowCell.setAdjacentBombs(toRightBelowCell.adjacentBombs + 1);
        belowCell.setAdjacentBombs(belowCell.adjacentBombs + 1);
        return;
    }

    // check top right corner cell
    if (rowNum === 0 && colNum === totalCols - 1) {
        toLeftCell = field[rowNum][colNum - 1];
        toLeftBelowCell = field[rowNum + 1][colNum - 1];
        belowCell = field[rowNum + 1][colNum];

        toLeftCell.setAdjacentBombs(toLeftCell.adjacentBombs + 1);
        toLeftBelowCell.setAdjacentBombs(toLeftBelowCell.adjacentBombs + 1);
        belowCell.setAdjacentBombs(belowCell.adjacentBombs + 1);
        return;
    }

    // check bottom left corner cell
    if (rowNum === totalRows - 1 && colNum === 0) {
        upperCell = field[rowNum - 1][colNum];
        toRightUpperCell = field[rowNum - 1][colNum + 1];
        toRightCell = field[rowNum][colNum + 1];

        upperCell.setAdjacentBombs(upperCell.adjacentBombs + 1);
        toRightUpperCell.setAdjacentBombs(toRightUpperCell.adjacentBombs + 1);
        toRightCell.setAdjacentBombs(toRightCell.adjacentBombs + 1);
        return;
    }

    // check bottom right corner cell
    if (rowNum === totalRows - 1 && colNum === totalCols - 1) {
        toLeftCell = field[rowNum][colNum - 1];
        toLeftUpperCell = field[rowNum - 1][colNum - 1];
        upperCell = field[rowNum - 1][colNum];

        toLeftCell.setAdjacentBombs(toLeftCell.adjacentBombs + 1);
        toLeftUpperCell.setAdjacentBombs(toLeftUpperCell.adjacentBombs + 1);
        upperCell.setAdjacentBombs(upperCell.adjacentBombs + 1);
        return;
    }

    // on first column cell
    if (rowNum > 0 && rowNum < totalRows - 1 && colNum === 0) {
        upperCell = field[rowNum - 1][colNum];
        toRightUpperCell = field[rowNum - 1][colNum + 1];
        toRightCell = field[rowNum][colNum + 1];
        toRightBelowCell = field[rowNum + 1][colNum + 1];

        upperCell.setAdjacentBombs(upperCell.adjacentBombs + 1);
        toRightUpperCell.setAdjacentBombs(toRightUpperCell.adjacentBombs + 1);
        toRightCell.setAdjacentBombs(toRightCell.adjacentBombs + 1);
        toRightBelowCell.setAdjacentBombs(toRightBelowCell.adjacentBombs + 1);
        return;
    }

    // on last column cell
    if (rowNum > 0 && rowNum < totalRows - 1 && colNum === totalCols - 1) {
        upperCell = field[rowNum - 1][colNum];
        toLeftUpperCell = field[rowNum - 1][colNum - 1];
        toLeftCell = field[rowNum][colNum - 1];
        toLeftBelowCell = field[rowNum + 1][colNum - 1];

        upperCell.setAdjacentBombs(upperCell.adjacentBombs + 1);
        toLeftUpperCell.setAdjacentBombs(toLeftUpperCell.adjacentBombs + 1);
        toLeftCell.setAdjacentBombs(toLeftCell.adjacentBombs + 1);
        toLeftBelowCell.setAdjacentBombs(toLeftBelowCell.adjacentBombs + 1);
        return;
    }

    // on first row cell
    if (rowNum === 0 && colNum > 0 && colNum < totalRows - 1) {
        toLeftCell = field[rowNum][colNum - 1];
        toLeftBelowCell = field[rowNum + 1][colNum - 1];
        belowCell = field[rowNum + 1][colNum];
        toRightBelowCell = field[rowNum + 1][colNum + 1];
        toRightCell = field[rowNum][colNum + 1];

        toLeftCell.setAdjacentBombs(toLeftCell.adjacentBombs + 1);
        toLeftBelowCell.setAdjacentBombs(toLeftBelowCell.adjacentBombs + 1);
        belowCell.setAdjacentBombs(belowCell.adjacentBombs + 1);
        toRightBelowCell.setAdjacentBombs(toRightBelowCell.adjacentBombs + 1);
        toRightCell.setAdjacentBombs(toRightCell.adjacentBombs + 1);
        return;
    }

    // on bottom row cell
    if (rowNum === totalRows - 1 && colNum > 0 && colNum < totalRows - 1) {
        toLeftCell = field[rowNum][colNum - 1];
        toLeftUpperCell = field[rowNum - 1][colNum - 1];
        upperCell = field[rowNum - 1][colNum];
        toRightUpperCell = field[rowNum - 1][colNum + 1];
        toRightCell = field[rowNum][colNum + 1];

        toLeftCell.setAdjacentBombs(toLeftCell.adjacentBombs + 1);
        toLeftUpperCell.setAdjacentBombs(toLeftUpperCell.adjacentBombs + 1);
        upperCell.setAdjacentBombs(upperCell.adjacentBombs + 1);
        toRightUpperCell.setAdjacentBombs(toRightUpperCell.adjacentBombs + 1);
        toRightCell.setAdjacentBombs(toRightCell.adjacentBombs + 1);
        return;
    }

    // check else
    if (rowNum > 0 && rowNum < totalRows - 1 && colNum > 0 && colNum < totalRows - 1) {
        toLeftUpperCell = field[rowNum - 1][colNum - 1];
        upperCell = field[rowNum - 1][colNum];
        toRightUpperCell = field[rowNum - 1][colNum + 1];
        toRightCell = field[rowNum][colNum + 1];
        toRightBelowCell = field[rowNum + 1][colNum + 1];
        belowCell = field[rowNum + 1][colNum];
        toLeftBelowCell = field[rowNum + 1][colNum - 1];
        toLeftCell = field[rowNum][colNum - 1];

        toLeftUpperCell.setAdjacentBombs(toLeftUpperCell.adjacentBombs + 1);
        upperCell.setAdjacentBombs(upperCell.adjacentBombs + 1);
        toRightUpperCell.setAdjacentBombs(toRightUpperCell.adjacentBombs + 1);
        toRightCell.setAdjacentBombs(toRightCell.adjacentBombs + 1);
        toRightBelowCell.setAdjacentBombs(toRightBelowCell.adjacentBombs + 1);
        belowCell.setAdjacentBombs(belowCell.adjacentBombs + 1);
        toLeftBelowCell.setAdjacentBombs(toLeftBelowCell.adjacentBombs + 1);
        toLeftCell.setAdjacentBombs(toLeftCell.adjacentBombs + 1);
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    if (min > max) {
        let temp = min
        min = max
        max = temp
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandomInt, createRandomBombField };