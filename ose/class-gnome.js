import Dexterity from "./ability-dexterity.js";
import Constitution from "./ability-constitution.js";
import Intelligence from "./ability-intelligence.js";

export const Gnome = {
    advanced: true,
    demihuman: true,
    primes: [Dexterity, Intelligence],
    hitDie: 4,

    isAvailable(character) {
        return character[Constitution] >= 9;
    },

    xpBonus(character) {
        if (character[Dexterity] >= 13 && character[Intelligence] >= 16) return 10;
        if (character[Dexterity] >= 13 && character[Intelligence] >= 13) return 5;
        return 0;
    }
};
