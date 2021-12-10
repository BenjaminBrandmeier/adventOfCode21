const input = Deno.readTextFileSync('input.txt').split(/\n/)
const map = {edge: input[0].length, flat: input.join('').split('')}

const sum = (a: number, b: number) => a + b
const product = (acc: number, b: number) => acc * b
const sortHighest = (a: number, b: number) => b - a
const count = (map: string[], idx: number) => map[idx] === 'X' ? map[idx] = '😎' : 0
const markBasins = (map: string[]) => map.map((n: string, _: number) => n !== '9' ? 'X' : n)
const isLowestHorizontally = (map: string[], i: number) => map[i - 1] > map[i] && map[i + 1] > map[i]
const calcLeft = (idx: number, edge: number, map: string[]) => (idx % edge != 0) ? calcSize(map, idx - 1, edge) : 0
const getLowestSpots = (map: string[], edge: number) => map.map((_: string, i: number) => getWhenIsLowest(map, i, edge))
const calcHorizontal = (idx: number, edge: number, map: string[]) => calcRight(idx, edge, map) + calcLeft(idx, edge, map)
const calcRight = (idx: number, edge: number, map: string[]) => (idx + 1) % edge != 0 ? calcSize(map, idx + 1, edge) : 0
const isLowest = (map: string[], i: number, edge: number) => isLowestHorizontally(map, i) && isLowestVertically(map, i, edge)
const calcVertical = (map: string[], idx: number, edge: number) => calcSize(map, idx - edge, edge) + calcSize(map, idx + edge, edge)
const getWhenIsLowest = (map: string[], i: number, edge: number) => isLowest(map, i, edge) ? {idx: i, value: +map[i] + 1} : {idx: -1, value: 0}
const getTopThreeBasins = (start: number[], map: string[], edge: number) => start.map((i) => calcSize(map, i, edge)).sort(sortHighest).slice(0, 3)
const calcSize = (map: string[], idx: number, edge: number): number => count(map, idx) ? 1 + calcHorizontal(idx, edge, map) + calcVertical(map, idx, edge) : 0
const isLowestVertically = (map: string[], i: number, edge: number) => (!map[i - edge] || map[i - edge] > map[i]) && (!map[i + edge] || map[i + edge] > map[i])

const solution1 = (flatMap: string[], edge: number) => getLowestSpots(flatMap, edge).map(a => a.value).reduce(sum)
const solution2 = (flatMap: string[], edge: number) => getTopThreeBasins(getLowestSpots(flatMap, edge).map(a => a.idx), markBasins(flatMap), edge).reduce(product)

console.log(solution1(map.flat, map.edge), solution2(map.flat, map.edge))