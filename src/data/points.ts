import { list } from "./list";

const pointsMax = 250;
const pointsMin = 10;

function round(x: number) {
    return +(x).toFixed(2);
}

export function calculatePointsForLevel(position: number) {
    return round(pointsMax - ((pointsMax-pointsMin)*(position-1))/(list.length-1));
}

export function calculatePointsForUser(user: User) {
    let points = 0;

    list.forEach(level => {
        if ((level.verifier === user) || (level.victors.includes(user))) {
            points += calculatePointsForLevel(list.indexOf(level)+1);
        }
    });

    return round(points);
}