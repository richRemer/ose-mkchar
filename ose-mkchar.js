#!/usr/bin/env node
import * as readline from "readline/promises";
import {Class, HP} from "./ose/core.js";
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
console.log("Your character meets the requirements for the following classes:");

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

const className = await rl.question("Which class do you want to play? ");
character[Class] = {...availableClasses[className]};
character[Class].displayName = character[Class].displayName || className;

do {
    character[HP] = d(character[Class].hitDie);
} while (character[HP] < 3);

character[HP] = Math.max(1, character[HP] + Constitution.hitPoints(character[abilities.Constitution]));
console.log("Hit Points", character[HP]);
// console.log();
// console.log("Character Code:", serialize(character));

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

function encodeAlphaCode(code) {
    if (code.length !== 3) {
        throw new Error("alpha code should be 3 characters");
    }

    const offset = "a".charCodeAt(0);
    const first = code[0].charCodeAt(0) - offset;
    const second = code[1].charCodeAt(1) - offset;
    const third = code[2].charCodeAt(2) - offset;
    const value = first + second * 26 + third * 26 * 26;
    const result = Buffer.alloc(2);

    result.writeUInt16LE(value);

    return result;
}

function serialize(character) {
    console.log("abilities", serializeAbilities(character));
    console.log("class", serializeClass(character));
    console.log("hp", serializeHitPoints(character));

    return Buffer.concat([
        serializeAbilities(character),
        serializeClass(character),
        serializeHitPoints(character),
    ]).toString("base64");
}

function serializeAbilities(character) {
    let code = "";

    return Buffer.from([
        (character[abilities.Strength]-3) << 4 + character[abilities.Dexterity]-3,
        (character[abilities.Constitution]-3) << 4 + character[abilities.Intelligence]-3,
        (character[abilities.Wisdom]-3) << 4 + character[abilities.Charisma]-3,
    ]);
}

function serializeClass(character) {
    switch (character[Class]) {
        case classes.Acrobat: return encodeAlphaCode("acr");
        case classes.Assassin: return encodeAlphaCode("ass");
        case classes.Barbarian: return encodeAlphaCode("brb");
        case classes.Bard: return encodeAlphaCode("brd");
        case classes.Cleric: return encodeAlphaCode("cle");
        case classes.Drow: return encodeAlphaCode("dro");
        case classes.Druid: return encodeAlphaCode("dru");
        case classes.Duergar: return encodeAlphaCode("due");
        case classes.Dwarf: return encodeAlphaCode("dwa");
        case classes.Elf: return encodeAlphaCode("elf");
        case classes.Fighter: return encodeAlphaCode("fig");
        case classes.Gnome: return encodeAlphaCode("gno");
        case classes.HalfElf: return encodeAlphaCode("hfe");
        case classes.HalfOrc: return encodeAlphaCode("hfo");
        case classes.Halfling: return encodeAlphaCode("hfl");
        case classes.Illusionist: return encodeAlphaCode("ill");
        case classes.Knight: return encodeAlphaCode("kni");
        case classes.MagicUser: return encodeAlphaCode("mag");
        case classes.Paladin: return encodeAlphaCode("pal");
        case classes.Ranger: return encodeAlphaCode("ran");
        case classes.Svirfneblin: return encodeAlphaCode("svi");
        case classes.Thief: return encodeAlphaCode("thi");
        default: throw new Error("unknown class");
    }
}

function serializeHitPoints(character) {
    const total = character[HP] * 6 + (character.accruedHP) || 0;
    return Buffer.from([total]);
}
