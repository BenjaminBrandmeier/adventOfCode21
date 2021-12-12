const input: string[][] = Deno.readTextFileSync('input2.txt').split(/\n/).map(x => x.split('-'))
const connections: Map<string, string[]> = prepareInput(input)

function prepareInput(input: string[][], map = new Map()) {
    input.forEach(a => {
        map.has(a[0])
            ? map.set(a[0], map.get(a[0]).concat(a[1]))
            : map.set(a[0], [a[1]])
        map.has(a[1])
            ? map.set(a[1], map.get(a[1]).concat(a[0]))
            : map.set(a[1], [a[0]])
    })
    return map
}

const isLowerCase = (s: string) => s !== s.toUpperCase()
const hasLowerAlready = (candidate: string, currentPath: string[]) => isLowerCase(candidate) && currentPath.indexOf(candidate) !== -1

function hasLowerAlreadyTwice(candidate: string, currentPath: string[]) {
    const allLowers = currentPath.filter(isLowerCase)
    const multipleLowerCaseOccurences = allLowers.find(x => allLowers.filter(b => b === x).length > 1)

    return (currentPath.includes('start') && candidate === 'start') || (multipleLowerCaseOccurences && allLowers.includes(candidate))
}

function addAllPathsToSet(connections: Map<string, string[]>, uniquePaths: Set<string>, currentPath: string[], earlyExit: Function, next: string): void {
    let updatedPath = [...currentPath, next]

    if (next === 'end') {
        uniquePaths.add(updatedPath.join())
        return
    } else if (earlyExit(next, currentPath)) {
        return
    }
    connections.get(next)!.forEach(upcoming => addAllPathsToSet(connections, uniquePaths, updatedPath, earlyExit, upcoming))
}

function calculate(map: Map<string, string[]>, shouldExitEarly: Function) {
    let theSet = new Set<string>()
    addAllPathsToSet(map, theSet, [], shouldExitEarly, 'start')
    return theSet.size
}

console.log('solution 1:', calculate(connections, hasLowerAlready))
console.log('solution 2:', calculate(connections, hasLowerAlreadyTwice))