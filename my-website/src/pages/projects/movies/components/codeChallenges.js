// --- Directions
// Write a function that returns the number of vowels
// used in a string.  Vowels are the characters 'a', 'e'
// 'i', 'o', and 'u'.
// --- Examples
//   vowels('Hi There!') --> 3
//   vowels('Why do you ask?') --> 4
//   vowels('Why?') --> 0
function vowels(str) {
    // break str into array
    // loop over array and determine what is a vowel
    // every time we encounter a vowel Increase counter by 1

    const vowels = ["a", "e", "i", "o", "u"];
    const x = str.split("").filter((el) => vowels.includes(el));

    return x.length;
}

// --- Directions
// Write a function that accepts an integer N
// and returns a NxN spiral matrix.
// --- Examples
//   matrix(2)
//     [[1, 2],
//     [4, 3]]
//   matrix(3)
//     [[1, 2, 3],
//     [8, 9, 4],
//     [7, 6, 5]]
//  matrix(4)
//     [[1,   2,  3, 4],
//     [12, 13, 14, 5],
//     [11, 16, 15, 6],
//     [10,  9,  8, 7]]

function matrix(n) {
    const matrix = [];

    for (let i = 0; i < n; i++) {
        matrix.push([]);
    }
    let counter = 1; // increases during iterations 1 to n
    //
    let startRow = 0; //  [[x,   2,  3, 4]],
    let endRow = n - 1; //  [[1,   2,  3, x],
    let startColumn = 0; // [[0]]
    let endColumn = n - 1;

    while (startRow <= endRow && startColumn <= endColumn) {
        //  top row //row = 0 ---  [0][1]//[0][2]//[0][3]=1,2,3
        for (let i = startRow; i <= endRow; i++) {
            matrix[startRow][i] = counter;
            counter++;

            // [ 1, 2, 3 ]
        }
        startRow++;

        // right column
        for (let i = startRow; i <= endRow; i++) {
            //  matrix[i][endColumn] = [1][2] = 4 , [2][2] = 5
            console.log("col: ", startColumn, endColumn);
            console.log(i);
            matrix[i][endColumn] = counter;
            counter++;
        }
        endColumn--; // last one === -1
        for (let i = endColumn; i >= startColumn; i--) {
            // matrix = [0][]
            matrix[endRow][i] = counter;
            counter++;
        }
        endRow--;
        for (let i = endRow; i >= startRow; i--) {
            matrix[i][startColumn] = counter;
            counter++;
        }
        startColumn++;
    }
    // console.log(matrix);
    // while (startCol <= endCol && startRow <= endRow) {
    //     // top row
    //     for (let i = startCol; i <= endCol; i++) {
    //         matrix[startRow][i] = counter;
    //         counter++;
    //     }
    //     startRow++;
    //     // right column
    //     for (let i = startRow; i <= endRow; i++) {
    //         matrix[i][endCol] = counter;
    //         counter++;
    //     }
    //     endCol--;
    //     // bottom row
    //     for (let i = endCol; i >= startCol; i--) {
    //         matrix[endRow][i] = counter;
    //         counter++;
    //     }
    //     endRow--;
    //     // start col
    //     for (let i = endRow; i >= startRow; i--) {
    //         matrix[i][startCol] = counter;
    //         counter++;
    //     }
    //     startCol++;
    // }

    // console.log(matrix);
    return matrix;
}
// Print out the n-th entry in the fibonacci series.
// The fibonacci series is an ordering of numbers where
// each number is the sum of the preceeding two.
// For example, the sequence
//  [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
// forms the first ten entries of the fibonacci series.
// Example:
//   fib(4) === 3
const finFirstSolution = () => {
    // next = sequence[2 - 1] + sequence[2 - 2] = sequence[1]+sequence[0] ==
    // 1+0 = 1= i is pushed on to the array as the next number
    // sequence[0,1,1]
    // next = sequence[3 - 1] + sequence[3 - 2] = sequence[2]+sequence[1] ==
    // 2+1 find index  value of 2 and 1= 1+1=2
    // sequence[0,1,1,2]

    let seq = [0, 1]; // starting value
    for (let i = 2; i <= n; i++) {
        let a = seq[seq.length - 1]; // [2-1] = seq[1] = 1
        let b = seq[seq.length - 2]; // [2-2] = seq[0] = 0
        let nextValue = a + b; // seq[2-1]= seq[1]=>value 1 = seq[2-2] = seq[0]=> value 0
        seq.push(nextValue);
    }
    console.log(seq[n]);
    return seq[n];
};
function fib(n) {
    if (n < 2) {
        return n;
    }

    return fib(n - 1) + fib(n - 2);
}

export { vowels, matrix, fib };
