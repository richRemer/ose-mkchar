import Strength from "./ability-strength.js";
import Dexterity from "./ability-dexterity.js";

export const HalfOrc = {
    advanced: true,
    demihuman: true,
    displayName: "Half-Orc",
    primes: [Strength, Dexterity],
    hitDie: 6,

    isAvailable() {
        return true;
    },

    xpBonus(character) {
        if (character[Strength] >= 16 && character[Dexterity] >= 16) return 10;
        if (character[Strength] >= 13 && character[Dexterity] >= 13) return 5;
        return 0;
    }
}
