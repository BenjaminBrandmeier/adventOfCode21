const parseInput = (): number[] => Deno.readTextFileSync('input2.txt').split(',').map(Number)
const initializeFishMap = (fishMap: Map<number, number>, input: number[]): void => input.forEach(f => fishMap.set(f, fishMap.get(f)! + 1))
const waitOneDay = (fishMap: Map<number, number>): void => {
    const copy = [...fishMap.values()];
    [...Array(9).keys()].forEach(k => k === 6 ? fishMap.set(6, copy[7] + copy[0]) : fishMap.set(k, copy[(k + 1) % 9]))
}

function countFishesAfterXDays(afterXDays: number): number {
    const fishMap: Map<number, number> = new Map([...Array(9).keys()].map(a => [a, 0]))
    initializeFishMap(fishMap, parseInput());
    [...Array(afterXDays)].forEach(_ => waitOneDay(fishMap))
    return [...fishMap.values()].reduce((acc, n) => acc + n)
}

console.log('solution 1:', countFishesAfterXDays(80))
console.log('solution 2:', countFishesAfterXDays(256))