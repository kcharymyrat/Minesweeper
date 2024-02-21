const puppeteer = require('puppeteer');
const path = require('path');
// '..' since we're in the test/ subdirectory; learner is supposed to have src3/index.html
// const pagePath = 'file://' + path.resolve(__dirname, '../src3/index.html');

const hs = require('hs-test-web');
const react = require("hs-test-web-server");

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function stageTest() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args:['--start-maximized', '--disable-infobar'],
        ignoreDefaultArgs: ['--enable-automation'],
    });

    const page = await browser.newPage();
    await page.goto('http://localhost:31328');

    await sleep(1000);
    page.on('console', msg => console.log(msg.text()));

    let result = await hs.testPage(page,
        () => {
            let isPresent = {
                flagCounter: false,
                resetBtn: false,
                clock: false
            };

            let divs = new Map();
            let pointerClasses = new Map();
            Array.from(document.getElementsByTagName("*")).forEach( element => {
                if (element.children.length > 1 ||
                    element.tagName === "SCRIPT" ||
                    element.tagName === "LINK" ||
                    element.tagName === "META" ||
                    element.tagName === "STYLE" ||
                    element.tagName === "NOSCRIPT") return;

                let text = element.innerText;

                if(text.includes('10'))
                    isPresent.flagCounter = true;
                if(text.includes('0:00'))
                    isPresent.clock = true;
                if (text === '') {
                    let width = window.getComputedStyle(element).width;
                    let height = window.getComputedStyle(element).height;
                    let divName = element.className;

                    if (width === height)
                        divs.has(divName) ?
                            divs.set(divName, divs.get(divName)+1) :
                            divs.set(divName, 1)
                }

                if (window.getComputedStyle(element).cursor === "pointer") {
                    let [tag, className] = [element.tagName ,element.className];

                    pointerClasses.has((tag, className)) ?
                        pointerClasses.set((tag, className), pointerClasses.get((tag, className)) + 1) :
                        pointerClasses.set((tag, className), 1);
                }
            });

            if (!isPresent.flagCounter) {
                return hs.wrong("There should be a flag counter that equals to '10'.")
            }
            if (pointerClasses.length === 0) {
                return hs.wrong("There should be a reset button and if you hover the mouse over it, the cursor should change to the pointer.")
            }
            if (!isPresent.clock) {
                return hs.wrong("There should be a timer that equals to '0:00'.")
            }
            //------------------------------------------------------------------------------------------------------
            divs = Array.from(divs);
            let cellClass = divs.find(([k, v]) => v === 72);
            if (!cellClass) {
              return hs.wrong("The field should contain 72 square cells with no inner elements inside.")
            }


            let cells = Array.from(document.getElementsByClassName("cell"));

            if (cells.length === 0) {
                return hs.wrong("Cells should have className='cell'");
            }

            let rows = new Map();
            let columns = new Map();
            cells.forEach(cell => {
                let top = cell.getBoundingClientRect().top;
                let left = cell.getBoundingClientRect().left;

                rows.has(top) ?
                    rows.set(top, rows.get(top)+1) :
                    rows.set(top, 1);

                columns.has(left) ?
                    columns.set(left, columns.get(left)+1) :
                    columns.set(left, 1)
            });

            rows = Array.from(rows);
            let isWrongRow = rows.find( ([k, v]) => v !== 8);
            if (isWrongRow) return hs.wrong("Each row of the field should contain 8 cells.");

            columns = Array.from(columns);
            let isWrongColumn = columns.find( ([k, v]) => v !== 9);
            if (isWrongColumn) return hs.wrong("Each column of the field should contain 9 cells.")

            return hs.correct();
        }
    );

    await browser.close();
    return result;


}

it('Test stage', async function () {

    try {
        this.timeout(30000)
    } catch (ignored) {
    }

    let result = await react.startServerAndTest(
        'localhost', 31328, path.resolve(__dirname, '..'), stageTest
    );

    if (result['type'] === 'wrong') {
        throw new Error(result['message']);
    }
}, 30000)
