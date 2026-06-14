interface User {
    username: string
}

interface ListLevel {
    name: string,
    publisher: string,
    videoId: string,
    verifier: User,
    victors: User[],
    tier: number,
    levelId: number
}