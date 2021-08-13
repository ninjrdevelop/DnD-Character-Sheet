<script>
	export let character = {};
</script>

<section class="charname">
	<label for="charname">Character Name</label><input id="charname" name="charname" value="{character.charname}"/>
</section>

<section class="misc">
	<ul>
		<li>
			<label for="classlevel">Class & Level</label>
			<input id="class" name="class" value="{character.charclass + " " + character.level}"/>
		</li>
		<li>
			<label for="background">Background</label><input id="background" name="background" value="{character.background}"/>
		</li>
		<li>
			<label for="playername">Player Name</label><input id="playername" name="playername">
		</li>
		<li>
			<label for="race">Race</label><input name="race" id="race" value="{character.race}" />
		</li>
		<li>
			<label for="alignment">Alignment</label><input name="alignment" value="{character.alignment}" />
		</li>
		<li>
			<label for="experiencepoints">Experience Points</label><input name="experiencepoints" value="{character.experience}"/>
		</li>
	</ul>
</section>

<style>
	
	section.charname {
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
	section.charname input {
		padding: 0.5em;
		margin: 5px;
		border: 0;
	}
	section.charname label {
		padding-left: 1em;
	}
	section.misc {
		width: 70%;
		border: 1px solid black;
		border-radius: 10px;
		padding-left: 1em;
		padding-right: 1em;
	}
	section.misc ul {
		padding: 10px 0px 5px 0px;
		display: flex;
		flex-wrap: wrap;
	}
	section.misc ul li {
		width: 33.33333%;
		display: flex;
		flex-direction: column-reverse;
	}
	section.misc ul li label {
		margin-bottom: 5px;
	}
	section.misc ul li input {
		border: 0;
		border-bottom: 1px solid #ddd;
	}

</style>