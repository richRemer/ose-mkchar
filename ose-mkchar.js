#!/usr/bin/env node
import * as readline from "readline/promises";
import * as abilities from "./ose/abilities.js";
import * as classes from "./ose/classes.js";
import * as Constitution from "./ose/ability-constitution.js";

const character = rollAbilities();
const options = [];
const {stdin: input, stdout: output} = process;
const rl = readline.createInterface({input, output, completer});
const availableClasses = {};

for (const [name, Class] of Object.entries(classes)) {
    if (Class.isAvailable(character)) {
        const displayName = Class.displayName || name;
        availableClasses[displayName] = Class;
    }
}

console.log(`Abilities`);
console.log("  Strength     ", character[abilities.Strength]);
console.log("  Dexterity    ", character[abilities.Dexterity]);
console.log("  Constitution ", character[abilities.Constitution]);
console.log("  Intelligence ", character[abilities.Intelligence]);
console.log("  Wisdom       ", character[abilities.Wisdom]);
console.log("  Charisma     ", character[abilities.Charisma]);
console.log("");
console.log("Your character meets the requiements for the following classes:");

for (const [name, Class] of Object.entries(availableClasses)) {
    const bonus = Class.xpBonus(character);
    options.push(name);

    if (bonus > 0) {
        console.log(`  ${name} (+${bonus}%)`);
    } else if (bonus < 0) {
        console.log(`  ${name} (${bonus}%)`);
    } else {
        console.log(`  ${name}`);
    }
}

console.log();
character.class = await rl.question("Which class do you want to play? ");

do {
    character.hp = d(availableClasses[character.class].hitDie);
} while (character.hp < 3);

character.hp = Math.max(1, character.hp + Constitution.hitPoints(character[abilities.Constitution]));
console.log("Hit Points", character.hp);

rl.close();

function completer(line) {
    const hits = options.filter(option => option.toLowerCase().startsWith(line.toLowerCase()));
    return [hits.length ? hits : options, line];
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

function abilityCode(character) {
    let code = "";

    code += (character[abilities.Strength]-3).toString(16);
    code += (character[abilities.Dexterity]-3).toString(16);
    code += (character[abilities.Constitution]-3).toString(16);
    code += (character[abilities.Intelligence]-3).toString(16);
    code += (character[abilities.Wisdom]-3).toString(16);
    code += (character[abilities.Charisma]-3).toString(16);

    return code;
}
