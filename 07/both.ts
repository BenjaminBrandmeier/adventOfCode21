type Cache = Map<number, number>
const input = Deno.readTextFileSync('input2.txt').split(/,/).map(Number)

const sum = (acc: number, b: number) => acc + b
const faculty = (n: number) => [...Array(n).keys()].reduce((acc, n) => acc + n + 1, 0)
const getLimit = (startingPosition: number[]) => startingPosition.reduce((highest, n) => Math.max(highest, n)) * 2
const storeFuel = (delta: number, map: Cache) => map.set(delta, faculty(delta)).get(delta)!
const simpleAlgorithm = (n: number, position: number): number => Math.abs(n - position)
const smartAlgorithm = (n: number, position: number, map: Cache): number => map.get(Math.abs(n - position)) ?? storeFuel(Math.abs(n - position), map)

function calculateSolution(input: number[], calculateFuel: Function, map?: Cache): number {
    return [...Array(getLimit(input))].reduce((lowestSumOfFuelSoFar, n, i) => {
        const sumOfFuels = input.map(n => calculateFuel(n, i, map)).reduce(sum, 0)
        return sumOfFuels < lowestSumOfFuelSoFar ? sumOfFuels : lowestSumOfFuelSoFar
    }, Infinity)
}

console.log('solution 1:', calculateSolution(input, simpleAlgorithm))
console.log('solution 2:', calculateSolution(input, smartAlgorithm, new Map()))