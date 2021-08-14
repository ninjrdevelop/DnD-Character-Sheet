// Sourced from https://github.com/derikb/character-sheet-5e
// Props to the awesome code on that project.

/**
 * Model for 5e character data
 */

import { attributes, skillAttributes, skillLevels } from './CharacterConstants.js';

export default class Character5e {
    /**
     * Property notes...
     * @prop {String} key Unique (in one instance of the app) id for the character. 7 Random letters/numbers.
     * @prop {String} charname Name.
     * @prop {Object} class_points Class point like ki, sorcerer points, etc.
     * @prop {Number} class_points.cur
     * @prop {Number} class_points.max
     * @prop {Array[]} weapons Weapon data (name, att, dam, notes).
     * @prop {String[]} features Special features and abilities.
     * @prop {String[]} equipment Stuff the character carries.
     * @prop {Array[]} notes_adv Adventure notes [header, text]
     * @prop {Array[]} notes_cam Campaign notes [header, text]
     * @prop {Array[]} npcs NPC notes [header, text]
     * @prop {Array[]} factions NPC notes [header, text]
     * @prop {String} key_prev If character was imported into app with identical key. This is that key and the character is given a new one on import.
     * @prop {Object} skills Skill and its level. 0/1/2 (See skillLevels).
     */
    constructor ({
        key = '',
        charname = '',
        charclass = '',
        race = '',
        background = '',
        alignment = '',
        level = 1,
        experience = 0,
        inspiration = '',
        armor_class = 10,
        initiative = 0,
        speed = 30,
        health = {
            current: 0,
            maximum: 0,
            temporary: 0
        },
        hd_cur = 0,
        hd_max = 1,
        hd_type = 'd10',
        deathSave = {
            success: 0,
            fail: 0
        },
        class_points = {
            cur: 0,
            max: 0
        },
        str = 10,
        dex = 10,
        con = 10,
        int = 10,
        wis = 10,
        cha = 10,
        saves = {
            'str': 0,
            'dex': 0,
            'con': 0,
            'int': 0,
            'wis': 0,
            'cha': 0
        },
        passive_perception = 10,
        skills = {
            acrobatics: 0,
            animal_handling: 0,
            arcana: 0,
            athletics: 0,
            deception: 0,
            history: 0,
            insight: 0,
            intimidation: 0,
            investigation: 0,
            medicine: 0,
            nature: 0,
            perception: 0,
            performance: 0,
            persuasion: 0,
            religion: 0,
            sleight_of_hand: 0,
            stealth: 0,
            survival: 0
        },
        weapons = [],
        proficiencies_other = '',
        languages = '',
        traits = '',
        ideals = '',
        bonds = '',
        flaws = '',
        appearance = '',
        equipment = [],
        cp = 0,
        sp = 0,
        gp = 0,
        pp = 0,
        features = [],
        notes = '',
        notes_adv = [],
        notes_cam = [],
        npcs = [],
        factions = [],
        partymembers = [],
        spell_ability = '',
        spell_save = 10,
        spell_attack = 0,
        spell_slots = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0
        },
        spell_slots_cur = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0
        },
        spells = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
        },
        updated = '',
        key_prev = ''
    }) {
        this.app = 'character-sheet-5e';
        this.key = key;
        this.charname = charname;
        this.charclass = charclass;
        this.race = race;
        this.background = background;
        this.alignment = alignment;
        // use underscore so we can use getter/setters on level itself.
        this._level = level;
        this.experience = experience;
        this.inspiration = inspiration;
        this.armor_class = armor_class;
        this._initiative = initiative;
        this.speed = speed;
        this.health = health;
        this.hd_cur = hd_cur;
        this.hd_max = hd_max != 0 ? hd_max : level;
        this.hd_type = hd_type;
        this.deathSave = deathSave;
        this.class_points = class_points;
        this.str = str;
        this.dex = dex;
        this.con = con;
        this.int = int;
        this.wis = wis;
        this.cha = cha;
        this.saves = saves;
        this.passive_perception = passive_perception;
        this.skills = skills;
        this.weapons = weapons;
        this.proficiencies_other = proficiencies_other;
        this.languages = languages;
        this.traits = traits;
        this.ideals = ideals;
        this.bonds = bonds;
        this.flaws = flaws;
        this.appearance = appearance;
        this.equipment = equipment;
        this.cp = cp;
        this.sp = sp;
        this.gp = gp;
        this.pp = pp;
        this.features = features;
        this.notes = notes;
        this.notes_adv = notes_adv;
        this.notes_cam = notes_cam;
        this.npcs = npcs;
        this.factions = factions;
        this.partymembers = partymembers;
        this.spell_ability = spell_ability;
        this.spell_save = spell_save;
        this.spell_attack = spell_attack;
        this.spell_slots = spell_slots;
        this.spell_slots_cur = spell_slots_cur;
        this.spells = spells;
        this.updated = updated;
        this.key_prev = key_prev;
    }
    /**
     * Level getter.
     * @returns {Number}
     */
    get level() {
        return this._level;
    }
    /**
     * Set level and trigger proficiency update if necessary.
     * @param {Number}
     */
    set level(newVal) {
        const cur = this.level;
        if (newVal === cur) {
            return;
        }
        const prof = this.proficiency;
        this._level = newVal;
        const newProf = this.proficiency;

        // Ensure the HitDie max is updated (as it is based on level)
        this.hd_max = newVal;

        if (prof === newProf) {
            return;
        }
    }
    /**
     * HP getter.
     * @returns {Number}
     */
    get hp() {
        return this.health.current;
    }
    /**
     * Set hp
     * @param {Number}
     */
    set hp(newVal) {
        this.health.current = newVal;
    }
    /**
     * Temporary HP getter.
     * @returns {Number}
     */
    get hp_temp() {
        return this.health.temporary;
    }
    /**
     * Initiative getter.
     * @returns {Number}
     */
    get initiative() {
        return this._initiative;
    }
    /**
     * A quick summary header for use in lists.
     */
    get summaryHeader() {
        return `${this.charname} (${this.charclass} ${this.level})`;
    }
    /**
     * Proficiency modifier as string.
     * @returns {String}
     */
    get proficiency() {
        const bonus = Math.ceil(this.level / 4) + 1;
        return `+${bonus}`;
    }
    /**
     * Proficiency modifier as string.
     * @returns {Number}
     */
    get proficiencyRaw() {
        const bonus = Math.ceil(this.level / 4) + 1;
        return bonus;
    }
    get passivePerception() {
        return 10 + ((this.isProficient('perception')) 
                    ? this.attributeModRaw(attributes.WISDOM) + this.proficiencyRaw
                    : 0);
    }
    /**
     * Set an attribute score.
     * @param {String} attribute
     * @param {Number} value
     */
    setAttribute(attribute, value) {
        if (!this[attribute]) {
            return;
        }
        const curVal = this[attribute];
        if (curVal === value) {
            return;
        }
        this[attribute] = value;
    }
    /**
     * Get modifier for an attribute.
     * @param {String} attribute Attribute short code
     * @returns {String}
     */
    attributeMod(attribute) {
        let score = this[attribute];
        if (Number.isNaN(score)) {
            return '0';
        }
        const raw = Math.floor((score - 10) / 2);
        return (raw > 0) ? `+${raw}` : raw.toString();
    }
    /**
     * Get raw modifier for an attribute.
     * @param {String} attribute Attribute short code
     * @returns {Number}
     */
    attributeModRaw(attribute) {
        let score = this[attribute];
        if (Number.isNaN(score)) {
            return '0';
        }
        return Math.floor((score - 10) / 2);
    }
    /**
     * Are they proficient in a skill.
     * @param {String} skill
     * @returns {Boolean}
     */
    isProficient(skill) {
        return this.skills[skill] > skillLevels.UNSKILLED;
    }
    /**
     * Are they expert in a skill.
     * @param {String} skill
     * @returns {Boolean}
     */
    isExpert(skill) {
        return this.skills[skill] === skillLevels.EXPERT;
    }
    /**
     * Get the modifier for a skill.
     * @param {String} skill
     * @returns {String}
     */
    getSkillModRaw(skill) {
        let raw = 0;
        const skillLevel = this.skills[skill];
        if (typeof skillLevel === 'undefined') {
            return 0;
        }
        const attribute = skillAttributes[skill];
        if (attribute) {
            raw += parseInt(this.attributeMod(attribute), 10);
        }
        const prof = parseInt(this.proficiency, 10);
        if (this.isProficient(skill)) {
            raw += prof;
        }
        if (this.isExpert(skill)) {
            raw += prof;
        }
        return raw;
    }
    /**
     * Get the modifier for a skill.
     * @param {String} skill
     * @returns {String}
     */
    getSkillMod(skill) {
        let raw = this.getSkillModRaw(skill)
        return (raw > 0) ? `+${raw}` : raw.toString();
    }
    /**
     * Get skill proficiency
     * @param {String} skill
     * @returns {Number}
     */
    getSkill(skill) {
        let value = this.skills[skill];
        if (typeof value === 'undefined') {
            return null;
        }
        return value;
    }
    /**
     * Set a skill proficiency.
     * @param {String} skill
     * @param {Number} newValue
     */
    setSkill(skill, newValue) {
        let curValue = this.getSkill(skill);
        if (curValue === null || curValue === newValue) {
            return;
        }
        this.skills[skill] = newValue;
    }
    /**
     * Is the attribute save proficient.
     * @param {String} attr
     * @returns {Number}
     */
    isSaveProficient(attr) {
        return (this.saves[attr] || 0);
    }
    /**
     * Get the save modifier for an attribute.
     * @param {String} attr
     * @returns {String}
     */
    saveMod(attr) {
        let profMod = 0;
        if (this.isSaveProficient(attr)) {
            profMod = parseInt(this.proficiency, 10);
        }
        const raw = 0 + profMod + parseInt(this.attributeMod(attr), 10);
        return (raw > 0) ? `+${raw}` : raw.toString();
    }
    /**
     * Get the save modifier for an attribute.
     * @param {String} attr
     * @returns {Number}
     */
    saveModRaw(attr) {
        let profMod = 0;
        if (this.isSaveProficient(attr)) {
            profMod = parseInt(this.proficiency, 10);
        }
        return 0 + profMod + parseInt(this.attributeMod(attr), 10);
    }
    /**
     * Set/unset a save proficiency.
     * @param {String} attr
     * @param {Number} checked
     */
    setSaveProficiency(attr, checked) {
        const cur = this.saves[attr];
        if (typeof cur === 'undefined') {
            return;
        }
        if (cur === checked) {
            return;
        }
        this.saves[attr] = (checked ? 1 : 0);
    }
    /**
     * Update health value by a certain amount.
     * @param {Number} amount
     */
    updateHealth(amount) {
        // Subtracting health
        if (amount < 0) {
            // If we've got temporary hitpoints, take these first
            if (this.health.temporary > 0) {
                // Add the (negative) adjustment amount to our temporary health total
                this.health.temporary += amount;

                // If that brings our temporary health under 0
                if (this.health.temporary < 0) {
                    // Get the leftover
                    let left = Math.abs(this.health.temporary);
                    // Reset temporary to 0
                    this.health.temporary = 0;
                    // And take the leftover from our health pool
                    this.health.current -= left;
                }
            } 
            // No temporary hitpoints
            else {
                // Add the (negative) adjustment amount to our current health total
                this.health.current += amount;
            }
        }
        // We're adding health
        else {
            // Add the health
            this.health.current = this.health.current + amount;

            // Ensure we don't go over our maximum
            if (this.health.current > this.health.maximum)
                this.health.current = this.health.maximum;
        }
        this.health = this.health;
    }
    /**
     * Converting _ props for saving.
     * @returns {Object}
     */
    toJSON() {
        const obj = {};
        const props = Object.getOwnPropertyNames(this);
        props.forEach((prop) => {
            if (prop === 'emitter') {
                return;
            }
            if (prop.substr(0, 1) === '_') {
                obj[prop.substr(1)] = this[prop];
            } else {
                obj[prop] = this[prop];
            }
        });
        return obj;
    }
};