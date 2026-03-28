// Shuffle an array of anything into a random order.
export function shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}