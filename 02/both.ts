import {Instruction} from "./types.ts"

const instructions: Instruction[] = Deno.readTextFileSync('input2.txt').split(/\n/)
    .map(i => ({direction: i.split(' ')[0], amount: +i.split(' ')[1]}))
    .map((i: Instruction) => i.direction === 'up' ? {...i, amount: -i.amount} : i)

const add = (acc: number, i: Instruction) => acc + i.amount
const isAboutHorizontal = (i: Instruction) => i.direction === 'forward'
const isAboutDepth = (i: Instruction) => ['down', 'up'].includes(i.direction)
const calcHorizontal = (instructions: Instruction[]) => instructions.filter(isAboutHorizontal).reduce(add, 0)
const calcDepth = (instructions: Instruction[]) => instructions.filter(isAboutDepth).reduce(add, 0)
const adjustDepth = (i: Instruction, aim: number, depth: number) => isAboutHorizontal(i) ? depth + aim * i.amount : depth
const adjustAim = (i: Instruction, aim: number) => isAboutDepth(i) ? aim + i.amount : aim

function calcFancyDepth(instructions: Instruction[], aim: number, depth: number): number {
    if (instructions.length > 0) {
        const newAim = adjustAim(instructions[0], aim)
        return calcFancyDepth(instructions.slice(1), newAim, adjustDepth(instructions[0], newAim, depth))
    }
    return depth
}

console.log('solution 1:', calcHorizontal(instructions) * calcDepth(instructions))
console.log('solution 2:', calcHorizontal(instructions) * calcFancyDepth(instructions, 0, 0))