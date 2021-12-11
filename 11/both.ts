const dumbos = Deno.readTextFileSync('input.txt').split(/\n/).join('').split('').map(Number)

const increase = (i: number, dumbos: number[]) => dumbos[i] === 9 ? 0 : dumbos[i] + 1

function increaseSurroundings(i: number, dumbos: number[]): void {
    if (i - 10 >= 0 && i - 10 >= 0) increaseSurrounding(i - 10, dumbos)
    if ((i + 1) % 10 !== 0 && i - 10 + 1 >= 0) increaseSurrounding(i - 10 + 1, dumbos)
    if ((i + 1) % 10 !== 0) increaseSurrounding(i + 1, dumbos)
    if ((i + 1) % 10 !== 0 && i + 10 + 1 < dumbos.length) increaseSurrounding(i + 10 + 1, dumbos)
    if (i + 10 < dumbos.length) increaseSurrounding(i + 10, dumbos)
    if (i % 10 !== 0 && i + 10 - 1 < dumbos.length) increaseSurrounding(i + 10 - 1, dumbos)
    if (i % 10 !== 0) increaseSurrounding(i - 1, dumbos)
    if (i % 10 !== 0 && i - 10 - 1 >= 0) increaseSurrounding(i - 10 - 1, dumbos)
}

function increaseSurrounding(i: number, dumbos: number[]): void {
    if (dumbos[i] && dumbos[i] === 9) {
        dumbos[i] = 0
        increaseSurroundings(i, dumbos)
    } else if (dumbos[i]) {
        dumbos[i] = dumbos[i] !== 0 ? dumbos[i] + 1 : dumbos[i]
    }
}

function countDumboFlashes(dumbos: number[], waitForXFlashes: number): number {
    return [...Array(waitForXFlashes)].reduce((acc) => {
        dumbos = dumbos.map((_, i) => increase(i, dumbos));
        [...dumbos].forEach((n: number, i: number) => n === 0 ? increaseSurroundings(i, dumbos) : 0)
        return acc + dumbos.filter(s => s === 0).length
    }, 0)
}

function waitForDumboSynchronisation(dumbos: number[], waitForXFlashes: number): number {
    return [...Array(waitForXFlashes).keys()].find(() => {
        dumbos = dumbos.map((_, i) => increase(i, dumbos));
        [...dumbos].forEach((n: number, i: number) => n === 0 ? increaseSurroundings(i, dumbos) : 0)
        return new Set(dumbos).size === 1
    })! + 1
}

console.log(countDumboFlashes(dumbos, 100), waitForDumboSynchronisation(dumbos, 100000))