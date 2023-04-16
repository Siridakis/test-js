/**
 * Anticipator configuration. Has all information needed to check anticipator.
 * @param columnSize It's the number of columns the slot machine has.
 * @param minToAnticipate It's the minimum number of symbols to start anticipation.
 * @param maxToAnticipate It's the maximum number of symbols to end anticipation.
 * @param anticipateCadence It's the cadence value when has anticipation.
 * @param defaultCadence It's the cadence value when don't has anticipation.
 */
var anticipatorConfig = {
    columnSize: 5,
    minToAnticipate: 2,
    maxToAnticipate: 3,
    anticipateCadence: 2,
    defaultCadence: 0.25,
};
/**
 * Game rounds with special symbols position that must be used to generate the SlotCadences.
 */
var gameRounds = {
    roundOne: {
        specialSymbols: [
            { column: 0, row: 2 },
            { column: 1, row: 3 },
            { column: 3, row: 4 },
        ],
    },
    roundTwo: {
        specialSymbols: [
            { column: 0, row: 2 },
            { column: 0, row: 3 },
        ],
    },
    roundThree: {
        specialSymbols: [
            { column: 4, row: 2 },
            { column: 4, row: 3 },
        ],
    },
};
/**
 * This must be used to get all game rounds cadences.
 */
var slotMachineCadences = { roundOne: [], roundTwo: [], roundThree: [] };
/**
 * This function receives an array of coordinates relative to positions in the slot machine's matrix.
 * This array is the positions of the special symbols.
 * And it has to return a slot machine stop cadence.
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array of numbers representing the slot machine stop cadence.
 */
function slotCadence(symbols) {
    var columnSize = anticipatorConfig.columnSize;
    var minToAnticipate = anticipatorConfig.minToAnticipate;
    var maxToAnticipate = anticipatorConfig.maxToAnticipate;
    var anticipateCadence = anticipatorConfig.anticipateCadence;
    var defaultCadence = anticipatorConfig.defaultCadence;
    var cadenceArr = [];
    //Initialize cadenceArr with time 0
    cadenceArr.push(0);
    var lastTime = 0;
    var numSymbolsFound = 0;
    var _loop_1 = function (i) {
        // checks if there are special symbols in the current column
        if (symbols.some(function (s) { return s.column === i; })) {
            // checks how many special symbols there are in the current column and adds it to the amount found so far
            var symbolAmountToAdd = symbols.filter(function (s) { return s.column === i; }).length;
            numSymbolsFound += symbolAmountToAdd;
        }
        // checks if the amount of special symbols found so far is within the range 
        // to use the anticipateCadence or out of it, to use the defaultCadence
        if (numSymbolsFound >= minToAnticipate && numSymbolsFound < maxToAnticipate) {
            lastTime += anticipateCadence;
            cadenceArr.push(lastTime);
        }
        else {
            lastTime += defaultCadence;
            cadenceArr.push(lastTime);
        }
    };
    for (var i = 0; i < columnSize - 1; i++) {
        _loop_1(i);
    }
    return cadenceArr;
}
/**
 * Get all game rounds and return the final cadences of each.
 * @param rounds RoundsSymbols with contains all rounds special symbols positions.
 * @return RoundsCadences has all cadences for each game round.
 */
function handleCadences(rounds) {
    slotMachineCadences.roundOne = slotCadence(rounds.roundOne.specialSymbols);
    slotMachineCadences.roundTwo = slotCadence(rounds.roundTwo.specialSymbols);
    slotMachineCadences.roundThree = slotCadence(rounds.roundThree.specialSymbols);
    return slotMachineCadences;
}
console.log('CADENCES: ', handleCadences(gameRounds));
