const getInput = () => Deno.readTextFileSync('input2.txt').split(/\n/).map(s => s.split(''))
const isOpening = (s: string) => ['{', '[', '(', '<'].includes(s)
const toPoints = (s: string) => s === '}' ? 1197 : s === ']' ? 57 : s === '>' ? 25137 : s === ')' ? 3 : 0
const toPoints2 = (s: string) => s === '}' ? 3 : s === ']' ? 2 : s === '>' ? 4 : s === ')' ? 1 : 0
const getExpecting = (s: string) => s === '{' ? '}' : s === '[' ? ']' : s === '<' ? '>' : s === '(' ? ')' : 'X'
const calcScore = (closings: number[]): number => closings.reduce((acc, b) => acc * 5 + b, 0)
const prepareCalculation = (z: string[]) => z.reverse().map(getExpecting).map(toPoints2)
const calcScoresForEachLine = (lines: string[][]) => lines.map(x => calcClosings(x)).filter(x => x.length > 1).map(z => prepareCalculation(z.split(''))).map(calcScore)
const getCenter = (s: number[]) => s.slice(s.length / 2, s.length / 2 + 1)[0]
const sortAscending = (a: number, b: number) => a - b
const sum = (a: number, b: number) => a + b

const calcClosings = (restOfLine: string[], stack: string[] = []): string => {
    if (restOfLine.length === 0) {
        return stack.join('')
    }
    const next = restOfLine.shift()!
    if (isOpening(next)) {
        return calcClosings(restOfLine, stack.concat(next))
    } else {
        return next === getExpecting(stack.pop()!) ? calcClosings(restOfLine, stack) : next
    }
}

console.log('solution 1:', getInput().map(x => calcClosings(x)).filter(x => x).map(toPoints).map(Number).reduce(sum, 0))
console.log('solution 2:', getCenter(calcScoresForEachLine(getInput()).sort(sortAscending)))