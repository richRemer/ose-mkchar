import Strength from "./ability-strength.js";

export default Symbol("Fighter");

export const Fighter = {
    displayName: "Fighter",
    prime: Strength,
    hitDie: 8,

    isAvailable() {
        return true;
    },

    xpBonus(character) {
        if (character[Strength] >= 16) return 10;
        if (character[Strength] >= 13) return 5;
        if (character[Strength] >= 9) return 0;
        if (character[Strength] >= 6) return -10;
        return -20;
    }
};
