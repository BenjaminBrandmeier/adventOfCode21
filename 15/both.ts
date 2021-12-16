interface Point {
    x: number
    y: number
    weight: number
    out: boolean
    original: number
}

const input: Point[][] = Deno.readTextFileSync('input.txt').split(/\n/).map((row, i) => row.split('')
    .map((x, j) => ({original: Number(x), weight: Infinity, out: false, y: i, x: j,})))

function prepareHugeCave(cave: Point[][]) {
    const hugeCave: Point[][] = Array.from(Array(cave.length * 5), () => new Array(cave.length * 5))

    // top left corner
    for (let y = 0; y < cave[0].length; y = y + 1) {
        for (let x = 0; x < cave[0].length; x = x + 1) {
            hugeCave[y][x] = cave[y][x]
        }
    }

    // first row blocks
    for (let y = 0; y < cave[0].length; y = y + 1) {
        for (let x = 0; x < cave.length * 5; x = x + 1) {
            if (x >= cave[0].length) {
                hugeCave[y][x] = hugeCave[y][x - cave[0].length].original === 9
                    ? {original: 1, y: y, x: x, out: false, weight: Infinity}
                    : {original: hugeCave[y][x - cave[0].length].original + 1, y: y, x: x, out: false, weight: Infinity}
            }
        }
    }

    // rest of blocks
    for (let y = cave[0].length; y < cave.length * 5; y = y + 1) {
        for (let x = 0; x < cave.length * 5; x = x + 1) {
            hugeCave[y][x] = hugeCave[y - cave[0].length][x].original === 9
                ? {original: 1, y: y, x: x, out: false, weight: Infinity}
                : {original: hugeCave[y - cave[0].length][x].original + 1, y: y, x: x, out: false, weight: Infinity}
        }
    }
    return hugeCave
}

function adjustWeightOfConnected(current: Point, grid: Point[][]): void {
    if (current.x != grid[0].length - 1) {
        const right = grid[current.y][current.x + 1]
        right.weight = right.weight > current.weight + right.original ? current.weight + right.original : right.weight
    }
    if (current.x != 0) {
        const left = grid[current.y][current.x - 1]
        left.weight = left.weight > current.weight + left.original ? current.weight + left.original : left.weight
    }
    if (current.y != grid.length - 1) {
        const down = grid[current.y + 1][current.x]
        down.weight = down.weight > current.weight + down.original ? current.weight + down.original : down.weight
    }
    if (current.y != 0) {
        const up = grid[current.y - 1][current.x]
        up.weight = up.weight > current.weight + up.original ? current.weight + up.original : up.weight
    }
    current.out = true
}

// since this takes some time for part 2 I assume, I have implemented a pretty bad dijkstra algorithm
function findBestPath(cave: Point[][]) {
    let allPointsFlat = cave.flatMap(row => row.map(x => x))
    while (!cave[cave.length - 1][cave.length - 1].out) {
        allPointsFlat = allPointsFlat.sort((p1, p2) => p1.weight - p2.weight)
        adjustWeightOfConnected(allPointsFlat[0], cave)
        allPointsFlat.shift()
    }
    return cave[cave.length - 1][cave.length - 1].weight
}

input[0][0].weight = 0
console.log('solution 1:', findBestPath(input))
console.log('solution 2:', findBestPath(prepareHugeCave(input)))