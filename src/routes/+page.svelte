<script lang="ts">
  import CardComponent from "$lib/components/Card.svelte";
  import { shuffle } from "$lib/utils";

  // Define a card type with properties.
  type Card = {
    image: string;
    flipped: boolean;
  };

  // Reactive state containing card image file paths.
  let choiceOne: number | null = $state(null);
  let choiceTwo: number | null = $state(null);

  let cards: Card[] = $state([]);

  let paused = false;

  let turns = $state(0);

  // Import card front and back images dynamically.

  // This will load any files that are in the /src/lib/assets/backs directory.
  // Make sure there is one image file in there and nothing else.
  const backImage = Object.values(
    import.meta.glob<{ default: string }>("$lib/assets/backs/*", {
      eager: true,
    }),
  ).map((m) => m.default)[0];

  // This will load any files that are in the /src/lib/assets/cards directory.
  // Make sure there are at least six image files in there and nothing else.
  const availableCardImages = Object.values(
    import.meta.glob<{ default: string }>("$lib/assets/cards/*", {
      eager: true,
    }),
  ).map((m) => m.default);

  // Function that sets up a new game.
  function init() {
    // Clear the list of cards.
    cards = [];

    // Reset the turn counter.
    turns = 0;

    // Shuffle the available card images.
    const shuffledCardImages = shuffle(availableCardImages);

    // Loop six times.
    for (let i = 0; i < 6; i++) {
      // Add two copies of a card to the list.
      cards.push({
        image: shuffledCardImages[i],
        flipped: false,
      });
      cards.push({
        image: shuffledCardImages[i],
        flipped: false,
      });
    }

    // Finally, shuffle the list of cards.
    cards = shuffle(cards);
  }

  // Handle a click on the card at the given index.
  function handleChoice(index: number) {
    // Only react if the game hasn't been paused.
    if (!paused) {
      // Note the card chosen.
      if (choiceOne === null) {
        choiceOne = index;
      } else {
        choiceTwo = index;
      }

      // Flip the card.
      cards[index].flipped = true;

      // When two cards have been chosen.
      if (choiceOne !== null && choiceTwo !== null) {
        // Increment the turn counter.
        turns++;

        if (cards[choiceOne].image === cards[choiceTwo].image) {
          // The two cards match.
          console.log("match");
          // Clear the choices.
          choiceOne = null;
          choiceTwo = null;
        } else {
          // The two cards don't match.
          // Pause the game so we see the second card.
          paused = true;
          setTimeout(() => {
            // Turn the chosen cards back over and resume the game.
            cards[choiceOne as number].flipped = false;
            cards[choiceTwo as number].flipped = false;
            choiceOne = null;
            choiceTwo = null;
            paused = false;
          }, 1000);
        }
      }
    }
  }

  // Start the game.
  init();
</script>

<div class="my-6 prose lg:prose-xl">
  <h1>Game title here</h1>
  <p>Tap or click the cards to find the matching pairs.</p>
</div>

<div class="my-6 grid grid-cols-4 gap-2 sm:gap-6">
  {#each cards as card, index (index)}
    <CardComponent
      back={backImage}
      flipped={card.flipped}
      front={card.image}
      {handleChoice}
      {index}
    />
  {/each}
</div>

<div class="my-6 prose lg:prose-xl">
  <p>Turns: {turns}</p>
  <button class="btn btn-primary" onclick={init}>Restart</button>
</div>
