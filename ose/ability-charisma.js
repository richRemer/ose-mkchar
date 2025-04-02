export default Symbol("Charisma");

export function npcReactions(score) {
    if (score >= 18) return 2;
    if (score >= 13) return 1;
    if (score >= 9) return 0;
    if (score >= 4) return -1;
    return -2;
}

export function retainersLoyalty(score) {
    if (score >= 18) return 10;
    if (score >= 16) return 9;
    if (score >= 13) return 8;
    if (score >= 9) return 7;
    if (score >= 6) return 6;
    if (score >= 4) return 5;
    return 4;
}

export function retainersMax(score) {
    if (score >= 18) return 7;
    if (score >= 16) return 6;
    if (score >= 13) return 5;
    if (score >= 9) return 4;
    if (score >= 6) return 3;
    if (score >= 4) return 2;
    return 1;
}
