import Intelligence from "./ability-intelligence.js";

export const MagicUser = {
    displayName: "Magic-User",
    prime: Intelligence,
    hitDie: 4,

    isAvailable() {
        return true;
    },

    xpBonus(character) {
        if (character[Intelligence] >= 16) return 10;
        if (character[Intelligence] >= 13) return 5;
        if (character[Intelligence] >= 9) return 0;
        if (character[Intelligence] >= 6) return -10;
        return -20;
    }
};
