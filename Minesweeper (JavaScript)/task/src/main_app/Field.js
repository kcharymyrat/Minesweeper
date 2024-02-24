import React, { useState } from 'react';
import image from "../static/img/target.svg"

const Field = ({field, cellClass }) => {
    const handleLeftClick = (e, i, j) => {
        // Handle left click logic here
        const cell = field[i][j];
        console.log(`Left clicked on cell (${i}, ${j}) , ${cell}`);
        e.target.classList.add("empty-cell");
        console.log(e.target);
    };

    const handleRightClick = (e, i, j) => {
        // Prevent default right-click behavior (context menu)
        e.preventDefault();

        const img = document.createElement("img");
        img.src = `${image}`;
        img.classList.add("cell-image");
        e.target.appendChild(img);
    };


    return (
        <div className="field">
            {field.map((row, i) => (
                <>
                    {row.map((colName, j) => (
                        <div
                            className={cellClass}
                            key={`${i}-${j}`}
                            onClick={(e) => handleLeftClick(e, i, j)}
                            onContextMenu={(e) => handleRightClick(e, i, j)}
                        ></div>
                    ))}
                </>
            ))}
        </div>
    );
};

export default Field;





// return (
//     <div className="table">
//         {field.map((row, i) => (
//             <div className="field">
//                 {row.map((colName, j) => (
//                     <div
//                         className={`${cellClass} ${colName === bombClass ? bombClass : ''}`}
//                         key={`${i}-${j}`}
//                         onClick={(e) => handleLeftClick(e, i, j)}
//                         onContextMenu={(e) => handleRightClick(e, i, j)}
//                     ></div>
//                 ))}
//             </div>
//         ))}
//     </div>
// );