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

    //row = 0 ---  [0][1]//[0][2]//[0][3]=1,2,3
    //row = 1

    while (startRow <= endRow && startColumn <= endColumn) {
        //  top row
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

export { vowels, matrix };
