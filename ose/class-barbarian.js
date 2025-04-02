import Strength from "./ability-strength.js";
import Dexterity from "./ability-dexterity.js";
import Constitution from "./ability-constitution.js";

export const Barbarian = {
    advanced: true,
    primes: [Strength, Constitution],
    hitDie: 8,

    isAvailable(character) {
        return character[Dexterity] >= 9;
    },

    xpBonus(character) {
        if (character[Strength] >= 16 && character[Constitution] >= 16) return 10;
        if (character[Strength] >= 13 || character[Constitution] >= 13) return 5;
        return 0;
    }
};
