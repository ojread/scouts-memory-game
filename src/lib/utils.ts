// Shuffle an array of anything into a random order.
// export function shuffle<T>(array: T[]): T[] {
//     return array.sort(() => Math.random() - 0.5);
// }

// Fisher–Yates shuffle algorithm.
export function shuffle<T>(array: T[]): void {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}
