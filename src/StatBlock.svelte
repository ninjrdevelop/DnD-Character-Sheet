<script>
	console.log('wtf');
	import { createEventDispatcher } from 'svelte';

	export let stats = {};
	export let stat_mods = {};
</script>

<div class="scores">
	<ul>
		<li>
			<div class="score">
				<label for="strengthscore">Strength</label><input name="strengthscore" type="number" bind:value={stats.strength} placeholder="10" />
			</div>
			<div class="modifier">
				<input name="strengthmod" value="{stat_mods.strength}" />
			</div>
		</li>
		<li>
			<div class="score">
				<label for="dexterityscore">Dexterity</label><input name="dexterityscore" type="number" bind:value={stats.dexterity} placeholder="10" />
			</div>
			<div class="modifier">
				<input name="dexteritymod" value="{stat_mods.dexterity}" />
			</div>
		</li>
		<li>
			<div class="score">
				<label for="constitutionscore">Constitution</label><input name="constitutionscore" type="number" bind:value={stats.constitution} placeholder="10" />
			</div>
			<div class="modifier">
				<input name="constitutionmod" value="{stat_mods.constitution}" />
			</div>
		</li>
		<li>
			<div class="score">
				<label for="wisdomscore">Wisdom</label><input name="wisdomscore" placeholder="10" type="number" bind:value={stats.wisdom} />
			</div>
			<div class="modifier">
				<input name="wisdommod" value="{stat_mods.wisdom}" />
			</div>
		</li>
		<li>
			<div class="score">
				<label for="intelligencescore">Intelligence</label><input name="intelligencescore" type="number" bind:value={stats.intelligence} placeholder="10" />
			</div>
			<div class="modifier">
				<input name="intelligencemod" value="{stat_mods.intelligence}" />
			</div>
		</li>
		<li>
			<div class="score">
				<label for="charismascore">Charisma</label><input name="charismascore" type="number" bind:value={stats.charisma} placeholder="10" />
			</div>
			<div class="modifier">
				<input name="charismamod" value="{stat_mods.charisma}" />
			</div>
		</li>
	</ul>
</div>

<style>
	div.scores {
		width: 101px;
		background-color: #bbb;
		border-radius: 10px;
		padding-bottom: 5px;
	}
	div.scores label {
		font-size: 8px;
		font-weight: bold;
	}
	div.scores ul {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 100%;
	}
	div.scores ul li {
		height: 80px;
		width: 70px;
		background-color: white;
		border: 1px solid black;
		text-align: center;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
	}
	div.scores ul li input {
		width: 100%;
		padding: 0;
		border: 0;
	}
	div.scores ul li div.score input {
		text-align: center;
		font-size: 40px;
		padding: 2px 0px 0px 0px;
		background: white;
	}
	div.scores ul li div.modifier {
		margin-top: 3px;
	}
	div.scores ul li div.modifier input {
		background: white;
		width: 30px;
		height: 20px;
		border: 1px inset black;
		border-radius: 20px;
		margin: -1px;
		text-align: center;
	}
</style>