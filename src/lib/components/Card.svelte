<script lang="ts">
  let { back, flipped, front, handleChoice, index } = $props();
</script>

<button
  type="button"
  class="card aspect-square outline-none perspective-[100rem]"
  onclick={() => handleChoice(index)}
>
  <div
    class="relative size-full transition duration-500 transform-3d"
    class:rotate-y-180={flipped}
  >
    <div
      class="front absolute inset-0 size-full overflow-hidden rounded-2xl border-4 backface-hidden"
    >
      <img src={back} alt="Card back" />
    </div>
    <div
      class="front absolute inset-0 size-full rotate-y-180 overflow-hidden rounded-2xl border-4 bg-gray-300 backface-hidden sm:p-4"
    >
      <img src={front} alt="Card front" />
    </div>
  </div>
</button>
