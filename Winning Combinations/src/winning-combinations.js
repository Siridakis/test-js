"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinningCombinations = void 0;
function getPaylines(symbolPositions) {
    var subArrays = [];
    var tempSubarray = [];
    // get sequential subarrays of symbolPositions array, to check for paying lines
    for (var i = 0; i < symbolPositions.length; i++) {
        if (i === 0 || symbolPositions[i] === symbolPositions[i - 1] + 1) {
            tempSubarray.push(symbolPositions[i]);
        }
        else {
            subArrays.push(tempSubarray);
            tempSubarray = [symbolPositions[i]];
        }
    }
    if (tempSubarray.length > 0) {
        subArrays.push(tempSubarray);
    }
    // must have at least 3 consecutive occurrences of a symbol to be considered a payline
    var payLines = subArrays.filter(function (s) { return s.length >= 3; });
    // this implementation assumes there can't be more than one payline of a given symbol, 
    // since there are max 6 positions and a payline needs at least 3 consecutive occurrences
    if (payLines.length) {
        return payLines[0];
    }
    return [];
}
function call(lines) {
    // since the paying symbols are all integers from 0 to 9, we could also create the array using:
    // const payingSymbols = Array.from({ length: 10 }, (_, index) => index);
    var payingSymbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var symbolsFound = [];
    var symbolsPositions = [];
    var _loop_1 = function (i) {
        if (lines.includes(payingSymbols[i])) {
            var targetElements_1 = [0, payingSymbols[i]];
            var positions = lines.reduce(function (acc, curr, index) {
                if (targetElements_1.includes(curr)) {
                    acc.push(index);
                }
                return acc;
            }, []);
            if (positions.length >= 3) {
                symbolsFound.push(payingSymbols[i]);
                symbolsPositions.push(positions);
            }
        }
    };
    // get paying symbols found and their positions (including the wild number 0, for each symbol).
    // If there are less than 3 positions we can discard the symbol because we need at least 3 for a payline
    for (var i = 0; i < payingSymbols.length; i++) {
        _loop_1(i);
    }
    var result = [];
    // for the symbols found in at least 3 positions (counting the wild number 0), 
    // get those that form a payline and and their correspondent positions
    for (var i = 0; i < symbolsFound.length; i++) {
        var paylines = getPaylines(symbolsPositions[i]);
        if (paylines.length) {
            var singleResult = [symbolsFound[i], paylines];
            result.push(singleResult);
        }
    }
    // we can consider a payline of just zeros only if there is no other payline in the result
    if (result.length > 1) {
        result = result.filter(function (s) { return s[0] !== 0; });
    }
    return result;
}
exports.WinningCombinations = { call: call };
