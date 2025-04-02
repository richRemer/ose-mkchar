import Dexterity from "./ability-dexterity.js";

export const Thief = {
    prime: Dexterity,
    hitDie: 4,

    isAvailable() {
        return true;
    },

    xpBonus(character) {
        if (character[Dexterity] >= 16) return 10;
        if (character[Dexterity] >= 13) return 5;
        if (character[Dexterity] >= 9) return 0;
        if (character[Dexterity] >= 6) return -10;
        return -20;
    }
};
