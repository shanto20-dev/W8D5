class Clock {
    constructor() {
        let date = new Date();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();   
        setInterval(this._tick.bind(this), 1000);
    }

    timeHelper(i){
        if (i < 10) return ("0" + i)
        return i
    }

    printTime() {
        console.log(`${this.timeHelper(this.hours)}:${this.timeHelper(this.minutes)}:${this.timeHelper(this.seconds)}`);
    }

    _tick() {
        this.seconds++;
        if (this.seconds === 60) {
            this.minutes ++;
            this.seconds = 0;
        }
        if (this.minutes === 60) {
            this.hours ++;
            this.minutes = 0;
        }
        // console.log(this)
        this.printTime();
    }


}

// const clock = new Clock();

const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin, output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
    if (numsLeft > 0) {
        reader.question("Input Number:", function(answer){
            num = parseInt(answer);
            sum += num;
            console.log(sum);
            addNumbers(sum, numsLeft - 1, completionCallback);
        });
    }
    else if (numsLeft === 0) {
        completionCallback(sum);
    }
    return
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

function askIfGreaterThan(el1, el2, callback) {
    reader.question(`Is ${el1} greater than ${el2}?`, function(answer){
        if (answer === "yes") return callback(true);
        if (answer === "no") return callback(false);
        console.log("Please respond 'yes' or 'no'")
        askIfGreaterThan(el1, el2, callback);
    })
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    if (i == arr.length - 1) {
        outerBubbleSortLoop(madeAnySwaps);
        return;
    }
    
    if (i < arr.length - 1) {
        askIfGreaterThan(arr[i], arr[i + 1], function(greater){
            if (greater) {
                [arr[i], arr[i+1]] = [arr[i + 1], arr[i]];
                madeAnySwaps = true;
            }
            innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
        });

    }
}

function absurdBubbleSort(arr, sortCompletionCallback){
    function outerBubbleSortLoop(madeAnySwaps){
        if (madeAnySwaps) {
            innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop)
        }
        else {
            sortCompletionCallback(arr)
        }

    }

    outerBubbleSortLoop(true);
}

absurdBubbleSort([3, 2, 1], function (arr) {
    console.log("Sorted array: " + JSON.stringify(arr));
    reader.close();
});

