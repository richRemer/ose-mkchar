#!/usr/bin/env node
import * as abilities from "./ose/abilities.js";
import * as classes from "./ose/classes.js";

const character = rollAbilities();

console.log("Strength:", character[abilities.Strength]);
console.log("Dexterity:", character[abilities.Dexterity]);
console.log("Constitution:", character[abilities.Constitution]);
console.log("Intelligence:", character[abilities.Intelligence]);
console.log("Wisdom:", character[abilities.Wisdom]);
console.log("Charisma:", character[abilities.Charisma]);
console.log("");
console.log("Choose from the following classes:");

for (const [name, Class] of Object.entries(classes)) {
    if (Class.isAvailable(character)) {
        const displayName = Class.displayName || name;
        const bonus = Class.xpBonus(character);

        if (bonus > 0) {
            console.log(`${displayName} (+${bonus}%)`);
        } else if (bonus < 0) {
            console.log(`${displayName} (${bonus}%)`);
        } else {
            console.log(displayName);
        }
    }
}

function d(n) {
    return parseInt(Math.random() * n) + 1;
}

function d6() {
    return d(6);
}

function rollAbility() {
    return d6() + d6() + d6();
}

function rollAbilities() {
    return {
        [abilities.Strength]: rollAbility(),
        [abilities.Dexterity]: rollAbility(),
        [abilities.Constitution]: rollAbility(),
        [abilities.Intelligence]: rollAbility(),
        [abilities.Wisdom]: rollAbility(),
        [abilities.Charisma]: rollAbility(),
    };
}
