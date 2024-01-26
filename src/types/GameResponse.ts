export type GameResponse = {
    scene: {name: string},
    persons: {role:string, message: string}[],
    difficulty: number
}