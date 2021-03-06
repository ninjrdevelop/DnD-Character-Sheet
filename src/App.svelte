<script>
	// Import common functions
	import { getQueryVariable } from '.\\lib\\common.js';

	// Database imports
	import ApolloClient from 'apollo-client';
	import { client } from '.\\lib\\db.js';
	// import { fetchGetCharacter, executeUpdateCharacter } from '.\\lib\\db.js';
	import gql from 'graphql-tag';

	// Normal Imports
	import { attributes, skillAttributes, skillLevels } from '.\\lib\\CharacterConstants.js';
	import Character5e from '.\\lib\\Character5e.js';

	// Svelte Imports
	import PlayerDetails from '.\\PlayerDetails.svelte';

	// Create our character
	let character = new Character5e({key: 'asdf'});

	let loadingCharacter = true;
	let loadingMessage = "Loading Character";

	let characterID = getQueryVariable('charID');

	client.addQuery("getCharacter", {
		query: `
			query GetCharacter {
				characters(where: {id: {_eq: "$characterID"}}) {
					id
					character_data
					character_name
				}
			}
		`
	}, true)
	client.addQuery("updateCharacter", {
		query: `
			mutation UpdateCharacter {
				update_characters(where: {id: {_eq: "$characterID"}}, _set: {character_data: "$characterData"}){
					returning {
						character_data
						character_name
						id
					}
				}
			}
		`
	}, true);
	client.addQuery("addCharacter", {
		query: `
			mutation AddCharacter {
				insert_characters_one(object: {character_data: "$characterData", character_name: "asdf"}) {
					id
    				character_data
				}
			}
		`
	})

	let saveDelay = 2000;
	let fullSaveDelay = 60000;

	function loadCharacter() {
		client.query("getCharacter", {characterID: characterID})
				.then((data) => {
					console.log('Character loaded');
					let charData = data.data.characters[0].character_data.replace(/\\\"/g, "\"");
					charData = JSON.parse(charData);

					character = new Character5e(charData);
					loadingCharacter = false;
				});
	}
	function saveCharacter(force = false) {
		// Set next timer
		if (!force) setTimeout(saveCharacter, saveDelay);
		else setTimeout(function() { saveCharacter(true); }, fullSaveDelay);

		if ((!loadingCharacter && character.dirty) || force) {
			console.log('Character dirty! Saving');
			let data = character.toJSON();
			loadingCharacter = true;
			loadingMessage = "Saving Character";
	
			let q = client.query("updateCharacter", {
				characterID: characterID,
				characterData: JSON.stringify(data)
			}).then((res) => loadingCharacter = false);
	
			return true;
		}
	}
	function newCharacter() {
		console.log('Attemping to create new character');
		client.query('addCharacter', {
			characterData: JSON.stringify(new Character5e({key: 'asdf'}).toJSON())
		}).then((res) => {
			console.log(res);

			characterID = res.data.insert_characters_one.id;
			let characterData = res.data.insert_characters_one.character_data;

			character = new Character5e(characterData);
		})
	}

	// Timers to automatically save the current character
	setTimeout(saveCharacter, saveDelay);
	setTimeout(function() { saveCharacter(true); }, fullSaveDelay);

	// Get the current character.
	loadCharacter();


	// Helper arrays to assist with the 'change proficiency type' button on character ability list.
	let proficiencyNames = {}
	proficiencyNames[skillLevels.UNSKILLED] = "";
	proficiencyNames[skillLevels.PROFICIENT] = "*"; 
	proficiencyNames[skillLevels.EXPERT] = "2x";

	function changeProfType(skill) {
		// Get and increment current proficiency level by 1
		let prof = character.getSkill(skill) + 1;
		// Ensure we don't go over Expertise
		if (prof > skillLevels.EXPERT) prof = 0;
		// Update the character with the new skill level
		character.setSkill(skill, prof);
	}

	// Helper function to capitalise first letter of a string
	function capitalise(str) {
		return str[0].toUpperCase() + str.substring(1);
	}

	// Helper function to make skill names human readable
	function humanReadable(str) {
		return str.replace(/_/g, ' ');
	}

</script>

