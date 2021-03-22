<script lang="ts">
  import Dock from "./lib/Dock.svelte";
</script>

<main>
  <Dock />
</main>

<style lang="scss">
  main {
    max-width: 100vw;
    height: 100vh;

    background: url("/wallpaper.jpg");
    background-size: cover;
    background-position: center center;
  }
</style>
