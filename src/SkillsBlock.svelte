<script>
	import { createEventDispatcher } from 'svelte';

	export let stats = {};
	export let stat_mods = {};

	let saving_throws = {
		strength: {proficiency: 0, profLabel:"", modifier: 0},
		dexterity: {proficiency: 0, profLabel:"", modifier: 0},
		constitution: {proficiency: 0, profLabel:"", modifier: 0},
		wisdom: {proficiency: 0, profLabel:"", modifier: 0},
		intelligence: {proficiency: 0, profLabel:"", modifier: 0},
		charisma: {proficiency: 0, profLabel:"", modifier: 0}
	}

	// let proficiencyTypes = 
	let proficiencyNames = ["", "*", "1/2", "2x"];
	let proficiencyValues= [0,   1,   0.5,   2];

	function changeProfType(arr, stat) {
		let curProf = arr[stat].proficiency
		let index = proficiencyValues.indexOf(curProf) + 1;
		
		if (index > proficiencyValues.length) index -= proficiencyValues.length;

		arr[stat].proficiency = proficiencyValues[index];
		arr[stat].profLabel = proficiencyNames[index];
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
		<input name="proficiencybonus" placeholder="+2" />
	</div>
	<div class="saves list-section box">
		<ul>
			<li>
					
				<label for="strength-save">Strength</label>
				<input name="strength-save" type="text" value="{saving_throws.strength.modifier}" />
				<button on:click="{changeProfType(saving_throws, 'strength')}">{saving_throws.strength.profLabel}</button>
				<!-- <input name="strength-save-prof" type="checkbox" /> -->
			</li>
			<li>
				<label for="dexterity-save">Dexterity</label><input name="dexterity-save" type="text" /><input name="dexterity-save-prof" type="checkbox" />
			</li>
			<li>
				<label for="constitution-save">Constitution</label><input name="constitution-save" type="text" /><input name="constitution-save-prof" type="checkbox" />
			</li>
			<li>
				<label for="wisdom-save">Wisdom</label><input name="wisdom-save" type="text" /><input name="wisdom-save-prof" type="checkbox" />
			</li>
			<li>
				<label for="intelligence-save">Intelligence</label><input name="intelligence-save" type="text" /><input name="intelligence-save-prof" type="checkbox" />
			</li>
			<li>
				<label for="charisma-save">Charisma</label><input name="charisma-save" type="text" /><input name="charisma-save-prof" type="checkbox" />
			</li>
		</ul>
		<div class="label">
			Saving Throws
		</div>
	</div>
	<div class="skills list-section box">
		<ul>
			<li>
				<label for="acrobatics">Acrobatics <span class="skill">(Dex)</span></label><input name="acrobatics" placeholder="+0" type="text" /><input name="acrobatics-prof" type="checkbox" />
			</li>
			<li>
				<label for="animalhandling">Animal Handling <span class="skill">(Wis)</span></label><input name="animalhandling" placeholder="+0" type="text" /><input name="animalhandling-prof" type="checkbox" />
			</li>
			<li>
				<label for="arcana">Arcana <span class="skill">(Int)</span></label><input name="arcana" placeholder="+0" type="text" /><input name="arcana-prof" type="checkbox" />
			</li>
			<li>
				<label for="athletics">Athletics <span class="skill">(Str)</span></label><input name="athletics" placeholder="+0" type="text" /><input name="athletics-prof" type="checkbox" />
			</li>
			<li>
				<label for="deception">Deception <span class="skill">(Cha)</span></label><input name="deception" placeholder="+0" type="text" /><input name="deception-prof" type="checkbox" />
			</li>
			<li>
				<label for="history">History <span class="skill">(Int)</span></label><input name="history" placeholder="+0" type="text" /><input name="history-prof" type="checkbox" />
			</li>
			<li>
				<label for="insight">Insight <span class="skill">(Wis)</span></label><input name="insight" placeholder="+0" type="text" /><input name="insight-prof" type="checkbox" />
			</li>
			<li>
				<label for="intimidation">Intimidation <span class="skill">(Cha)</span></label><input name="intimidation" placeholder="+0" type="text" /><input name="intimidation-prof" type="checkbox" />
			</li>
			<li>
				<label for="investigation">Investigation <span class="skill">(Int)</span></label><input name="investigation" placeholder="+0" type="text" /><input name="investigation-prof" type="checkbox" />
			</li>
			<li>
				<label for="medicine">Medicine <span class="skill">(Wis)</span></label><input name="medicine" placeholder="+0" type="text" /><input name="medicine-prof" type="checkbox" />
			</li>
			<li>
				<label for="nature">Nature <span class="skill">(Int)</span></label><input name="nature" placeholder="+0" type="text" /><input name="nature-prof" type="checkbox" />
			</li>
			<li>
				<label for="perception">Perception <span class="skill">(Wis)</span></label><input name="perception" placeholder="+0" type="text" /><input name="perception-prof" type="checkbox" />
			</li>
			<li>
				<label for="performance">Performance <span class="skill">(Cha)</span></label><input name="performance" placeholder="+0" type="text" /><input name="performance-prof" type="checkbox" />
			</li>
			<li>
				<label for="persuasion">Persuasion <span class="skill">(Cha)</span></label><input name="persuasion" placeholder="+0" type="text" /><input name="persuasion-prof" type="checkbox" />
			</li>
			<li>
				<label for="religion">Religion <span class="skill">(Int)</span></label><input name="religion" placeholder="+0" type="text" /><input name="religion-prof" type="checkbox" />
			</li>
			<li>
				<label for="sleightofhand">Sleight of Hand <span class="skill">(Dex)</span></label><input name="sleightofhand" placeholder="+0" type="text" /><input name="sleightofhand-prof" type="checkbox" />
			</li>
			<li>
				<label for="stealth">Stealth <span class="skill">(Dex)</span></label><input name="stealth" placeholder="+0" type="text" /><input name="stealth-prof" type="checkbox" />
			</li>
			<li>
				<label for="survival">Survival <span class="skill">(Wis)</span></label><input name="survival" placeholder="+0" type="text" /><input name="survival-prof" type="checkbox" />
			</li>
		</ul>
		<div class="label">
			Skills
		</div>
	</div>
</div>

<style>

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