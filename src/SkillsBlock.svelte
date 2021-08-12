<script>
	import { createEventDispatcher } from 'svelte';
	import SkillsBlock from '.\\SkillsBlock.svelte';

	export let statlist = {};
	export let character = {};
	export let abilitylist = {};

	let saving_throws = {
		strength: {hasProf: 0, modifier: 0},
		dexterity: {hasProf: 0, modifier: 0},
		constitution: {hasProf: 0, modifier: 0},
		wisdom: {hasProf: 0, modifier: 0},
		intelligence: {hasProf: 0, modifier: 0},
		charisma: {hasProf: 0, modifier: 0}
	}

	$: saving_throws.strength.modifier = character.stat_mods.strength + (character.proficiency * saving_throws.strength.hasProf);
	$: saving_throws.dexterity.modifier = character.stat_mods.dexterity + (character.proficiency * saving_throws.dexterity.hasProf);
	$: saving_throws.constitution.modifier = character.stat_mods.constitution + (character.proficiency * saving_throws.constitution.hasProf);
	$: saving_throws.wisdom.modifier = character.stat_mods.wisdom + (character.proficiency * saving_throws.wisdom.hasProf);
	$: saving_throws.intelligence.modifier = character.stat_mods.intelligence + (character.proficiency * saving_throws.intelligence.hasProf);
	$: saving_throws.charisma.modifier = character.stat_mods.charisma + (character.proficiency * saving_throws.charisma.hasProf);

	let ability_mods = {
		acrobatics: {profMult: 0, profLabel: "", modifier: 0},
		animal_handling: {profMult: 0, profLabel: "", modifier: 0},
		arcana: {profMult: 0, profLabel: "", modifier: 0},
		athletics: {profMult: 0, profLabel: "", modifier: 0},
		deception: {profMult: 0, profLabel: "", modifier: 0},
		history: {profMult: 0, profLabel: "", modifier: 0},
		insight: {profMult: 0, profLabel: "", modifier: 0},
		intimidation: {profMult: 0, profLabel: "", modifier: 0},
		investigation: {profMult: 0, profLabel: "", modifier: 0},
		medicine: {profMult: 0, profLabel: "", modifier: 0},
		nature: {profMult: 0, profLabel: "", modifier: 0},
		perception: {profMult: 0, profLabel: "", modifier: 0},
		performance: {profMult: 0, profLabel: "", modifier: 0},
		persuasion: {profMult: 0, profLabel: "", modifier: 0},
		religion: {profMult: 0, profLabel: "", modifier: 0},
		sleight_of_hand: {profMult: 0, profLabel: "", modifier: 0},
		stealth: {profMult: 0, profLabel: "", modifier: 0},
		survival: {profMult: 0, profLabel: "", modifier: 0}
	}

	$: ability_mods.acrobatics.modifier = Math.floor(character.stat_mods.dexterity + (character.proficiency * ability_mods.acrobatics.profMult));
	$: ability_mods.animal_handling.modifier = Math.floor(character.stat_mods.wisdom + (character.proficiency * ability_mods.animal_handling.profMult));
	$: ability_mods.arcana.modifier = Math.floor(character.stat_mods.intelligence + (character.proficiency * ability_mods.arcana.profMult));
	$: ability_mods.athletics.modifier = Math.floor(character.stat_mods.strength + (character.proficiency * ability_mods.athletics.profMult));
	$: ability_mods.deception.modifier = Math.floor(character.stat_mods.charisma + (character.proficiency * ability_mods.deception.profMult));
	$: ability_mods.history.modifier = Math.floor(character.stat_mods.intelligence + (character.proficiency * ability_mods.history.profMult));
	$: ability_mods.insight.modifier = Math.floor(character.stat_mods.wisdom + (character.proficiency * ability_mods.insight.profMult));
	$: ability_mods.intimidation.modifier = Math.floor(character.stat_mods.charisma + (character.proficiency * ability_mods.intimidation.profMult));
	$: ability_mods.investigation.modifier = Math.floor(character.stat_mods.intelligence + (character.proficiency * ability_mods.investigation.profMult));
	$: ability_mods.medicine.modifier = Math.floor(character.stat_mods.wisdom + (character.proficiency * ability_mods.medicine.profMult));
	$: ability_mods.nature.modifier = Math.floor(character.stat_mods.intelligence + (character.proficiency * ability_mods.nature.profMult));
	$: ability_mods.perception.modifier = Math.floor(character.stat_mods.wisdom + (character.proficiency * ability_mods.perception.profMult));
	$: ability_mods.performance.modifier = Math.floor(character.stat_mods.charisma + (character.proficiency * ability_mods.performance.profMult));
	$: ability_mods.persuasion.modifier = Math.floor(character.stat_mods.charisma + (character.proficiency * ability_mods.persuasion.profMult));
	$: ability_mods.religion.modifier = Math.floor(character.stat_mods.intelligence + (character.proficiency * ability_mods.religion.profMult));
	$: ability_mods.sleight_of_hand.modifier = Math.floor(character.stat_mods.dexterity + (character.proficiency * ability_mods.sleight_of_hand.profMult));
	$: ability_mods.stealth.modifier = Math.floor(character.stat_mods.dexterity + (character.proficiency * ability_mods.stealth.profMult));
	$: ability_mods.survival.modifier = Math.floor(character.stat_mods.wisdom + (character.proficiency * ability_mods.survival.profMult));

	// let proficiencyTypes = 
	let proficiencyNames = ["", "*", "1/2", "2x"];
	let proficiencyValues= [0,   1,   0.5,   2];

	function changeProfType(arr, stat) {
		let statName = stat.toLowerCase().replace(/ /g, '_');
		console.log(statName);

		let curProf = arr[statName].profMult
		let index = proficiencyValues.indexOf(curProf) + 1;
		
		if (index >= proficiencyValues.length) index -= proficiencyValues.length;

		arr[statName].profMult = proficiencyValues[index];
		arr[statName].profLabel = proficiencyNames[index];

		character.proficiency = character.proficiency;
	}

	function capitalise(str) {
		return str[0].toUpperCase() + str.substring(1)
	}
