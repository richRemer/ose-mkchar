import Strength from "./ability-strength.js";
import Constitution from "./ability-constitution.js";
import Wisdom from "./ability-wisdom.js";

export default Symbol("Ranger");

export const Ranger = {
    advanced: true,
    displayName: "Ranger",
    prime: Strength,
    hitDie: 8,

    isAvailable(character) {
        return character[Constitution] >= 9 && character[Wisdom] >= 9;
    },

    xpBonus(character) {
        if (character[Strength] >= 16) return 10;
        if (character[Strength] >= 13) return 5;
        if (character[Strength] >= 9) return 0;
        if (character[Strength] >= 6) return -10;
        return -20;
    }
};
