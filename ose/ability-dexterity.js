export default Symbol("Dexterity");

export function ac(score) {
    if (score >= 18) return 3;
    if (score >= 16) return 2;
    if (score >= 13) return 1;
    if (score >= 9) return 0;
    if (score >= 6) return -1;
    if (score >= 4) return -2;
    return -3;
}

export function initiative(score) {
    if (score >= 18) return 2;
    if (score >= 13) return 1;
    if (score >= 9) return 0;
    if (score >= 4) return -1;
    return -2;
}

export function missile(score) {
    if (score >= 18) return 3;
    if (score >= 16) return 2;
    if (score >= 13) return 1;
    if (score >= 9) return 0;
    if (score >= 6) return -1;
    if (score >= 4) return -2;
    return -3;
}
