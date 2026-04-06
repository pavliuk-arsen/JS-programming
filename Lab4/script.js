const SorterLib = {
    _handleSparse: function(arr) {
        let valid = [], undefCount = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) undefCount++;
            else valid.push(arr[i]);
        }
        
        if (undefCount > 0) {
            console.log(`[Інфо] У масиві виявлено ${undefCount} undefined-елементів. Їх переміщено в кінець.`);
        }
        return valid;
    },

    _restore: function(arr, valid) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = i < valid.length ? valid[i] : undefined;
        }
        return arr;
    },

    bubbleSort: function(arr, isAsc = true) {
        console.log(`\n--- Обміну | ${isAsc ? 'Зростання' : 'Спадання'} ---`);
        let valid = this._handleSparse(arr);
        let comp = 0, swaps = 0, n = valid.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                comp++;
                if (isAsc ? valid[j] > valid[j + 1] : valid[j] < valid[j + 1]) {
                    swaps++;
                    [valid[j], valid[j + 1]] = [valid[j + 1], valid[j]]; 
                }
            }
        }
        console.log(`Порівнянь: ${comp}, Обмінів: ${swaps}`);
        return this._restore(arr, valid);
    },

    selectionSort: function(arr, isAsc = true) {
        console.log(`\n--- Вибором | ${isAsc ? 'Зростання' : 'Спадання'} ---`);
        let valid = this._handleSparse(arr);
        let comp = 0, swaps = 0, n = valid.length;

        for (let i = 0; i < n - 1; i++) {
            let t = i;
            for (let j = i + 1; j < n; j++) {
                comp++;
                if (isAsc ? valid[j] < valid[t] : valid[j] > valid[t]) t = j;
            }
            if (t !== i) {
                swaps++;
                [valid[i], valid[t]] = [valid[t], valid[i]];
            }
        }
        console.log(`Порівнянь: ${comp}, Обмінів: ${swaps}`);
        return this._restore(arr, valid);
    },

    insertionSort: function(arr, isAsc = true) {
        console.log(`\n--- Вставками | ${isAsc ? 'Зростання' : 'Спадання'} ---`);
        let valid = this._handleSparse(arr);
        let comp = 0, moves = 0, n = valid.length;

        for (let i = 1; i < n; i++) {
            let key = valid[i], j = i - 1;
            while (j >= 0) {
                comp++;
                if (isAsc ? valid[j] > key : valid[j] < key) {
                    valid[j + 1] = valid[j];
                    moves++;
                    j--;
                } else break;
            }
            valid[j + 1] = key;
            moves++;
        }
        console.log(`Порівнянь: ${comp}, Переміщень: ${moves}`);
        return this._restore(arr, valid);
    },

    shellSort: function(arr, isAsc = true) {
        console.log(`\n--- Шелла | ${isAsc ? 'Зростання' : 'Спадання'} ---`);
        let valid = this._handleSparse(arr);
        let comp = 0, moves = 0, n = valid.length;

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = valid[i], j = i;
                while (j >= gap) {
                    comp++;
                    if (isAsc ? valid[j - gap] > temp : valid[j - gap] < temp) {
                        valid[j] = valid[j - gap];
                        moves++;
                        j -= gap;
                    } else break;
                }
                valid[j] = temp;
                moves++;
            }
        }
        console.log(`Порівнянь: ${comp}, Переміщень: ${moves}`);
        return this._restore(arr, valid);
    },

    quickSort: function(arr, isAsc = true) {
        console.log(`\n--- Хоара (Quick) | ${isAsc ? 'Зростання' : 'Спадання'} ---`);
        let valid = this._handleSparse(arr);
        let stats = { comp: 0, swaps: 0 };
        
        this._qsHelper(valid, 0, valid.length - 1, isAsc, stats);
        
        console.log(`Порівнянь: ${stats.comp}, Обмінів: ${stats.swaps}`);
        return this._restore(arr, valid);
    },

    _qsHelper: function(arr, low, high, isAsc, stats) {
        if (low < high) {
            let pivot = arr[high], i = low - 1;
            for (let j = low; j < high; j++) {
                stats.comp++;
                if (isAsc ? arr[j] < pivot : arr[j] > pivot) {
                    i++;
                    stats.swaps++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
            stats.swaps++;
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            
            let pi = i + 1;
            this._qsHelper(arr, low, pi - 1, isAsc, stats);
            this._qsHelper(arr, pi + 1, high, isAsc, stats);
        }
    }
};


function cloneArr(arr) {
    return arr.map(x => x); 
}

console.log("%c НЕРОЗРІДЖЕНИЙ МАСИВ ", "color: green; font-weight: bold;");
const denseArr = Array.from({length: 100}, () => Math.floor(Math.random() * 1000));

SorterLib.bubbleSort(cloneArr(denseArr), true);
SorterLib.selectionSort(cloneArr(denseArr), false);
SorterLib.insertionSort(cloneArr(denseArr), true);
SorterLib.shellSort(cloneArr(denseArr), false);
SorterLib.quickSort(cloneArr(denseArr), true);


console.log("\n%c РОЗРІДЖЕНИЙ МАСИВ", "color: green; font-weight: bold;");
const sparseArr = [];
sparseArr.length = 100;
for (let i = 0; i < 100; i += 3) sparseArr[i] = Math.floor(Math.random() * 1000);

SorterLib.bubbleSort(cloneArr(sparseArr), false);
SorterLib.selectionSort(cloneArr(sparseArr), true);
SorterLib.insertionSort(cloneArr(sparseArr), false);
SorterLib.shellSort(cloneArr(sparseArr), true);
SorterLib.quickSort(cloneArr(sparseArr), false);