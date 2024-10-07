<script lang="ts">
	import type { AppID } from '../types';
	import DockItem from './DockItem.svelte';

	const apps: AppID[] = [
		'calendar',
		'facetime',
		'finder',
		'launchpad',
		'mail',
		'maps',
		'messages',
		'photos',
		'purus-twitter',
		'safari',
		'system-preferences',
		'view-source',
	];

	let mouseX = $state<number | null>(null);
</script>

<section class="dock-container">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- Leaving this as on: cuz Svelte LSP is just freaking out -->
	<div
		class="dock-el"
		on:mousemove={(event) => {
			console.log(12);
			mouseX = event.x;
		}}
		on:mouseleave={() => (mouseX = null)}
	>
		{#each apps as appID}
			<DockItem {mouseX} {appID} />
		{/each}
	</div>
</section>

<style>
	.dock-container {
		margin-bottom: 0.3rem;
		left: 0;
		bottom: 0;
		z-index: 9900;
		position: fixed;

		width: 100%;
		height: 5rem;

		padding: 0.4rem;

		display: flex;
		justify-content: center;
	}

	.dock-el {
		backdrop-filter: blur(5px);
		background-color: hsla(240, 3%, 11%, 0.4);

		box-shadow:
			inset 0 0 0 0.2px rgb(245 245 245 / 70%),
			hsla(0, 0%, 0%, 0.3) 2px 5px 19px 7px;

		padding: 0.3rem;

		border-radius: 1.2rem;

		height: 100%;

		display: flex;
		align-items: flex-end;
	}
</style>
