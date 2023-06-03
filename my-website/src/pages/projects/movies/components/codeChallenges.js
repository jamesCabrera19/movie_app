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
// function fib(n) {
//     if (n < 2) {
//         return n;
//     }

//     return fib(n - 1) + fib(n - 2);
// }
function fib(n) {
    const nemo = ["nemo"];
    const x = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];

            if (element === "nemo") {
                console.log("found nemo");
            }
        }
    };
    x(nemo);
}
const palindrome = (str) => {
    return str.split("").every((el, i) => el === str[str.length - i - 1]);
};
const ConsoleIt = (x) => console.log("RES = ", x);

const integerReverse = (n) => {
    // ConsoleIt();
    const x = n.toString().split("").reverse().join("");
    // ConsoleIt(x);
    return parseInt(x) * Math.sign(n);
};

const maxChar = (str) => {
    // --- Directions
    // Given a string, return the character that is most
    // commonly used in the string.
    // --- Examples
    // maxChar("abcccccccd") === "c"
    // maxChar("apple 1231111") === "1"
    // hello stranger = {h:1,e:2,l:2,}
    const group = {
        // a:1
        // b:1
        // d:0
        //n: 2johnny
    };
    const initVal = 1;
    let maxValue = 0;
    let char = "";
    for (const key of str) {
        ConsoleIt(key);
        if (!group[key]) {
            group[key] = initVal;
        } else {
            group[key]++;
        }

        if (group[key] > maxValue) {
            maxValue = group[key];
            char = key;
        }
    }

    return char;
};

const fizzBuzz = (n) => {
    // --- Directions
    // Write a program that console logs the numbers
    // from 1 to n. But for multiples of three print
    // “fizz” instead of the number and for the multiples
    // of five print “buzz”. For numbers which are multiples
    // of both three and five print “fizzbuzz”.
    // --- Example
    //   fizzBuzz(5);
    //   1
    //   2
    //   fizz
    //   4
    //   buzz
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("fizzbuzz");
        } else if (i % 3 === 0) {
            console.log("fizz");
        } else if (i % 5 === 0) {
            console.log("buzz");
        } else {
            console.log(i);
        }
    }
};

// --- Directions
// Given an array and chunk size, divide the array into many subarrays
// where each subarray is of length size
// --- Examples
// chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
// chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
// chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]
// const res = [];
//     for (let i = 0; i < array.length; i++) {
//         const element = array[i];
//         const chunkIdx = Math.floor(i / size);
//         if (!res[chunkIdx]) {
//             res[chunkIdx] = [];
//         }
//         res[chunkIdx].push(element);
//     }

const chunkForLoop = (array, size) => {
    const res = [];
    for (let i = 0; i < array.length; i++) {
        const el = array[i];
        const chunkIdx = Math.floor(i / size);
        if (!res[chunkIdx]) {
            res[chunkIdx] = [];
        }
        res[chunkIdx].push(el);
    }

    return res;
};
const chunk = (array, size) => {
    return array.reduce((group, el, idx) => {
        const chunkIdx = Math.floor(idx / size);
        if (!group[chunkIdx]) {
            group[chunkIdx] = [];
        }
        group[chunkIdx].push(el);

        return group;
    }, []);
};
const anagram = (stringOne, stringTwo) => {
    const clean = (word) =>
        word.replace(/[^\w]/g, "").split("").sort().join("");
    const a = clean(stringOne);
    const b = clean(stringTwo);

    return a === b;
};

const capitalize = (str) => {
    // --- Directions
    // Write a function that accepts a string.  The function should
    // capitalize the first letter of each word in the string then
    // return the capitalized string.
    // --- Examples
    //   capitalize('a short sentence') --> 'A Short Sentence'
    //   capitalize('a lazy fox') --> 'A Lazy Fox'
    //   capitalize('look, it is working!') --> 'Look, It Is Working!'
    const upper = str
        .split(" ")
        .map((el) => {
            el.charAt(0).toUpperCase();
            return el.replace(el.charAt(0), el.charAt(0).toUpperCase());
        })
        .join(" ");
    return upper;
};
const stepsRecursion = (n) => {
    for (let i = 1; i <= n; i++) {
        let step = "#".repeat(i);
        let space = " ".repeat(n - i);
        console.log(step + space);
    }
};
const steps = (n) => {
    for (let col = 0; col < n; col++) {
        let step = "";
        for (let row = 0; row <= col; row++) {
            if (row <= col) {
                step += "#";
            } else {
                step += " ";
            }
        }
        console.log(step);
    }
};
export {
    chunk,
    vowels,
    matrix,
    fib,
    palindrome,
    integerReverse,
    maxChar,
    fizzBuzz,
    chunkForLoop,
    anagram,
    capitalize,
    steps,
};