</script>

<div class="attr-applications">
	<div class="inspiration box">
		<div class="label-container">
			<label for="inspiration">Inspiration</label>
		</div>
		<input name="inspiration" type="checkbox" />
	</div>
	<div class="proficiencybonus box">
		<div class="label-container">
			<label for="proficiencybonus">Proficiency Bonus</label>
		</div>
		<input name="proficiencybonus" placeholder="+2" bind:value={character.proficiency} />
	</div>
	<div class="saves list-section box">
		<ul>
			{#each statlist as {name}, i}
			<li>
				<label for="{name}-save">{capitalise(name)}</label>
				<input name="{name}-save" type="text" bind:value="{saving_throws[name].modifier}" />
				<input name="{name}-prof" type="checkbox" bind:checked="{saving_throws[name].hasProf}" />
			</li>
			{/each}
		</ul>
		<div class="label">
			Saving Throws
		</div>
	</div>
	<div class="skills list-section box">
		<ul>
			{#each abilitylist as {name, stat, small_name}, i}
			<li>
				<label for="{small_name}">{name} <span class="skill">({capitalise(stat)})</span></label>
				<input name="{small_name}" type="text" bind:value="{ability_mods[small_name].modifier}" />
				<div class="prof_button" on:click="{changeProfType(ability_mods, small_name)}">{ability_mods[small_name].profLabel}</div>
			</li>
			{/each}
		</ul>
		<div class="label">
			Skills
		</div>
	</div>
</div>

<style>
	.prof_button {
		cursor: pointer;

		border: 1px solid black;

		width: 20px;
		height: 20px;

		border-radius: 10px;

		font-size: 12px;
		line-height: 20px;
		text-align: center;
	}
	div.attr-applications div.inspiration {
		display: flex;
		flex-direction: row-reverse;
		justify-content: flex-end;
	}
	div.attr-applications div.inspiration input {
		-webkit-appearance: none;
			 -moz-appearance: none;
						appearance: none;
		border: 1px solid black;
		padding: 15px;
		border-radius: 10px;
	}
	div.attr-applications div.proficiencybonus {
		display: flex;
		flex-direction: row-reverse;
		justify-content: flex-end;
	}
	div.attr-applications div.proficiencybonus input {
		width: 30px;
		height: 28px;
		border: 1px solid black;
		text-align: center;
		border-radius: 10px;
	}
	div.attr-applications div.list-section {
		border: 1px solid black;
		border-radius: 10px;
		padding: 10px 5px;
	}
	div.attr-applications div.list-section div.label {
		margin-top: 10px;
		margin-bottom: 2.5px;
		text-align: center;
		text-transform: uppercase;
		font-size: 10px;
		font-weight: bold;
	}
	div.attr-applications div.list-section ul li {
		display: flex;
		align-items: center;
	}
	div.attr-applications div.list-section ul li > * {
		margin-left: 5px;
	}
	div.attr-applications div.list-section ul li label {
		text-transform: none;
		font-size: 8px;
		text-align: left;
		order: 3;
	}
	div.attr-applications div.list-section ul li label span.skill {
		color: #bbb;
	}
	div.attr-applications div.list-section ul li input[type=text] {
		width: 30px;
		font-size: 12px;
		text-align: center;
		border: 0;
		border-bottom: 1px solid black;
		order: 2;
	}
	div.attr-applications div.list-section ul li input[type=checkbox] {
		-webkit-appearance: none;
			 -moz-appearance: none;
						appearance: none;
		width: 10px;
		height: 10px;
		border: 1px solid black;
		border-radius: 10px;
		order: 1;
	}
	div.attr-applications div.list-section ul li input[type=checkbox]:checked {
		background-color: black;
	}
</style>