export default Symbol("Intelligence");

export function literacy(score) {
    if (score >= 9) return "Literate";
    if (score >= 6) return "Basic";
    return "Illiterate";
}

export function spokenLanguages(score) {
    if (score >= 18) return 3;
    if (score >= 16) return 2;
    if (score >= 13) return 1;
    return 0;
}
