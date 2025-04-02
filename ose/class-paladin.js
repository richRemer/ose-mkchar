import Strength from "./ability-strength.js";
import Wisdom from "./ability-wisdom.js";
import Charisma from "./ability-charisma.js";

export const Paladin = {
    advanced: true,
    primes: [Strength, Wisdom],
    hitDie: 8,

    isAvailable(character) {
        return character[Charisma] >= 9;
    },

    xpBonus(character) {
        if (character[Strength] >= 16 && character[Wisdom] >= 16) return 10;
        if (character[Strength] >= 13 || character[Wisdom] >= 13) return 5;
        return 0;
    }
};
