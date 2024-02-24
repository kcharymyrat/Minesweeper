import React, { useState } from 'react';
import flagImage from "../static/img/target.svg"
import fireImage from "../static/img/fired.svg"

const Field = ({field, setField, cellClass, flags, setFlags, time, setTime, onGameOver}) => {
    const handleLeftClick = (e, i, j) => {
        if (time === 0) {
            setTime(1);
        }

        const cell = field[i][j];

        if (cell.isFlagged) {
            return;
        }

        if (cell.isBomb) {
            onGameOver();
            cell.open();
        } else {
            if (cell.adjacentBombs > 0) {
                cell.open();
            } else {
                recursiveOpenEmptyCell(field, field.length, field[0].length, i, j);
                setField(field);
            }
        }

        console.log(cell)
        setField(field);
        console.log(field)
    };

    const handleRightClick = (e, i, j) => {
        // Prevent default right-click behavior (context menu)
        e.preventDefault();
        if (time === 0) {
            setTime(1);
        }

        const cell = field[i][j];

        if (cell.isOpen) {
            return;
        }

        if (flags > 0 && !cell.isFlagged) {
            cell.toggleFlag();
            setFlags(flags - 1);
        } else if(cell.isFlagged) {
            cell.toggleFlag();
            setFlags(flags + 1);
        }

        cell.close();
        setField(field);
    };


    return (
        <div className="field">
            {field.map((row, i) => (
                <>
                    {row.map((colName, j) => {
                        const currentCell = field[i][j];
                        let classes = cellClass;
                        let innerElement = null;

                        if (currentCell.isFlagged) {
                            innerElement = <img className="cell-image" src={flagImage} alt="cell"/>
                        }

                        if (currentCell.isOpen) {
                            classes += " red-border";

                            if (currentCell.adjacentBombs > 0) {
                                const adjBombs = currentCell.adjacentBombs;
                                innerElement = <p className="adj-bomb-num">{adjBombs}</p>;
                            }

                            if (currentCell.isBomb) {
                                innerElement = <img className="mine cell-image" src={fireImage} alt="cell"/>
                            }
                        }


                        return (
                            <div
                                className={classes}
                                key={`${i}-${j}`}
                                onClick={(e) => handleLeftClick(e, i, j)}
                                onContextMenu={(e) => handleRightClick(e, i, j)}
                            >
                                {innerElement}
                            </div>
                        )
                    })}
                </>
            ))}
        </div>
    );
};

const recursiveOpenEmptyCell = (field, totalRows, totalCols, rowNum, colNum, direction = "all") => {
    console.log(rowNum, colNum);
    if (rowNum > totalRows - 1 || rowNum < 0 || colNum > totalCols - 1 || colNum < 0) {
        return;
    }

    const currentCell = field[rowNum][colNum];

    if (currentCell.isOpen) {
        return;
    }

    if (currentCell.isBomb) {
        return;
    }

    if (currentCell.adjacentBombs > 0) {
        currentCell.open();
        return;
    }

    currentCell.open()

    // check to the right
    recursiveOpenEmptyCell(field, totalRows, totalCols, rowNum, colNum + 1);

    // check to the left
    recursiveOpenEmptyCell(field, totalRows, totalCols, rowNum, colNum - 1);

    // check the top
    recursiveOpenEmptyCell(field, totalRows, totalCols, rowNum - 1, colNum);

    // check the bottom
    recursiveOpenEmptyCell(field, totalRows, totalCols, rowNum + 1, colNum);

    // check left top
    recursiveOpenEmptyCell(field, totalRows, totalCols, rowNum - 1, colNum - 1);

    // check right top
    recursiveOpenEmptyCell(field, totalRows, totalCols, rowNum - 1, colNum + 1);

    // check bottom right
    recursiveOpenEmptyCell(field, totalRows, totalCols, rowNum + 1, colNum + 1);

    // check bottom left
    recursiveOpenEmptyCell(field, totalRows, totalCols, rowNum + 1, colNum - 1);

}

export default Field;

