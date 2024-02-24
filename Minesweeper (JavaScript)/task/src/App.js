import React, {useEffect, useState} from 'react';
import bomb from './static/img/bomb.svg';
import './App.css';
import GameHeader from "./main_app/GameHeader";
import Field from "./main_app/Field";
import {createRandomBombField} from "./main_app/utils";
import {CELL_CLASS, COLS_NUM, ROWS_NUM} from "./main_app/configs";


function App() {
    // Create a state of an array
    const [field, setField] = useState(createRandomBombField(ROWS_NUM, COLS_NUM));
    const [flags, setFlags] = useState(10);
    const [time, setTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    let intervalId;

    useEffect(() => {
        if (time > 0 && !gameOver) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [time, gameOver]);

    useEffect(() => {
        if (gameOver) {
            clearInterval(intervalId);
        }
    }, [gameOver]);

    const handleGameOver = () => {
        setGameOver(true);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // for (let i = 0; i < field.length; i++) {
    //     const inner = [];
    //     for (let j = 0; j < COLS_NUM; j++) {
    //         const cell = field[i][j];
    //         if (cell.isBomb) {
    //             inner.push("B")
    //         } else {
    //             inner.push(field[i][j].adjacentBombs);
    //         }
    //     }
    //     console.log(inner.join("   "));
    // }

    return (
        <div className="App">
            <main className="App-header">
                <GameHeader
                    bomb={bomb}
                    flagsLeft={flags}
                    time={time}
                    formatTime={formatTime(time)}
                />
                <Field
                    field={field}
                    setField={setField}
                    cellClass={CELL_CLASS}
                    flags={flags}
                    setFlags={setFlags}
                    time={time}
                    setTime={setTime}
                    onGameOver={handleGameOver}
                />
            </main>
        </div>
    );
}


export default App;
