import Strength from "./ability-strength.js";
import Constitution from "./ability-constitution.js";
import Intelligence from "./ability-intelligence.js";
import Charisma from "./ability-charisma.js";

export default Symbol("Half-Elf");

export const HalfElf = {
    advanced: true,
    demihuman: true,
    displayName: "Half-Elf",
    primes: [Strength, Intelligence],
    hitDie: 6,

    isAvailable(character) {
        return character[Constitution] >= 9 && character[Charisma] >= 9;
    },

    xpBonus(character) {
        if (character[Strength] >= 16 || character[Intelligence] >= 16) return 10;
        if (character[Strength] >= 13 && character[Intelligence] >= 13) return 5;
        return 0;
    }
};
