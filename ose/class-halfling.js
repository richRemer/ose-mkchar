import Strength from "./ability-strength.js";
import Dexterity from "./ability-dexterity.js";
import Constitution from "./ability-constitution.js";

export const Halfling = {
    demihuman: true,
    primes: [Strength, Dexterity],
    hitDie: 6,

    isAvailable(character) {
        return character[Dexterity] >= 9 && character[Constitution] >= 9;
    },

    xpBonus(character) {
        if (character[Strength] >= 13 && character[Dexterity]) return 10;
        if (character[Strength] >= 13 || character[Dexterity]) return 5;
        return 0;
    }
};
