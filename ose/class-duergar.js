import Strength from "./ability-strength.js";
import Constitution from "./ability-constitution.js";
import Intelligence from "./ability-intelligence.js";

export default Symbol("Duergar");

export const Duergar = {
    advanced: true,
    demihuman: true,
    displayName: "Duergar",
    prime: Strength,
    hitDie: 6,

    isAvailable(character) {
        return character[Constitution] >= 9 && character[Intelligence] >= 9;
    },

    xpBonus(character) {
        if (character[Strength] >= 16) return 10;
        if (character[Strength] >= 13) return 5;
        if (character[Strength] >= 9) return 0;
        if (character[Strength] >= 6) return -10;
        return -20;
    }
};
