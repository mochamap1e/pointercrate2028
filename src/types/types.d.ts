interface Player {
    name: string,
    verifications: List
}

interface ListLevel {
    name: string,
    verifier: Player,
    thumbnail: string
}

interface Players extends Array<Player> {}
interface List extends Array<ListLevel> {}