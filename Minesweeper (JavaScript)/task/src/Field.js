import React, { useState } from 'react';


const Field = ({field, cellClass }) => {
    const handleLeftClick = (e, i, j) => {
        // Handle left click logic here
        console.log(`Left clicked on cell (${i}, ${j})`);
        e.target.style = {"background": "blue"}
        console.log(e.target);
    };

    const handleRightClick = (e, i, j) => {
        // Prevent default right-click behavior (context menu)
        e.preventDefault();

        // Handle right click logic here
        console.log(`Right clicked on cell (${i}, ${j})`);
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