<script lang="ts">
  import { interpolate } from "popmotion";
  import type { AppID } from "src/types";
  import { spring } from "svelte/motion";
  import ButtonBase from "./ButtonBase.svelte";

  /** Block 1 */

  export let appID: AppID;
  export let mouseX: number | null;

  let el: HTMLImageElement;

  /** Block 2 */

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

  let distance = beyondTheDistanceLimit;

  const widthPX = spring(baseWidth, {
    damping: 0.38,
    stiffness: 0.1,
  });

  $: $widthPX = interpolate(distanceInput, widthOutput)(distance);

  let width: string;
  $: width = `${$widthPX / 16}rem`;

  /** Block 3 */

  let raf: number;

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

  $: raf = requestAnimationFrame(() => animate(mouseX));
</script>

<section>
  <ButtonBase class="dock-button">
    <img
      bind:this={el}
      class="app-icon"
      src="/app-icons/{appID}/256.png"
      alt=""
      style="width: {width};"
    />
  </ButtonBase>
</section>

<style lang="scss">
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

  .app-icon {
    width: 57.6px;
    height: auto;
  }
</style>
