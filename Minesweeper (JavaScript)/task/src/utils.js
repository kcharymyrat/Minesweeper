import {STATUS_CLOSED} from "./configs";

const createRandomBombField = (rows, cols) => {
    const field = [];
    for (let i = 0; i < rows; i++) {
        const randomIndex = getRandomInt(0, cols - 1);
        const innerField = []
        for (let j = 0; j < cols; j++) {
            if (randomIndex === j) {
                innerField.push({ "status": STATUS_CLOSED, "isBomb": true});
            } else {
                innerField.push({ "status": STATUS_CLOSED, "isBomb": false});
            }
        }
        field.push(innerField);
    }
    return field;
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