import { NotesType } from "@/types/ATM";

/**
 * Collect the required amount from available notes in descending order by value.
 * Ignores balanced distribution of notes.
 *
 * @param notes - Array of available notes in the ATM.
 * @param remaining - Amount that customer wants to withdraw from ATM.
 * @returns An array of NotesType, where each note will have the number required to make up the remaining amount.
 */
export function brutAtmAlgo(
  notes: NotesType[],
  remaining: number
): NotesType[] {
  const sortedNotes: NotesType[] = [...notes].sort((a, b) => b.value - a.value);
  const result: NotesType[] = [];
  for (let note of sortedNotes) {
    while (remaining >= note.value && note.amount >= 1) {
      if (result.some((obj) => obj.value === note.value)) {
        let indx = result.findIndex((obj) => obj.value === note.value);
        result[indx]["amount"] += 1;
      } else {
        result.push({ ...note, amount: 1 });
      }
      remaining -= note.value;
      note.amount--;
    }
  }
  if (remaining !== 0) {
    console.log("Impossible to return this amount");
    return [];
  }
  return result;
}

/**
 * Augments the result from brutAtmAlgo with missing notes.
 * Missing notes have their amounts set to zero.
 *
 * @param brutResult - Output from brutAtmAlgo function.
 * @param notes - Array of available notes in the ATM.
 * @returns An array of NotesType including notes not used in brutAtmAlgo with amounts set to zero.
 */
export function addMissingNotes(
  brutResult: NotesType[],
  notes: NotesType[]
): NotesType[] {
  const resultComplete: NotesType[] = [...brutResult];
  for (let note of notes) {
    if (!resultComplete.some((obj) => obj.value === note.value)) {
      if (note.amount > 0) {
        resultComplete.push({ ...note, amount: 0 });
      }
    }
  }
  return resultComplete;
}

/**
 * Iteratively replaces notes with zero amount with available notes to make the amounts more balanced.
 *
 * @param resultComplete - Array of NotesType, which may contain notes with zero amounts.
 * @param availableNotes - Array of available notes in the ATM.
 * @returns An array of NotesType where notes with zero amounts are replaced with other available notes, if possible.
 */
export function fillZeroAmountNotes(
  resultComplete: NotesType[],
  availableNotes: NotesType[]
): NotesType[] {
  const sortedResult: NotesType[] = [...resultComplete].sort(
    (a, b) => b.amount - a.amount
  );
  let cantReplaceFlag = false;
  while (isTheirZero(sortedResult)) {
    const zeroNote = sortedResult[sortedResult.length - 1];
    const zeroNoteIndx = availableNotes.findIndex(
      (obj) => obj.value === zeroNote.value
    );
    const zeroNoteTotalAmount = availableNotes[zeroNoteIndx]["amount"];
    for (let i = 0; i < sortedResult.length; i++) {
      const note = sortedResult[i];
      if (note.value % zeroNote.value === 0) {
        const difference = note.value / zeroNote.value;
        if (difference <= zeroNoteTotalAmount) {
          zeroNote["amount"] = difference;
          sortedResult[i]["amount"] -= 1;
          break;
        }
      } else if (zeroNote.value % note.value === 0) {
        let difference = zeroNote.value / note.value;
        if (zeroNoteTotalAmount > 0) {
          zeroNote["amount"] = 1;
          sortedResult[i]["amount"] -= difference;
          break;
        }
      }
      // we can't replace note that now has zero amount
      if (i === sortedResult.length - 1) {
        cantReplaceFlag = true;
      }
    }
    if (cantReplaceFlag) {
      sortedResult.pop();
    }
    sortedResult.sort((a, b) => b.amount - a.amount);
  }
  return sortedResult;
}

/**
 * Attempts to balance the distribution of notes.
 *
 * @param resultUnbalanced - Initial array of NotesType, which needs to be balanced.
 * @param availableNotes - Array of available notes in the ATM.
 * @returns An array of NotesType where the distribution of notes is more balanced if possible.
 */
export function balanceDistribution(
  resultUnbalanced: NotesType[],
  availableNotes: NotesType[]
): NotesType[] {
  let prevDiff: number = biggestDifference(resultUnbalanced) + 1;
  let newDiff: number = prevDiff - 1;
  let balancedResult: NotesType[] = [...resultUnbalanced];
  while (newDiff < prevDiff) {
    const tempArr = balancedResult.map((obj) => {
      return { ...obj };
    });
    const smallestNote = tempArr[tempArr.length - 1];
    const smallestNoteIndx = availableNotes.findIndex(
      (obj) => obj.value === smallestNote.value
    );
    const smallestNoteTotalAmount = availableNotes[smallestNoteIndx]["amount"];
    for (let i = 0; i < tempArr.length; i++) {
      const note = tempArr[i];
      if (note.value % smallestNote.value === 0) {
        let difference = note.value / smallestNote.value;
        if (
          smallestNoteTotalAmount >=
          tempArr[tempArr.length - 1]["amount"] + difference
        ) {
          tempArr[tempArr.length - 1]["amount"] += difference;
          tempArr[i]["amount"] -= 1;
          break;
        }
      } else if (smallestNote.value % note.value === 0) {
        let difference = smallestNote.value / note.value;
        if (
          smallestNoteTotalAmount >=
          tempArr[tempArr.length - 1]["amount"] + 1
        ) {
          tempArr[tempArr.length - 1]["amount"] += 1;
          tempArr[i]["amount"] -= difference;
          break;
        }
      }
    }
    prevDiff = newDiff;
    newDiff = biggestDifference(tempArr);
    if (newDiff < prevDiff) {
      balancedResult = tempArr
        .map((obj) => {
          return { ...obj };
        })
        .sort((a, b) => b.amount - a.amount);
    } else {
      break;
    }
  }
  return balancedResult;
}

/**
 * Calculates the biggest difference in amount between any two notes in an array.
 *
 * @param notes - Array of NotesType.
 * @returns The biggest difference in amount among the notes.
 */
function biggestDifference(notes: NotesType[]): number {
  let resultDiff: number = 0;
  for (let i = 0; i < notes.length; i++) {
    for (let j = 1; j < notes.length; j++) {
      if (resultDiff < Math.abs(notes[i].amount - notes[j].amount)) {
        resultDiff = Math.abs(notes[i].amount - notes[j].amount);
      }
    }
  }
  return resultDiff;
}

/**
 * Checks if any note in an array has a zero amount.
 *
 * @param notes - Array of NotesType.
 * @returns True if there's at least one note with zero amount, false otherwise.
 */
function isTheirZero(notes: NotesType[]): boolean {
  for (let note of notes) {
    if (note.amount === 0) {
      return true;
    }
  }
  return false;
}
