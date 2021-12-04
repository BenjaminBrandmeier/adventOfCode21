type Candidate = number | '😎'

const input = Deno.readTextFileSync('input2.txt')
const randomNumbers = input.split(/\n/)[0].split(',').map(Number)
let boards: Candidate[][] = input.split(/\n\n/).slice(1).map(b => b.replace(/(\n ?| {2})/g, ' ').split(' ').map(Number))

const ident = (a: any) => a
const isHorizontalMatch = (s: string) => new RegExp(/^(😎 ){5}|^((\w+|😎) ){5}(😎 ){5}|^((\w+|😎) ){10}(😎 ){5}|^((\w+|😎) ){15}(😎 ){5}|^((\w+|😎) ){20}(😎( |$)){5}/).test(s)
const isVerticalMatch = (s: string) => new RegExp(/((😎 )((\w+|😎)( |$)){4}){4}(😎 ?).*/).test(s)
const isBoardWinning = (board: Candidate[]): boolean => board && (isHorizontalMatch(board.join(' ')) || isVerticalMatch(board.join(' ')))
const giveMeTheWinnerBoard = (boards: Candidate[][]) => boards.filter(isBoardWinning)[0]
const removeWinningBoards = (boards: Candidate[][]) => boards.filter(board => !isBoardWinning(board) || boards.length === 1)
const getSumOfRemaining = (board: Candidate[]) => board.reduce((acc: number, c: Candidate) => c !== '😎' ? acc + c : acc, 0)
const playOnce: (boards: Candidate[][], nextNumber: number) => Candidate[][] = (boards: Candidate[][], nextNumber: number) => boards.map(board => board.map(n => n === nextNumber ? '😎' : n))
const calcFinalScore = (finalBoard: Candidate[], nextRandomNumber: number) => getSumOfRemaining(finalBoard) * nextRandomNumber

function calcSolution(manipulateBoard: (boards: Candidate[][]) => Candidate[][]) {
    const winningNumber = randomNumbers.find(nextRandomNumber => {
        boards = manipulateBoard(playOnce(boards, nextRandomNumber))
        if (giveMeTheWinnerBoard(boards)) {
            return nextRandomNumber
        }
    })
    return calcFinalScore(giveMeTheWinnerBoard(boards), winningNumber!);
}

console.log('solution 1:', calcSolution(ident))
console.log('solution 2:', calcSolution(removeWinningBoards))