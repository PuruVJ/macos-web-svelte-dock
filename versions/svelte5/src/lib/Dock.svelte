<script lang="ts">
	import type { AppID } from 'src/types';
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

	let mouseX: number | null = null;
</script>

<section class="dock-container">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="dock-el"
		on:mousemove={(event) => (mouseX = event.x)}
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
