import React from 'react';
import {createRandomBombField} from "./utils";
import {COLS_NUM, ROWS_NUM} from "./configs";



const GameHeader = ({ bomb, flagsLeft, formatTime, setField, setFlags, setTime, setGameOver }) => {

    const handleReset = () => {
        console.log(" handleReset -> ")
        setField(createRandomBombField(ROWS_NUM, COLS_NUM));
        setFlags(10);
        setTime(0);
        setGameOver(false);
    }

    return (
        <header>
            <div className="game-header">
                <h1>Minesweeper</h1>
                <img src={bomb} className="App-logo" alt="bomb"/>
            </div>
            <div className="stats-menu">
                <p>{flagsLeft}</p>
                <p className="reset" onClick={handleReset}>Reset</p>
                <p>{formatTime}</p>
            </div>
        </header>
    )
};

export default GameHeader;