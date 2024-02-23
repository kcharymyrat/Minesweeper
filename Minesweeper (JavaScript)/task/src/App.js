import React, { useState } from 'react';
import bomb from './bomb.svg';
import './App.css';
import GameHeader from "./GameHeader";
import Field from "./Field";
import {createRandomBombField} from "./utils";
import {CELL_CLASS, COLS_NUM, ROWS_NUM} from "./configs";

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


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// // Stage 2
// import React from 'react';
// import bomb from './bomb.svg';
// import './App.css';
//
// function App() {
//     const columns = 8;
//     const rows = 9;
//     const field = {
//         "cols": columns,
//         "rows": rows,
//     }
//     let flagsLeft = 10;
//     let time = "0:00";
//
//     // Generate rows and columns using map
//     const renderCells = () => {
//         const cells = [];
//         for (let i = 0; i < rows; i++) {
//             const rowCells = [];
//             for (let j = 0; j < columns; j++) {
//                 rowCells.push(<div className="cell" key={`${i}-${j}`}></div>);
//             }
//             cells.push(<div className="field" key={i}>{rowCells}</div>);
//         }
//         return cells;
//     };
//
//     return (
//         <div className="App">
//             <main className="App-header">
//                 <GameHeader
//                     bomb={bomb}
//                     flagsLeft={flagsLeft}
//                     time={time}
//                 />
//                 {renderCells()}
//             </main>
//         </div>
//     );
// };
//
// const GameHeader = ({ bomb, flagsLeft, time }) => (
//     <header>
//         <div className="game-header">
//             <h1>Minesweeper</h1>
//             <img src={bomb} className="App-logo" alt="bomb"/>
//         </div>
//         <div className="stats-menu">
//             <p>{flagsLeft}</p>
//             <p>smile</p>
//             <p>{time}</p>
//         </div>
//     </header>
// )
//
// export default App;