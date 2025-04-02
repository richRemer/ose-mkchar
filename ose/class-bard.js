import Dexterity from "./ability-dexterity.js";
import Intelligence from "./ability-intelligence.js";
import Charisma from "./ability-charisma.js";

export const Bard = {
    advanced: true,
    prime: Charisma,
    hitDie: 6,

    isAvailable(character) {
        return character[Dexterity] >= 9 && character[Intelligence] >= 9;
    },

    xpBonus(character) {
        if (character[Charisma] >= 16) return 10;
        if (character[Charisma] >= 13) return 5;
        if (character[Charisma] >= 9) return 0;
        if (character[Charisma] >= 6) return -10;
        return -20;
    }
};
