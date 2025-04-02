import Strength from "./ability-strength.js";
import Dexterity from "./ability-dexterity.js";
import Constitution from "./ability-constitution.js";

export const Knight = {
    advanced: true,
    prime: Strength,
    hitDie: 8,

    isAvailable(character) {
        return character[Dexterity] >= 9 && character[Constitution] >= 9;
    },

    xpBonus(character) {
        if (character[Strength] >= 16) return 10;
        if (character[Strength] >= 13) return 5;
        if (character[Strength] >= 9) return 0;
        if (character[Strength] >= 6) return -10;
        return -20;
    }
};
