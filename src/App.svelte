<script>

	import PlayerDetails from '.\\PlayerDetails.svelte';
	import SkillsBlock from '.\\SkillsBlock.svelte';

	let statlist = [
		{name: 'strength', short: 'str'}, 
		{name: 'dexterity', short: 'dex'}, 
		{name: 'constitution', short: 'con'}, 
		{name: 'wisdom', short: 'wis'}, 
		{name: 'intelligence', short: 'int'},
		{name: 'charisma', short: 'cha'}
	];

	let abilitylist = [
		{name: "Acrobatics", stat: "dexterity", small_name: 'acrobatics'},
		{name: "Animal Handling", stat: "wisdom", small_name: 'animal_handling'},
		{name: "Arcana", stat: "intelligence", small_name: 'arcana'},
		{name: "Athletics", stat: "strength", small_name: 'athletics'},
		{name: "Deception", stat: "charisma", small_name: 'deception'},
		{name: "History", stat: "intelligence", small_name: 'history'},
		{name: "Insight", stat: "wisdom", small_name: 'insight'},
		{name: "Intimidation", stat: "charisma", small_name: 'intimidation'},
		{name: "Investigation", stat: "intelligence", small_name: 'investigation'},
		{name: "Medicine", stat: "wisdom", small_name: 'medicine'},
		{name: "Nature", stat: "intelligence", small_name: 'nature'},
		{name: "Perception", stat: "wisdom", small_name: 'perception'},
		{name: "Performance", stat: "charisma", small_name: 'performance'},
		{name: "Persuasion", stat: "charisma", small_name: 'persuasion'},
		{name: "Religion", stat: "intelligence", small_name: 'religion'},
		{name: "Sleight of Hand", stat: "dexterity", small_name: 'sleight_of_hand'},
		{name: "Stealth", stat: "dexterity", small_name: 'stealth'},
		{name: "Survival", stat: "wisdom", small_name: 'survival'}
	]

	let character = {
		health: {
			current: 0,
			maximum: 10,
			temporary: 0
		},
		stats: {
			strength: 10,
			dexterity: 10,
			constitution: 10,
			wisdom: 10,
			intelligence: 10,
			charisma: 10
		},
		proficiency: 2,
		stat_mods: {
			strength: 0,
			dexterity: 0,
			constitution: 0,
			wisdom: 0,
			intelligence: 0,
			charisma: 0
		},
		saving_throws: {
			strength: {hasProf: 0, modifier: 0},
			dexterity: {hasProf: 0, modifier: 0},
			constitution: {hasProf: 0, modifier: 0},
			wisdom: {hasProf: 0, modifier: 0},
			intelligence: {hasProf: 0, modifier: 0},
			charisma: {hasProf: 0, modifier: 0}
		},
		ability_mods: {
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
	}

	// Automatically calculate character stat modifiers when the stat itself changes
	$: character.stat_mods.strength = Math.floor((character.stats.strength - 10) / 2);
	$: character.stat_mods.dexterity = Math.floor((character.stats.dexterity - 10) / 2);
	$: character.stat_mods.constitution = Math.floor((character.stats.constitution - 10) / 2);
	$: character.stat_mods.wisdom = Math.floor((character.stats.wisdom - 10) / 2);
	$: character.stat_mods.intelligence = Math.floor((character.stats.intelligence - 10) / 2);
	$: character.stat_mods.charisma = Math.floor((character.stats.charisma - 10) / 2);

	// Automatically calulate character stat saving throws when any of the following change: stat mod, proficiency, whether they have proficiency in that saving throw
	$: character.saving_throws.strength.modifier = character.stat_mods.strength + (character.proficiency * character.saving_throws.strength.hasProf);
	$: character.saving_throws.dexterity.modifier = character.stat_mods.dexterity + (character.proficiency * character.saving_throws.dexterity.hasProf);
	$: character.saving_throws.constitution.modifier = character.stat_mods.constitution + (character.proficiency * character.saving_throws.constitution.hasProf);
	$: character.saving_throws.wisdom.modifier = character.stat_mods.wisdom + (character.proficiency * character.saving_throws.wisdom.hasProf);
	$: character.saving_throws.intelligence.modifier = character.stat_mods.intelligence + (character.proficiency * character.saving_throws.intelligence.hasProf);
	$: character.saving_throws.charisma.modifier = character.stat_mods.charisma + (character.proficiency * character.saving_throws.charisma.hasProf);

	// Automatically calculate character ability modifiers when any of the following change: stat mod, proficiency type (normal, half, expertise)
	$: character.ability_mods.acrobatics.modifier = Math.floor(character.stat_mods.dexterity + (character.proficiency * character.ability_mods.acrobatics.profMult));
	$: character.ability_mods.animal_handling.modifier = Math.floor(character.stat_mods.wisdom + (character.proficiency * character.ability_mods.animal_handling.profMult));
	$: character.ability_mods.arcana.modifier = Math.floor(character.stat_mods.intelligence + (character.proficiency * character.ability_mods.arcana.profMult));
	$: character.ability_mods.athletics.modifier = Math.floor(character.stat_mods.strength + (character.proficiency * character.ability_mods.athletics.profMult));
	$: character.ability_mods.deception.modifier = Math.floor(character.stat_mods.charisma + (character.proficiency * character.ability_mods.deception.profMult));
	$: character.ability_mods.history.modifier = Math.floor(character.stat_mods.intelligence + (character.proficiency * character.ability_mods.history.profMult));
	$: character.ability_mods.insight.modifier = Math.floor(character.stat_mods.wisdom + (character.proficiency * character.ability_mods.insight.profMult));
	$: character.ability_mods.intimidation.modifier = Math.floor(character.stat_mods.charisma + (character.proficiency * character.ability_mods.intimidation.profMult));
	$: character.ability_mods.investigation.modifier = Math.floor(character.stat_mods.intelligence + (character.proficiency * character.ability_mods.investigation.profMult));
	$: character.ability_mods.medicine.modifier = Math.floor(character.stat_mods.wisdom + (character.proficiency * character.ability_mods.medicine.profMult));
	$: character.ability_mods.nature.modifier = Math.floor(character.stat_mods.intelligence + (character.proficiency * character.ability_mods.nature.profMult));
	$: character.ability_mods.perception.modifier = Math.floor(character.stat_mods.wisdom + (character.proficiency * character.ability_mods.perception.profMult));
	$: character.ability_mods.performance.modifier = Math.floor(character.stat_mods.charisma + (character.proficiency * character.ability_mods.performance.profMult));
	$: character.ability_mods.persuasion.modifier = Math.floor(character.stat_mods.charisma + (character.proficiency * character.ability_mods.persuasion.profMult));
	$: character.ability_mods.religion.modifier = Math.floor(character.stat_mods.intelligence + (character.proficiency * character.ability_mods.religion.profMult));
	$: character.ability_mods.sleight_of_hand.modifier = Math.floor(character.stat_mods.dexterity + (character.proficiency * character.ability_mods.sleight_of_hand.profMult));
	$: character.ability_mods.stealth.modifier = Math.floor(character.stat_mods.dexterity + (character.proficiency * character.ability_mods.stealth.profMult));
	$: character.ability_mods.survival.modifier = Math.floor(character.stat_mods.wisdom + (character.proficiency * character.ability_mods.survival.profMult));

	// Helper arrays to assist with the 'change proficiency type' button on character ability list.
	let proficiencyNames = ["", "*", "1/2", "2x"];
	let proficiencyValues= [0,   1,   0.5,   2];

	function changeProfType(arr, stat) {
		// Get the object-compatible name of the stat
		let statName = stat.toLowerCase().replace(/ /g, '_');

		// Find the current proficiency level
		let curProf = arr[statName].profMult
		// And go to the next one
		let index = proficiencyValues.indexOf(curProf) + 1;
		if (index >= proficiencyValues.length) index -= proficiencyValues.length;

		// Update the proficiency and label of the button
		arr[statName].profMult = proficiencyValues[index];
		arr[statName].profLabel = proficiencyNames[index];

		// Trigger an update of the character stats.
		character.proficiency = character.proficiency;
	}

	function updateHealth(amount) {
		// Subtracting health
		if (amount < 0) {
			// If we've got temporary hitpoints, take these first
			if (character.health.temporary > 0) {
				// Add the (negative) adjustment amount to our temporary health total
				character.health.temporary += amount;

				// If that brings our temporary health under 0
				if (character.health.temporary < 0) {
					// Get the leftover
					let left = Math.abs(character.health.temporary);
					// Reset temporary to 0
					character.health.temporary = 0;
					// And take the leftover from our health pool
					character.health.current -= left;
				}
			} 
			// No temporary hitpoints
			else {
				// Add the (negative) adjustment amount to our current health total
				character.health.current += amount;
			}
		}
		// We're adding health
		else {
			// Add the health
			character.health.current = character.health.current + amount;

			// Ensure we don't go over our maximum
			if (character.health.current > character.health.maximum)
				character.health.current = character.health.maximum;
		}
	}

	// Helper function to capitalise first letter of a string
	function capitalise(str) {
		return str[0].toUpperCase() + str.substring(1)
	}

</script>

<form class="charsheet">
	<header>
		<!-- PlayerDetails.svelte component! -->
		<PlayerDetails />
	</header>
	<main>
		<section>
			<section class="attributes">
				<div class="scores">
					<ul>
						{#each statlist as {name}, i}
						<li>
							<div class="score">
								<label for="{name}score">{name.toUpperCase()}</label><input name="{name}score" type="number" bind:value={character.stats[name]} placeholder="10" />
							</div>
							<div class="modifier">
								<input name="{name}mod" value="{character.stat_mods[name]}" />
							</div>
						</li>
						{/each}
					</ul>
				</div>

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
								<input name="{name}-save" type="text" bind:value="{character.saving_throws[name].modifier}" />
								<input name="{name}-prof" type="checkbox" bind:checked="{character.saving_throws[name].hasProf}" />
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
								<input name="{small_name}" type="text" bind:value="{character.ability_mods[small_name].modifier}" />
								<div class="prof_button" on:click="{e => changeProfType(character.ability_mods, small_name)}">{character.ability_mods[small_name].profLabel}</div>
							</li>
							{/each}
						</ul>
						<div class="label">
							Skills
						</div>
					</div>
				</div>
			</section>
			<div class="passive-perception box">
				<div class="label-container">
					<label for="passiveperception">Passive Wisdom (Perception)</label>
				</div>
				<input name="passiveperception" placeholder="10" />
			</div>
			<div class="otherprofs box textblock">
				<label for="otherprofs">Other Proficiencies and Languages</label><textarea name="otherprofs"></textarea>
			</div>
		</section>
		<section>
			<section class="combat">
				<div class="armorclass">
					<div>
						<label for="ac">Armor Class</label>
						<input name="ac" placeholder="10" type="text" />
					</div>
				</div>
				<div class="initiative">
					<div>
						<label for="initiative">Initiative</label>
						<input name="initiative" placeholder="+0" type="text" />
					</div>
				</div>
				<div class="speed">
					<div>
						<label for="speed">Speed</label>
						<input name="speed" placeholder="30" type="text" />
					</div>
				</div>
				<div class="hp">
					<div class="regular">
						<div class="max">
							<label for="maxhp">Hit Point Maximum</label><input name="maxhp" bind:value="{character.health.maximum}" type="number" />
						</div>
						<div class="current">
							<label for="currenthp">Current Hit Points</label>
							<div style="margin: auto;">
								<span class="hp_button" on:click="{e => updateHealth(-5)}">-5</span>
								<span class="hp_button" on:click="{e => updateHealth(-1)}">-1</span>
								<span class="hp_button" on:click="{e => updateHealth(1)}">+1</span>
								<span class="hp_button" on:click="{e => updateHealth(5)}">+5</span>
							</div>
							<input name="currenthp" type="number" bind:value="{character.health.current}" />
						</div>
					</div>
					<div class="temporary">
						<label for="temphp">Temporary Hit Points</label>
						<input name="temphp" type="number" bind:value="{character.health.temporary}" />
					</div>
				</div>
				<div class="hitdice">
					<div>
						<div class="total">
							<label for="totalhd">Total</label>
							<input name="totalhd" placeholder="2d10" type="text" />
						</div>
						<div class="remaining">
							<label for="remaininghd">Hit Dice</label>
							<input name="remaininghd" type="text" />
						</div>
					</div>
				</div>
				<div class="deathsaves">
					<div>
						<div class="label">
							<label>Death Saves</label>
						</div>
						<div class="marks">
							<div class="deathsuccesses">
								<label>Successes</label>
								<div class="bubbles">
									<input name="deathsuccess1" type="checkbox" />
									<input name="deathsuccess2" type="checkbox" />
									<input name="deathsuccess3" type="checkbox" />
								</div>
							</div>
							<div class="deathfails">
								<label>Failures</label>
								<div class="bubbles">
									<input name="deathfail1" type="checkbox" />
									<input name="deathfail2" type="checkbox" />
									<input name="deathfail3" type="checkbox" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section class="attacksandspellcasting">
				<div>
					<label>Attacks & Spellcasting</label>
					<table>
						<thead>
							<tr>
								<th>
									Name
								</th>
								<th>
									Atk Bonus
								</th>
								<th>
									Damage/Type
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<input name="atkname1" type="text" />
								</td>
								<td>
									<input name="atkbonus1" type="text" />
								</td>
								<td>
									<input name="atkdamage1" type="text" />
								</td>
							</tr>
							<tr>
								<td>
									<input name="atkname2" type="text" />
								</td>
								<td>
									<input name="atkbonus2" type="text" />
								</td>
								<td>
									<input name="atkdamage2" type="text" />
								</td>
							</tr>
							<tr>
								<td>
									<input name="atkname3" type="text" />
								</td>
								<td>
									<input name="atkbonus3" type="text" />
								</td>
								<td>
									<input name="atkdamage3" type="text" />
								</td>
							</tr>
						</tbody>
					</table>
					<textarea name="atk_spellcasting"></textarea>
				</div>
			</section>
			<section class="equipment">
				<div>
					<label for="equipment">Equipment</label>
					<div class="money">
						<ul>
							<li>
								<label for="cp">cp</label><input name="cp" />
							</li>
							<li>
								<label for="sp">sp</label><input name="sp" />
							</li>
							<li>
								<label for="ep">ep</label><input name="ep" />
							</li>
							<li>
								<label for="gp">gp</label><input name="gp" />
							</li>
							<li>
								<label for="pp">pp</label><input name="pp" />
							</li>
						</ul>
					</div>
					<textarea name="equipment" placeholder="Equipment list here"></textarea>
				</div>
			</section>
		</section>
		<section>
			<section class="flavor">
				<div class="personality">
					<label for="personality">Personality</label><textarea name="personality"></textarea>
				</div>
				<div class="ideals">
					<label for="ideals">Ideals</label><textarea name="ideals"></textarea>
				</div>
				<div class="bonds">
					<label for="bonds">Bonds</label><textarea name="bonds"></textarea>
				</div>
				<div class="flaws">
					<label for="flaws">Flaws</label><textarea name="flaws"></textarea>
				</div>
			</section>
			<section class="features">
				<div>
					<label for="features">Features & Traits</label><textarea name="features"></textarea>
				</div>
			</section>
		</section>
	</main>
</form>


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


		-webkit-user-select: none;  
		-moz-user-select: none;    
		-ms-user-select: none;      
		user-select: none;
	}

	.hp_button {
		display: inline;
		cursor: pointer;

		border: 1px solid black;

		width: 30px;
		height: 30px;

		padding: 4px;

		font-size: 14px;
		line-height: 35px;
		text-align: center;

		border-radius: 10px;


		-webkit-user-select: none;  
		-moz-user-select: none;    
		-ms-user-select: none;      
		user-select: none;
	}

	.red {
	  background: red;
	}

	.blue {
	  background: blue;
	}

	.hide {
	  display: none !important;
	}

	textarea {
	  font-size: 12px;
	  text-align: left;
	  width: calc(100% - 20px - 2px);
	  border-radius: 10px;
	  padding: 10px;
	  resize: none;
	  overflow: hidden;
	  height: 15em;
	}

	input[type=checkbox] {
	  cursor: pointer;
	}

	div.box {
	  margin-top: 10px;
	}

	form.charsheet {
	  width: 800px;
	  right: 0;
	  left: 0;
	  margin-right: auto;
	  margin-left: auto;
	  margin-top: 10px;
	}
	form.charsheet div.textblock {
	  display: flex;
	  flex-direction: column-reverse;
	  width: 100%;
	  align-items: center;
	}
	form.charsheet div.textblock label {
	  text-align: center;
	  border: 1px solid black;
	  border-top: 0;
	  font-size: 10px;
	  width: calc(100% - 20px - 2px);
	  border-radius: 0 0 10px 10px;
	  padding: 4px 0;
	  font-weight: bold;
	}
	form.charsheet div.textblock textarea {
	  border: 1px solid black;
	}
	form.charsheet ul {
	  margin: 0;
	  padding: 0;
	}
	form.charsheet ul li {
	  list-style-image: none;
	  display: block;
	}
	form.charsheet ::-moz-placeholder {
	  color: #bbb;
	}
	form.charsheet :-ms-input-placeholder {
	  color: #bbb;
	}
	form.charsheet ::placeholder {
	  color: #bbb;
	}
	form.charsheet label {
	  text-transform: uppercase;
	  font-size: 12px;
	}
	form.charsheet header {
	  display: flex;
	  align-contents: stretch;
	  align-items: stretch;
	}
	form.charsheet header section.charname {
	  border: 1px solid black;
	  border-right: 0;
	  border-radius: 10px 0 0 10px;
	  padding: 5px 0;
	  background-color: #eee;
	  width: 30%;
	  display: flex;
	  flex-direction: column-reverse;
	  bottom: 0;
	  top: 0;
	  margin: auto;
	}
	form.charsheet header section.charname input {
	  padding: 0.5em;
	  margin: 5px;
	  border: 0;
	}
	form.charsheet header section.charname label {
	  padding-left: 1em;
	}
	form.charsheet header section.misc {
	  width: 70%;
	  border: 1px solid black;
	  border-radius: 10px;
	  padding-left: 1em;
	  padding-right: 1em;
	}
	form.charsheet header section.misc ul {
	  padding: 10px 0px 5px 0px;
	  display: flex;
	  flex-wrap: wrap;
	}
	form.charsheet header section.misc ul li {
	  width: 33.33333%;
	  display: flex;
	  flex-direction: column-reverse;
	}
	form.charsheet header section.misc ul li label {
	  margin-bottom: 5px;
	}
	form.charsheet header section.misc ul li input {
	  border: 0;
	  border-bottom: 1px solid #ddd;
	}
	form.charsheet main {
	  display: flex;
	  justify-content: space-between;
	  margin-top: 20px;
	}
	form.charsheet main div.label-container {
	  position: relative;
	  width: 100%;
	  height: 18px;
	  margin-top: 6px;
	  border: 1px solid black;
	  border-left: 0;
	  text-align: center;
	}
	form.charsheet main div.label-container > label {
	  position: absolute;
	  left: 0;
	  top: 1px;
	  transform: translate(0%, 50%);
	  width: 100%;
	  font-size: 8px;
	}
	form.charsheet main > section {
	  width: 32%;
	  display: flex;
	  flex-direction: column;
	}
	form.charsheet main > section section.attributes {
	  width: 100%;
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	}
	form.charsheet main > section section.attributes div.scores {
	  width: 101px;
	  background-color: #bbb;
	  border-radius: 10px;
	  padding-bottom: 5px;
	}
	form.charsheet main > section section.attributes div.scores label {
	  font-size: 8px;
	  font-weight: bold;
	}
	form.charsheet main > section section.attributes div.scores ul {
	  display: flex;
	  flex-direction: column;
	  justify-content: space-around;
	  align-items: center;
	  height: 100%;
	}
	form.charsheet main > section section.attributes div.scores ul li {
	  height: 80px;
	  width: 70px;
	  background-color: white;
	  border: 1px solid black;
	  text-align: center;
	  display: flex;
	  flex-direction: column;
	  border-radius: 10px;
	}
	form.charsheet main > section section.attributes div.scores ul li input {
	  width: 100%;
	  padding: 0;
	  border: 0;
	}
	form.charsheet main > section section.attributes div.scores ul li div.score input {
	  text-align: center;
	  font-size: 40px;
	  padding: 2px 0px 0px 0px;
	  background: white;
	}
	form.charsheet main > section section.attributes div.scores ul li div.modifier {
	  margin-top: 3px;
	}
	form.charsheet main > section section.attributes div.scores ul li div.modifier input {
	  background: white;
	  width: 30px;
	  height: 20px;
	  border: 1px inset black;
	  border-radius: 20px;
	  margin: -1px;
	  text-align: center;
	}
	form.charsheet main > section section.attributes div.attr-applications div.inspiration {
	  display: flex;
	  flex-direction: row-reverse;
	  justify-content: flex-end;
	}
	form.charsheet main > section section.attributes div.attr-applications div.inspiration input {
	  -webkit-appearance: none;
	     -moz-appearance: none;
	          appearance: none;
	  border: 1px solid black;
	  padding: 15px;
	  border-radius: 10px;
	}
	form.charsheet main > section section.attributes div.attr-applications div.proficiencybonus {
	  display: flex;
	  flex-direction: row-reverse;
	  justify-content: flex-end;
	}
	form.charsheet main > section section.attributes div.attr-applications div.proficiencybonus input {
	  width: 30px;
	  height: 28px;
	  border: 1px solid black;
	  text-align: center;
	  border-radius: 10px;
	}
	form.charsheet main > section section.attributes div.attr-applications div.list-section {
	  border: 1px solid black;
	  border-radius: 10px;
	  padding: 10px 5px;
	}
	form.charsheet main > section section.attributes div.attr-applications div.list-section div.label {
	  margin-top: 10px;
	  margin-bottom: 2.5px;
	  text-align: center;
	  text-transform: uppercase;
	  font-size: 10px;
	  font-weight: bold;
	}
	form.charsheet main > section section.attributes div.attr-applications div.list-section ul li {
	  display: flex;
	  align-items: center;
	}
	form.charsheet main > section section.attributes div.attr-applications div.list-section ul li > * {
	  margin-left: 5px;
	}
	form.charsheet main > section section.attributes div.attr-applications div.list-section ul li label {
	  text-transform: none;
	  font-size: 8px;
	  text-align: left;
	  order: 3;
	}
	form.charsheet main > section section.attributes div.attr-applications div.list-section ul li label span.skill {
	  color: #bbb;
	}
	form.charsheet main > section section.attributes div.attr-applications div.list-section ul li input[type=text] {
	  width: 30px;
	  font-size: 12px;
	  text-align: center;
	  border: 0;
	  border-bottom: 1px solid black;
	  order: 2;
	}
	form.charsheet main > section section.attributes div.attr-applications div.list-section ul li input[type=checkbox] {
	  -webkit-appearance: none;
	     -moz-appearance: none;
	          appearance: none;
	  width: 10px;
	  height: 10px;
	  border: 1px solid black;
	  border-radius: 10px;
	  order: 1;
	}
	form.charsheet main > section section.attributes div.attr-applications div.list-section ul li input[type=checkbox]:checked {
	  background-color: black;
	}
	form.charsheet main > section div.passive-perception {
	  display: flex;
	  flex-direction: row-reverse;
	  justify-content: flex-end;
	}
	form.charsheet main > section div.passive-perception input {
	  width: 30px;
	  height: 28px;
	  text-align: center;
	  border: 1px solid black;
	  border-radius: 10px;
	}
	form.charsheet main > section div.otherprofs textarea {
	  height: 26em;
	}
	form.charsheet main section.combat {
	  background-color: #eee;
	  display: flex;
	  flex-wrap: wrap;
	  border-radius: 10px;
	}
	form.charsheet main section.combat > div {
	  overflow: hidden;
	}
	form.charsheet main section.combat > div.armorclass, form.charsheet main section.combat > div.initiative, form.charsheet main section.combat > div.speed {
	  flex-basis: 33.333%;
	}
	form.charsheet main section.combat > div.armorclass > div, form.charsheet main section.combat > div.initiative > div, form.charsheet main section.combat > div.speed > div {
	  display: flex;
	  flex-direction: column-reverse;
	  align-items: center;
	  margin-top: 10px;
	}
	form.charsheet main section.combat > div.armorclass > div label, form.charsheet main section.combat > div.initiative > div label, form.charsheet main section.combat > div.speed > div label {
	  font-size: 8px;
	  width: 50px;
	  border: 1px solid black;
	  border-top: 0;
	  background-color: white;
	  text-align: center;
	  padding-top: 5px;
	  padding-bottom: 5px;
	  border-radius: 0 0 10px 10px;
	  margin-top: -18px;
	}
	form.charsheet main section.combat > div.armorclass > div input, form.charsheet main section.combat > div.initiative > div input, form.charsheet main section.combat > div.speed > div input {
	  height: 70px;
	  width: 70px;
	  border-radius: 10px;
	  border: 1px solid black;
	  text-align: center;
	  font-size: 30px;
	}
	form.charsheet main section.combat > div.hp {
	  flex-basis: 100%;
	}
	form.charsheet main section.combat > div.hp > div.regular {
	  background-color: white;
	  border: 1px solid black;
	  margin: 10px;
	  margin-bottom: 5px;
	  border-radius: 10px 10px 0 0;
	}
	form.charsheet main section.combat > div.hp > div.regular > div.max {
	  display: flex;
	  justify-content: space-around;
	  align-items: baseline;
	}
	form.charsheet main section.combat > div.hp > div.regular > div.max label {
	  font-size: 10px;
	  text-transform: none;
	  color: #bbb;
	}
	form.charsheet main section.combat > div.hp > div.regular > div.max input {
	  width: 40%;
	  border: 0;
	  border-bottom: 1px solid #ddd;
	  font-size: 12px;
	  text-align: center;
	}
	form.charsheet main section.combat > div.hp > div.regular > div.current {
	  display: flex;
	  flex-direction: column-reverse;
	}
	form.charsheet main section.combat > div.hp > div.regular > div.current input {
	  border: 0;
	  width: 100%;
	  padding: 1em 0;
	  font-size: 20px;
	  text-align: center;
	}
	form.charsheet main section.combat > div.hp > div.regular > div.current label {
	  font-size: 10px;
	  padding-bottom: 5px;
	  text-align: center;
	  font-weight: bold;
	}
	form.charsheet main section.combat > div.hp > div.temporary {
	  margin: 10px;
	  margin-top: 0;
	  border: 1px solid black;
	  border-radius: 0 0 10px 10px;
	  display: flex;
	  flex-direction: column-reverse;
	  background-color: white;
	}
	form.charsheet main section.combat > div.hp > div.temporary input {
	  padding: 1em 0;
	  font-size: 20px;
	  border: 0;
	  text-align: center;
	}
	form.charsheet main section.combat > div.hp > div.temporary label {
	  font-size: 10px;
	  padding-bottom: 5px;
	  text-align: center;
	  font-weight: bold;
	}
	form.charsheet main section.combat > div.hitdice, form.charsheet main section.combat > div.deathsaves {
	  flex: 1 50%;
	  height: 100px;
	}
	form.charsheet main section.combat > div.hitdice > div, form.charsheet main section.combat > div.deathsaves > div {
	  height: 80px;
	}
	form.charsheet main section.combat > div.hitdice > div {
	  background-color: white;
	  margin: 10px;
	  border: 1px solid black;
	  border-radius: 10px;
	  display: flex;
	  flex-direction: column;
	}
	form.charsheet main section.combat > div.hitdice > div > div.total {
	  display: flex;
	  align-items: baseline;
	  justify-content: space-around;
	  padding: 5px 0;
	}
	form.charsheet main section.combat > div.hitdice > div > div.total label {
	  font-size: 10px;
	  color: #bbb;
	  margin: 0.25em;
	  text-transform: none;
	}
	form.charsheet main section.combat > div.hitdice > div > div.total input {
	  font-size: 12px;
	  flex-grow: 1;
	  border: 0;
	  border-bottom: 1px solid #ddd;
	  width: 50%;
	  margin-right: 0.25em;
	  padding: 0 0.25em;
	  text-align: center;
	}
	form.charsheet main section.combat > div.hitdice > div > div.remaining {
	  flex: 1;
	  display: flex;
	  flex-direction: column-reverse;
	}
	form.charsheet main section.combat > div.hitdice > div > div.remaining label {
	  text-align: center;
	  padding: 2px;
	  font-size: 10px;
	}
	form.charsheet main section.combat > div.hitdice > div > div.remaining input {
	  text-align: center;
	  border: 0;
	  flex: 1;
	}
	form.charsheet main section.combat > div.deathsaves > div {
	  margin: 10px;
	  background: white;
	  border: 1px solid black;
	  border-radius: 10px;
	  display: flex;
	  flex-direction: column-reverse;
	}
	form.charsheet main section.combat > div.deathsaves > div > div.label {
	  text-align: center;
	}
	form.charsheet main section.combat > div.deathsaves > div > div.label label {
	  font-size: 10px;
	}
	form.charsheet main section.combat > div.deathsaves > div > div.marks {
	  display: flex;
	  flex: 1;
	  flex-direction: column;
	  justify-content: center;
	}
	form.charsheet main section.combat > div.deathsaves > div > div.marks div.deathsuccesses, form.charsheet main section.combat > div.deathsaves > div > div.marks div.deathfails {
	  display: flex;
	  align-items: center;
	}
	form.charsheet main section.combat > div.deathsaves > div > div.marks div.deathsuccesses label, form.charsheet main section.combat > div.deathsaves > div > div.marks div.deathfails label {
	  font-size: 8px;
	  text-align: right;
	  flex: 1 50%;
	}
	form.charsheet main section.combat > div.deathsaves > div div.bubbles {
	  flex: 1 40%;
	  margin-left: 5px;
	}
	form.charsheet main section.combat > div.deathsaves > div div.bubbles input[type=checkbox] {
	  -webkit-appearance: none;
	     -moz-appearance: none;
	          appearance: none;
	  width: 10px;
	  height: 10px;
	  border: 1px solid black;
	  border-radius: 10px;
	}
	form.charsheet main section.combat > div.deathsaves > div div.bubbles input[type=checkbox]:checked {
	  background-color: black;
	}
	form.charsheet main section.attacksandspellcasting {
	  border: 1px solid black;
	  border-radius: 10px;
	  margin-top: 10px;
	}
	form.charsheet main section.attacksandspellcasting > div {
	  margin: 10px;
	  display: flex;
	  flex-direction: column;
	}
	form.charsheet main section.attacksandspellcasting > div > label {
	  order: 3;
	  text-align: center;
	}
	form.charsheet main section.attacksandspellcasting > div > table {
	  width: 100%;
	}
	form.charsheet main section.attacksandspellcasting > div > table th {
	  font-size: 10px;
	  color: #ddd;
	}
	form.charsheet main section.attacksandspellcasting > div > table input {
	  width: calc(100% - 4px);
	  border: 0;
	  background-color: #eee;
	  font-size: 10px;
	  padding: 3px;
	}
	form.charsheet main section.attacksandspellcasting > div textarea {
	  border: 0;
	}
	form.charsheet main section.equipment {
	  border: 1px solid black;
	  border-radius: 10px;
	  margin-top: 10px;
	}
	form.charsheet main section.equipment > div {
	  padding: 10px;
	  display: flex;
	  flex-direction: row;
	  flex-wrap: wrap;
	}
	form.charsheet main section.equipment > div > div.money ul {
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between;
	  height: 100%;
	}
	form.charsheet main section.equipment > div > div.money ul > li {
	  display: flex;
	  align-items: center;
	}
	form.charsheet main section.equipment > div > div.money ul > li label {
	  border: 1px solid black;
	  border-radius: 10px 0 0 10px;
	  border-right: 0;
	  width: 20px;
	  font-size: 8px;
	  text-align: center;
	  padding: 3px 0;
	}
	form.charsheet main section.equipment > div > div.money ul > li input {
	  border: 1px solid black;
	  border-radius: 10px;
	  width: 40px;
	  padding: 10px 3px;
	  font-size: 12px;
	  text-align: center;
	}
	form.charsheet main section.equipment > div > label {
	  order: 3;
	  text-align: center;
	  flex: 100%;
	}
	form.charsheet main section.equipment > div > textarea {
	  flex: 1;
	  border: 0;
	}
	form.charsheet main section.flavor {
	  padding: 10px;
	  background: #bbb;
	  border-radius: 10px;
	}
	form.charsheet main section.flavor div {
	  background: white;
	  display: flex;
	  flex-direction: column-reverse;
	  padding: 5px;
	  border: 1px solid black;
	}
	form.charsheet main section.flavor div label {
	  text-align: center;
	  font-size: 10px;
	  margin-top: 3px;
	}
	form.charsheet main section.flavor div textarea {
	  border: 0;
	  border-radius: 0;
	  height: 4em;
	}
	form.charsheet main section.flavor div:first-child {
	  border-radius: 10px 10px 0 0;
	}
	form.charsheet main section.flavor div:not(:first-child) {
	  margin-top: 10px;
	}
	form.charsheet main section.flavor div:last-child {
	  border-radius: 0 0 10px 10px;
	}
	form.charsheet main section.features {
	  padding: 10px;
	}
	form.charsheet main section.features div {
	  padding: 10px;
	  border: 1px solid black;
	  border-radius: 10px;
	  display: flex;
	  flex-direction: column-reverse;
	}
	form.charsheet main section.features div label {
	  text-align: center;
	}
	form.charsheet main section.features div textarea {
	  border: 0;
	  padding: 5px;
	  height: 43em;
	}
</style>