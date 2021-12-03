const input = Deno.readTextFileSync('input.txt').split(/\n/)

const add = (a: string[], b: string) => a.map((d, i) => +d + +b[i]).map(String)
const mapToBinary = (s: string[], threshold: number) => s.map(n => +n >= (threshold) ? 1 : 0).join('')
const flipDigits = (s: string) => s.split('').map(s => +s === 0 ? 1 : 0).join('')
const initZeroDigits = (input: string[]) => [...input[0]].map(_ => '0')
const convertToGamma = (input: string[]) => mapToBinary(sumUpAllDigits(initZeroDigits(input), input), input.length / 2)
const convertToEpsilon = (input: string[]) => flipDigits(convertToGamma(input))
const sumUpAllDigits = (current: string[], remaining: string[]): string[] => remaining.length
    ? sumUpAllDigits(add(current, remaining[0]), remaining.slice(1, remaining.length))
    : current

function calcRating(input: string[], index: number, calcBitCriteria: (input: string[]) => string): string {
    if (input.length > 1) {
        const bitCriteria = calcBitCriteria(input)
        const newInput = input.filter(row => row[index] === bitCriteria[index])
        return calcRating(newInput, index + 1, calcBitCriteria)
    }
    return input[0]
}

const gamma = parseInt(convertToGamma(input), 2)
const epsilon = parseInt(convertToEpsilon(input), 2)
console.log('solution 1:', gamma * epsilon)

const oxygenGenerator = parseInt(calcRating(input, 0, convertToGamma), 2)
const co2Scrubber = parseInt(calcRating(input, 0, convertToEpsilon), 2)
console.log('solution 2:', oxygenGenerator * co2Scrubber)