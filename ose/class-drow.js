import Strength from "./ability-strength.js";
import Intelligence from "./ability-intelligence.js";
import Wisdom from "./ability-wisdom.js";

export const Drow = {
    advanced: true,
    demihuman: true,
    primes: [Strength, Wisdom],
    hitDie: 6,

    isAvailable(character) {
        if (character[Intelligence] >= 16) return 10;
        if (character[Intelligence] >= 13) return 5;
        if (character[Intelligence] >= 9) return 0;
        if (character[Intelligence] >= 6) return -10;
        return -20;
    },

    xpBonus(character) {
        if (character[Strength] >= 13 && character[Wisdom] >= 16) return 10;
        if (character[Strength] >= 13 && character[Wisdom] >= 13) return 5;
        return 0;
    }
};
