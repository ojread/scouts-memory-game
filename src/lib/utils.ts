// Fisher-Yates Shuffle algorithm
export function shuffle<T>(array: T[]): T[] {
    // export function shuffle(array) {
    // set the index to the arrays length
    let i = array.length, j, temp;
    // create a loop that subtracts everytime it iterates through
    while (--i > 0) {
        //  create a random number and store it in a variable
        j = Math.floor(Math.random() * (i + 1));
        // create a temporary position from the item of the random number    
        temp = array[j];
        // swap the temp with the position of the last item in the array    
        array[j] = array[i];
        // swap the last item with the position of the random number 
        array[i] = temp;
    }
    // return the array when it completes
    return array;
}