import {Dot, Fold, Instructions, Paper} from "./data.ts"

const input: string[] = Deno.readTextFileSync('input2.txt').split(/\n\n/)

const sum = (a: number, b: number) => a + b
const copyPrintPaper = (paper: Paper) => JSON.parse(JSON.stringify(paper))
const skribbleInstructionsOnPaper = (paper: Paper, instructions: Instructions) => instructions.dots.forEach(d => paper[d.y][d.x] = '#')
const getEdge = (instructions: Instructions) => instructions.dots.reduce((acc, dot) => ({x: Math.max(acc.x, dot.x), y: Math.max(acc.y, dot.y)}))
const foldToCountMarks = (paper: Paper) => fold(paper, instructions.folds[0]).map(row => row.reduce((a, b) => a + (b === '#' ? 1 : 0), 0)).reduce(sum, 0)
const findAnEnormousPaperSomewhereInsideSubmarine = (edge: Dot) => Array.from(Array(edge.y + 1), () => new Array(edge.x + 1).fill(' '))
const toInstructions = (input: string[]) => ({
    dots: input[0].split(/\n/).map(d => ({x: +d.split(',')[0], y: +d.split(',')[1]})),
    folds: input[1].split(/\n/).map(f => ({direction: f.split(/ (x|y)=/)[1], at: +f.split('=')[1]}))
})

function prepareEverythingForFolding() {
    const instructions = toInstructions(input)
    const paper = findAnEnormousPaperSomewhereInsideSubmarine(getEdge(instructions))
    skribbleInstructionsOnPaper(paper, instructions)
    return {instructions, paper}
}

function foldUntilItsDone(paper: Paper, instructions: Instructions) {
    instructions.folds.forEach(foldingInformation => paper = fold(paper, foldingInformation))
    return paper.flatMap((x) => x.join(''))
}

function fold(paper: Paper, fold: Fold) {
    if (fold.direction === 'y') {
        for (let y = fold.at + 1; y < paper.length; y = y + 1) {
            for (let x = 0; x < paper[0].length; x = x + 1) {
                paper[fold.at - (y - fold.at)][x] = paper[fold.at - (y - fold.at)][x] === '#' ? '#' : paper[y][x]
                paper[y][x] = '.'
            }
        }
        return paper.splice(0, fold.at)
    } else {
        for (let y = 0; y < paper.length; y = y + 1) {
            for (let x = fold.at + 1; x < paper[0].length; x = x + 1) {
                paper[y][fold.at - (x - fold.at)] = paper[y][fold.at - (x - fold.at)] === '#' ? '#' : paper[y][x]
                paper[y][x] = '.'
            }
        }
        return paper.map(row => row.splice(0, fold.at))
    }
}

const {instructions, paper} = prepareEverythingForFolding()

console.log('solution 1:', foldToCountMarks(copyPrintPaper(paper)))
console.log('solution 2:', foldUntilItsDone(paper, instructions))