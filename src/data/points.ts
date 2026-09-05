import { list } from "./list";

const pointsMax = 500;
const pointsMin = 10;
const scale = 5; // higher scale = more points for top levels

function round(x: number) {
    return +(x).toFixed(2);
}

export function calculatePointsForLevel(position: number) {
    const progress = (position - 1) / (list.length - 1);

    const decay = Math.exp(-scale * progress);
    const minDecay = Math.exp(-scale);

    const normalized = (decay - minDecay) / (1 - minDecay);

    return round(pointsMin + (pointsMax - pointsMin) * normalized);
}

export function calculatePointsForUser(user: User) {
    let points = 0;

    list.forEach((level, index) => {
        if ((level.verifier === user) || (level.victors.includes(user))) {
            points += calculatePointsForLevel(index + 1);
        }
    });

    return round(points);
}