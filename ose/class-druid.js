import Wisdom from "./ability-wisdom.js";

export default Symbol("Druid");

export const Druid = {
    advanced: true,
    displayName: "Druid",
    prime: Wisdom,
    hitDie: 6,

    isAvailable() {
        return true;
    },

    xpBonus(character) {
        if (character[Wisdom] >= 16) return 10;
        if (character[Wisdom] >= 13) return 5;
        if (character[Wisdom] >= 9) return 0;
        if (character[Wisdom] >= 6) return -10;
        return -20;
    }
};
