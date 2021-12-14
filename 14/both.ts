import {Manual} from "./data.ts"

const blocks = Deno.readTextFileSync('input2.txt').split(/\n\n/)
const manual: Manual = {
    template: blocks[0].split(''),
    rules: blocks[1].split(/\n/).map(z => ({from: z.split(/ -> /)[0], to: z.split(/ -> /)[1]}))
}

function initializeMaps(rules = new Map(), occurences = new Map(), counts = new Map()) {
    manual.rules.forEach(r => rules.set(r.from, r.to) && occurences.set(r.from, 0) && counts.set(r.to, 0))
    manual.template.forEach((n, i, arr) => arr[i + 1] ? occurences.set(n + arr[i + 1], occurences.get(n + arr[i + 1]) + 1) : 0)
    return {rules, occurences, counts}
}

function calculateQuantities(occurences: Map<string, number>, rules: Map<string, string>, counts: Map<string, number>, iterations: number): number[] {
    [...Array(iterations)].forEach(() => {
        const dirtyMap: Map<string, number> = new Map(occurences);

        [...occurences.keys()].forEach(candidate => {
            counts.set(rules.get(candidate)!, counts.get(rules.get(candidate)!)! + occurences.get(candidate)!)
            dirtyMap.set(candidate[0] + rules.get(candidate)!, dirtyMap.get(candidate[0] + rules.get(candidate)!)! + occurences.get(candidate)!)
            dirtyMap.set(rules.get(candidate)! + candidate[1], dirtyMap.get(rules.get(candidate)! + candidate[1])! + occurences.get(candidate)!)
            dirtyMap.set(candidate, dirtyMap.get(candidate)! - occurences.get(candidate)!)
        })
        occurences = dirtyMap
    })
    return [...counts.values()]
}

const {rules, occurences, counts} = initializeMaps()
const quantities = calculateQuantities(occurences, rules, counts, 40)

console.log('solution:', Math.max(...quantities) - Math.min(...quantities))