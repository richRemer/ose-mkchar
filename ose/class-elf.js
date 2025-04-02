import Strength from "./ability-strength.js";
import Intelligence from "./ability-intelligence.js";

export const Elf = {
    demihuman: true,
    primes: [Strength, Intelligence],
    hitDie: 6,

    isAvailable(character) {
        return character[Intelligence] >= 9;
    },

    xpBonus(character) {
        if (character[Strength] >= 13 && character[Intelligence] >= 16) return 10;
        if (character[Strength] >= 13 && character[Intelligence] >= 13) return 5;
        return 0;
    }
};
