<script>
	import { createEventDispatcher } from 'svelte';

	export let statlist = {};
	export let stats = {};
	export let stat_mods = {};

	console.log(statlist);
</script>

<div class="scores">
	<ul>
		{#each statlist as {name}, i}
		<li>
			<div class="score">
				<label for="{name}score">{name.toUpperCase()}</label><input name="{name}score" type="number" bind:value={stats[name]} placeholder="10" />
			</div>
			<div class="modifier">
				<input name="{name}mod" value="{stat_mods[name]}" />
			</div>
		</li>
		{/each}
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