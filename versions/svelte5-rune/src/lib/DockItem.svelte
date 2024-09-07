<script lang="ts">
	import { interpolate } from 'popmotion';
	import type { AppID } from '../types';
	import { spring } from 'svelte/motion';
	import { untrack } from 'svelte';

	const {
		appID,
		mouseX,
	}: {
		appID: AppID;
		mouseX: number | null;
	} = $props();

	let el = $state<HTMLImageElement>();

	const baseWidth = 57.6;
	const distanceLimit = baseWidth * 6;
	const beyondTheDistanceLimit = distanceLimit + 1;
	const distanceInput = [
		-distanceLimit,
		-distanceLimit / 1.25,
		-distanceLimit / 2,
		0,
		distanceLimit / 2,
		distanceLimit / 1.25,
		distanceLimit,
	];
	const widthOutput = [
		baseWidth,
		baseWidth * 1.1,
		baseWidth * 1.618,
		baseWidth * 2.618,
		baseWidth * 1.618,
		baseWidth * 1.1,
		baseWidth,
	];

	let distance = $state(beyondTheDistanceLimit);

	const widthPX = spring(baseWidth, {
		damping: 0.38,
		stiffness: 0.1,
	});

	$effect(() => {
		distance;
		untrack(() => {
			$widthPX = interpolate(distanceInput, widthOutput)(distance);
		});
	});

	const width = $derived(`${$widthPX / 16}rem`);

	function animate(mouseX: number) {
		if (el && mouseX !== null) {
			const rect = el.getBoundingClientRect();

			// get the x coordinate of the img DOMElement's center
			// the left x coordinate plus the half of the width
			const imgCenterX = rect.left + rect.width / 2;

			// difference between the x coordinate value of the mouse pointer
			// and the img center x coordinate value
			const distanceDelta = mouseX - imgCenterX;
			distance = distanceDelta;
			return;
		}

		distance = beyondTheDistanceLimit;
	}

	$effect(() => {
		mouseX;
		requestAnimationFrame(() => animate(mouseX));
	});
</script>

<section>
	<button class="dock-button">
		<img
			bind:this={el}
			class="app-icon"
			src="/app-icons/{appID}/256.png"
			alt=""
			style="width: {width};"
		/>
	</button>
</section>

<style>
	.dock-button {
		height: 100%;
		width: auto !important;

		cursor: default !important;

		transition: all 200ms ease-in;

		transform-origin: bottom;

		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	button {
		color: inherit;
		text-decoration: none;
		vertical-align: middle;

		border: 0;
		border-radius: 0;

		outline: 0;

		margin: 0;
		padding: 0;

		display: inline-flex;
		align-items: center;
		justify-content: center;

		position: relative;

		user-select: none;

		appearance: none;

		background-color: transparent;

		-webkit-tap-highlight-color: transparent;

		&:not(:disabled) {
			cursor: pointer;
		}
	}

	.app-icon {
		width: 57.6px;
		height: auto;
	}
</style>
