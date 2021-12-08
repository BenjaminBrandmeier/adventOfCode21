import {Entry} from "./types.ts";

const entries: Entry[] = Deno.readTextFileSync('inputx.txt').split(/\n/)
    .map(x => ({signalPattern: x.split(' | ')[0].split(' '), output: x.split(' | ')[1].split(' ')}));

const isEasyDigit = (acc: number, b: number) => [2, 4, 3, 7].includes(b) ? acc + 1 : acc;
const toLength = (entries: Entry[]) => entries.flatMap(entry => entry.output.map(output => output.length));
const findOccurencesOfEasyDigits = (entries: Entry[]) => toLength(entries).reduce(isEasyDigit, 0);
const mapCodeToPattern = (pattern: string[], signals: string[]) => signals.map((code: string) => code.split('').map(x => pattern.indexOf(x)));
const verySeriousPatternCreation = () => ['a', 'b', 'c', 'd', 'e', 'f', 'g'].sort((_, __) => Math.random() > 0.5 ? -1 : 1)
const sum = (acc: number, b: number) => acc + b;

const convertCode = (code: number[] | string[]) => new Map([['012456', 0], ['25', 1], ['02346', 2], ['02356', 3], ['1235', 4], ['01356', 5],
    ['013456', 6], ['025', 7], ['0123456', 8], ['012356', 9]]).get(code.sort().join(''))

function findCorrectPatternViaVerySeriousPatternCreation (signals: string[], pattern: string[] = [], mappedValues: any[] = []): string[] {
    while (mappedValues.reduce(sum, 0) !== 45) {
        pattern = verySeriousPatternCreation();
        mappedValues = mapCodeToPattern(pattern, signals).map((x: number[]) => convertCode(x));
    }
    return pattern;
}

const calculateSumOfOutputValues = (entries: Entry[]) => entries
    .map(e => ({pattern: findCorrectPatternViaVerySeriousPatternCreation(e.signalPattern), output: e.output}))
    .map(s => s.output.map(x => x.split('').map(z => s.pattern.indexOf(z))))
    .map(m => Number(m.map(p => convertCode(p)).join('')))
    .reduce(sum, 0);

console.log('solution 1:', findOccurencesOfEasyDigits(entries))
console.log('solution 2:', calculateSumOfOutputValues(entries))
