type Candidate = number | '😎'
type Board = Candidate[]
type Boards = Board[]

const input = Deno.readTextFileSync('input2.txt')
const randomNumbers = input.split(/\n/)[0].split(',').map(Number)
const boards: Boards = input.split(/\n\n/).slice(1).map(b => b.replace(/(\n ?| {2})/g, ' ').split(' ').map(Number))

const ident = (a: any) => a
const isHorizontalMatch = (s: string) => new RegExp(/^(😎 ){5}|^((\w+|😎) ){5}(😎 ){5}|^((\w+|😎) ){10}(😎 ){5}|^((\w+|😎) ){15}(😎 ){5}|^((\w+|😎) ){20}(😎( |$)){5}/).test(s)
const isVerticalMatch = (s: string) => new RegExp(/((😎 )((\w+|😎)( |$)){4}){4}(😎 ?).*/).test(s)
const isBoardWinning = (board: Board): boolean => board && (isHorizontalMatch(board.join(' ')) || isVerticalMatch(board.join(' ')))
const giveMeTheWinnerBoard = (boards: Boards) => boards.filter(isBoardWinning)[0]
const removeWinningBoards = (boards: Boards) => boards.filter(board => !isBoardWinning(board) || boards.length === 1)
const getSumOfRemaining = (board: Board) => board.reduce((acc: number, c: Candidate) => c !== '😎' ? acc + c : acc, 0)
const playOnce = (boards: Boards, nextNumber: number) => boards.map(board => board.map(n => n === nextNumber ? '😎' : n))
const calcFinalScore = (finalBoard: Board, nextRandomNumber: number) => getSumOfRemaining(finalBoard) * nextRandomNumber

function calcSolution(boards: Boards, randomNumbers: number[], manipulateBoards: (boards: Boards) => Boards) {
    const winningNumber = randomNumbers.find(nextRandomNumber => {
        boards = manipulateBoards(playOnce(boards, nextRandomNumber))
        if (giveMeTheWinnerBoard(boards)) {
            return nextRandomNumber
        }
    })!
    return calcFinalScore(giveMeTheWinnerBoard(boards), winningNumber);
}

console.log('solution 1:', calcSolution(boards, randomNumbers, ident))
console.log('solution 2:', calcSolution(boards, randomNumbers, removeWinningBoards))