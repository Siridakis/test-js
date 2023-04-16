
type singleResult = [number, Array<number>];
type WinningCombinationsResult = Array<singleResult>;

function getPaylines(symbolPositions: Array<number>): Array<number> {
  const subArrays: Array<Array<number>>  = [];
  let tempSubarray: Array<number> = [];

  // get sequential subarrays of symbolPositions array, to check for paying lines
  for (let i = 0; i < symbolPositions.length; i++) {
    if (i === 0 || symbolPositions[i] === symbolPositions[i - 1] + 1) {
      tempSubarray.push(symbolPositions[i]);
    } else {
      subArrays.push(tempSubarray);
      tempSubarray = [symbolPositions[i]];
    }
  }

  if (tempSubarray.length > 0) {
    subArrays.push(tempSubarray);
  }

  // must have at least 3 consecutive ocurrences of a symbol to be considered a payline
  const payLines = subArrays.filter((s) => s.length >= 3); 
  
  // this implementations assumes there can't be more than one payline of a given symbol, 
  // since there are max 6 positions and a payline needs at least 3 consecutive ocurrences
  if (payLines.length) {
    return payLines[0]; 
  }
  return []
  
}

function call(lines: Array<number>): WinningCombinationsResult {

  // since the paying symbols are all integers from 0 to 9, we could also create the array using:
  // const payingSymbols = Array.from({ length: 10 }, (_, index) => index);
  const payingSymbols = [0,1,2,3,4,5,6,7,8,9];
  
  const symbolsFound = [];
  const symbolsPositions = [];

  // get paying symbols found and their positions (including the wild number 0, for each symbol).
  // If there are less than 3 positions we can discard the symbol because we need at least 3 for a payline
  for (let i = 0; i < payingSymbols.length; i++) {
    if (lines.includes(payingSymbols[i])) {
      const targetElements = [0, payingSymbols[i]];
      const positions = lines.reduce((acc: number[], curr, index) => {
        if (targetElements.includes(curr)) {
          acc.push(index);
        }
        return acc;
      }, []);
      if (positions.length >= 3) {
        symbolsFound.push(payingSymbols[i]);
        symbolsPositions.push(positions)
      }
    }
  }

  let result: WinningCombinationsResult = [];

  // for the symbols found in at least 3 positions (counting the wild number 0), 
  // get those that form a payline and and their correspondent positions
  for (let i = 0; i < symbolsFound.length; i++) {
    const paylines = getPaylines(symbolsPositions[i])
    if (paylines.length) {
      const singleResult: singleResult = [symbolsFound[i],paylines]
      result.push(singleResult)
    }
  }

  // we can consider a payline of just zeros only if there is no other payline in the result
  if (result.length > 1) {
    result = result.filter((s) => s[0] !== 0)
  }

  return result;
}

export const WinningCombinations = { call };
