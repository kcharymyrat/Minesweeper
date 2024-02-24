import React, { useState } from 'react';
import bomb from './static/img/bomb.svg';
import './App.css';
import GameHeader from "./main_app/GameHeader";
import Field from "./main_app/Field";
import {createRandomBombField} from "./main_app/utils";
import {CELL_CLASS, COLS_NUM, ROWS_NUM} from "./main_app/configs";

let flagsLeft = 10;
let time = "0:00";

function App() {
    // Create a state of an array
    const [field, setField] = useState(createRandomBombField(ROWS_NUM, COLS_NUM));

    console.log(field);

    return (
        <div className="App">
            <main className="App-header">
                <GameHeader
                    bomb={bomb}
                    flagsLeft={flagsLeft}
                    time={time}
                />
                <Field field={field} cellClass={CELL_CLASS} />
            </main>
        </div>
    );
}


export default App;