<form class="charsheet">
	{#if loadingCharacter}
		<div class="center">
			<div class="loader"></div>
			<h2>{loadingMessage}</h2>
		</div>
	{/if}
	<div id="menu">
		<button on:click|preventDefault={e => newCharacter()}>New Character</button>
	</div>
	<header>
		<!-- PlayerDetails.svelte component! -->
		<PlayerDetails character={character}/>
	</header>
	<main>
		<section>
			<section class="attributes">
				<div class="scores">
					<ul>
						{#each Object.keys(attributes) as name}
						<li>
							<div class="score">
								<label for="{name}score">{name}</label><input name="{name}score" type="number" bind:value={character[attributes[name].substr(1)]} placeholder="10" />
							</div>
							<div class="modifier">
								<input name="{name}mod" type="text" disabled value="{character.attributeModRaw(attributes[name])}" />
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
						<input name="proficiencybonus" disabled value={character.proficiencyRaw} />
					</div>
					<div class="saves list-section box">
						<ul>
							{#each Object.keys(attributes) as name}
							<li>
								<label for="{name}-save">{capitalise(name)}</label>
								<input name="{name}-save" type="text" disabled value="{character.saveMod(attributes[name])}" />
								<input name="{name}-prof" type="checkbox" bind:checked="{character.saves[attributes[name]]}" on:click="{character.dirty = true}" />
							</li>
							{/each}
						</ul>
						<div class="label">
							Saving Throws
						</div>
					</div>
					<div class="skills list-section box">
						<ul>
							{#each Object.keys(skillAttributes) as name}
							<li>
								<label for="{skillAttributes[name]}">{humanReadable(name).toUpperCase()} <span class="skill">({capitalise(skillAttributes[name])})</span></label>
								<input name="{skillAttributes[name]}" disabled type="text" value="{character.getSkillMod(name)}" />
								<div class="prof_button" on:click="{e => {changeProfType(name); character=character;}}">{proficiencyNames[character.getSkill(name)]}</div>
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
				<input name="passiveperception" disabled value="{character.passivePerception}" />
			</div>
			<div class="otherprofs box textblock">
				<label for="otherprofs">Other Proficiencies and Languages</label><textarea name="otherprofs" value="{character.proficiencies_other}" on:change={() => character.dirty = true}></textarea>
			</div>
		</section>
		<section>
			<section class="combat">
				<div class="armorclass">
					<div>
						<label for="ac">Armor Class</label>
						<input name="ac" value="{character.armor_class}" on:change={() => character.dirty = true} type="text" />
					</div>
				</div>
				<div class="initiative">
					<div>
						<label for="initiative">Initiative</label>
						<input name="initiative" disabled bind:value="{character.initiative}" type="text" />
					</div>
				</div>
				<div class="speed">
					<div>
						<label for="speed">Speed</label>
						<input name="speed" value="{character.speed}" type="text" on:change={() => character.dirty = true} />
					</div>
				</div>
				<div class="hp">
					<div class="regular">
						<div class="max">
							<label for="maxhp">Hit Point Maximum</label><input name="maxhp" bind:value="{character.health.maximum}" on:change={() => character.dirty = true} type="number" />
						</div>
						<div class="current">
							<label for="currenthp">Current Hit Points</label>
							<div style="margin: auto;">
								<span class="hp_button" on:click="{e => {character.updateHealth(-5); character.health = character.health}}">-5</span>
								<span class="hp_button" on:click="{e => {character.updateHealth(-1); character.health = character.health}}">-1</span>
								<span class="hp_button" on:click="{e => {character.updateHealth(1); character.health = character.health}}">+1</span>
								<span class="hp_button" on:click="{e => {character.updateHealth(5); character.health = character.health}}">+5</span>
								<span class="hp_button">
									<input class="hp_custom" name="hp_custom" type="number" on:keyup="{e => {if (e.keyCode === 13) {character.updateHealth(parseInt(e.target.value)); character.health = character.health}
									}}" />
								</span>
							</div>
							<input name="currenthp" type="number" bind:value="{character.hp}" />
						</div>
					</div>
					<div class="temporary">
						<label for="temphp">Temporary Hit Points</label>
						<input name="temphp" type="number" bind:value="{character.health.temporary}" on:change={() => character.dirty = true} />
					</div>
				</div>
				<div class="hitdice">
					<div>
						<div class="total">
							<label for="totalhd">Total</label>
							<input name="totalhd" value="{character.hd_max + " " + character.hd_type}" type="text" disabled />
						</div>
						<div class="remaining">
							<label for="remaininghd">Hit Dice</label>
							<input name="remaininghd" type="number" value="{character.hd_cur}" on:change={() => character.dirty = true} />
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
									<input name="deathsuccess1" type="checkbox" checked={character.deathSave.success > 0 ? true : false} on:click={(e) => {character.toggleDeathSuccess(e.target.checked)}} />
									<input name="deathsuccess2" type="checkbox" checked={character.deathSave.success > 1 ? true : false} on:click={(e) => {character.toggleDeathSuccess(e.target.checked)}} />
									<input name="deathsuccess3" type="checkbox" checked={character.deathSave.success > 2 ? true : false} on:click={(e) => {character.toggleDeathSuccess(e.target.checked)}} />
								</div>
							</div>
							<div class="deathfails">
								<label>Failures</label>
								<div class="bubbles">
									<input name="deathfail1" type="checkbox" checked={character.deathSave.fail > 0 ? true : false} on:click={(e) => {character.toggleDeathFail(e.target.checked)}} />
									<input name="deathfail2" type="checkbox" checked={character.deathSave.fail > 1 ? true : false} on:click={(e) => {character.toggleDeathFail(e.target.checked)}} />
									<input name="deathfail3" type="checkbox" checked={character.deathSave.fail > 2 ? true : false} on:click={(e) => {character.toggleDeathFail(e.target.checked)}} />
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
								<label for="cp">cp</label><input name="cp" value="{character.cp}" on:change={() => character.dirty = true}/>
							</li>
							<li>
								<label for="sp">sp</label><input name="sp" value="{character.sp}" on:change={() => character.dirty = true} />
							</li>
							<li>
								<label for="gp">gp</label><input name="gp" value="{character.gp}" on:change={() => character.dirty = true} />
							</li>
							<li>
								<label for="pp">pp</label><input name="pp" value="{character.pp}" on:change={() => character.dirty = true} />
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
					<label for="personality">Personality</label><textarea name="personality" value="{character.personality}" on:change={() => character.dirty = true}></textarea>
				</div>
				<div class="ideals">
					<label for="ideals">Ideals</label><textarea name="ideals" value="{character.ideals}" on:change={() => character.dirty = true}></textarea>
				</div>
				<div class="bonds">
					<label for="bonds">Bonds</label><textarea name="bonds" value="{character.bonds}" on:change={() => character.dirty = true}></textarea>
				</div>
				<div class="flaws">
					<label for="flaws">Flaws</label><textarea name="flaws" value="{character.flaws}" on:change={() => character.dirty = true}></textarea>
				</div>
			</section>
			<section class="features">
				<div>
					<label for="features">Features & Traits</label><textarea name="features" value="{character.features}" on:change={() => character.dirty = true}></textarea>
				</div>
			</section>
		</section>
	</main>
</form>


<style>
	html, body {
		height: 100%;
	}
	#menu {
		position: absolute;
		top: 0px;
		left: 0px;
		padding:  8px;
	}
	.center {
		margin: auto;
		position: absolute;
		text-align: center;
		top: calc(50% - 60px);
		left: calc(50% - 60px);
		width: 10%;  
		z-index: 9001;
	}
	.loader {
		border: 16px solid #f3f3f3; /* Light grey */
		border-top: 16px solid #3498db; /* Blue */
		border-radius: 50%;
		width: 60px;
		height: 60px;
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
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

	.hp_custom {
		display: inline;
		width: 60px !important;
		padding:  2px !important;
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

	  margin-top: 0px;
	  margin-bottom:  0px;
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
	  margin-top: 5px;
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
	  width: 45px;
	  border: 1px solid black;
	  border-top: 0;
	  background-color: white;
	  text-align: center;
	  padding-top: 5px;
	  padding-bottom: 5px;
	  border-radius: 0 0 10px 10px;
	  /*margin-top: -18px;*/
	}
	form.charsheet main section.combat > div.armorclass > div input, form.charsheet main section.combat > div.initiative > div input, form.charsheet main section.combat > div.speed > div input {
	  height: 44px;
	  width: 60px;
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
	  padding: 6px;
	}
	form.charsheet main section.combat > div.hp > div.regular > div.current {
	  display: flex;
	  flex-direction: column-reverse;
	}
	form.charsheet main section.combat > div.hp > div.regular > div.current input {
	  border: 0;
	  width: 100%;
	  padding: 0.5em 0;
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
	  margin-bottom:  0px;
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

