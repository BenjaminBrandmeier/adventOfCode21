const measurements: number[] = Deno.readTextFileSync('input.txt').split(/\n/).map(Number)

const countIncreases = (measurements: number[]) => measurements
    .map((n, i) => n > measurements[i - 1])
    .reduce((acc, b) => b ? acc + 1 : acc, 0)

const calcSlidingWindow = (measurements: number[]) => measurements
    .map((n, i) => n + measurements[i + 1] + measurements[i + 2])

console.log(countIncreases(measurements), countIncreases(calcSlidingWindow(measurements)))