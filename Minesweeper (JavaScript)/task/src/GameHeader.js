import React from 'react';

const GameHeader = ({ bomb, flagsLeft, time }) => (
    <header>
        <div className="game-header">
            <h1>Minesweeper</h1>
            <img src={bomb} className="App-logo" alt="bomb"/>
        </div>
        <div className="stats-menu">
            <p>{flagsLeft}</p>
            <p>smile</p>
            <p>{time}</p>
        </div>
    </header>
);

export default GameHeader;