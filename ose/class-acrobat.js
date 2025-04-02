import Strength from "./ability-strength.js";
import Dexterity from "./ability-dexterity.js";

export default Symbol("Acrobat");

export const Acrobat = {
    advanced: true,
    displayName: "Acrobat",
    prime: Dexterity,
    hitDie: 4,

    canAdjustDown(ability) {
        return ability === Strength ? false : undefined;
    },

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
