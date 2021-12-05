import {Line, Position} from "./types.ts"

const toPosition = (s: string): Position => ({x: Number(s.split(',')[0]), y: Number(s.split(',')[1])})
const toLine = (entry: string): Line => ({from: toPosition(entry.split(/ -> /)[0]), to: toPosition(entry.split(/ -> /)[1])})
const isStraightLine = (line: Line): boolean => line.from.x === line.to.x || line.from.y === line.to.y
const getRangeBetweenTwoNumbers = (a: number, b: number): number[] => [...[...Array(Math.abs(a - b)).keys()].map(n => n + Math.min(a, b)), Math.max(a, b)]
const toKey = (pos: Position): string => pos.x + ',' + pos.y
const getLineCoordinates = (line: Line): Position[] => isStraightLine(line) ? calculatePositionsForStraightLines(line) : calculatePositionsForDiagonalLines(line)

function calculatePositionsForStraightLines(line: Line): Position[] {
    return line.from.x === line.to.x
        ? getRangeBetweenTwoNumbers(line.from.y, line.to.y).map(newY => ({x: line.from.x, y: newY}))
        : getRangeBetweenTwoNumbers(line.from.x, line.to.x).map(newX => ({x: newX, y: line.from.y}))
}

function calculatePositionsForDiagonalLines(line: Line): Position[] {
    const allXCoordinates = line.from.x > line.to.x ? getRangeBetweenTwoNumbers(line.from.x, line.to.x).reverse() : getRangeBetweenTwoNumbers(line.from.x, line.to.x)
    return allXCoordinates.map((newX: number, i: number) => ({x: newX, y: line.from.y < line.to.y ? line.from.y + i : line.from.y - i}))
}

function howManyDangerousPlacesHaveWeGotCaptain(lines: Line[]) {
    const ventMap = new Map()
    let allVentPositions = lines.map(getLineCoordinates).flat()
    allVentPositions.forEach(pos => ventMap.has(toKey(pos)) ? ventMap.set(toKey(pos), ventMap.get(toKey(pos))! + 1) : ventMap.set(toKey(pos), 1))
    return [...ventMap.values()].reduce((acc: number, b: number) => b > 1 ? acc + 1 : acc, 0)
}

const allLines: Line[] = Deno.readTextFileSync('input.txt').split(/\n/).map(toLine)
const allStraightLines: Line[] = allLines.filter(isStraightLine)

console.log('solution1', howManyDangerousPlacesHaveWeGotCaptain(allStraightLines))
console.log('solution2', howManyDangerousPlacesHaveWeGotCaptain(allLines))