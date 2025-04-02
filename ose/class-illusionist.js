import Dexterity from "./ability-dexterity.js";
import Intelligence from "./ability-intelligence.js";

export const Illusionist = {
    advanced: true,
    prime: Intelligence,
    hitDie: 4,

    isAvailable(character) {
        return character[Dexterity] >= 9;
    },

    xpBonus(character) {
        if (character[Intelligence] >= 16) return 10;
        if (character[Intelligence] >= 13) return 5;
        if (character[Intelligence] >= 9) return 0;
        if (character[Intelligence] >= 6) return -10;
        return -20;
    }
};
