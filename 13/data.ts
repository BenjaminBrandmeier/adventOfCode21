export interface Dot {
    x: number,
    y: number
}

export interface Fold {
    direction: string,
    at: number
}

export interface Instructions {
    dots: Dot[]
    folds: Fold[]
}

export type Paper = string[][]