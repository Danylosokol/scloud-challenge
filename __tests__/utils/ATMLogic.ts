import {
  brutAtmAlgo,
  addMissingNotes,
  fillZeroAmountNotes,
  balanceDistribution,
} from "@/app/utils/ATMLogic";
import { NotesType } from "@/types/ATM";

describe("ATM Logic functions", () => {

  describe("brutAtmAlgo", () => {
    it("should return the correct notes when remaining is 140", () => {
      const notes = [
        { currency: "£", value: 5, amount: 4 },
        { currency: "£", value: 10, amount: 15 },
        { currency: "£", value: 20, amount: 7 },
      ];
      const remaining = 140;
      const expected = [{ currency: "£", value: 20, amount: 7 }];

      const result = brutAtmAlgo(notes, remaining);

      expect(result).toEqual(expected);
    });

    it("should return an empty array when remaining is 143", () => {
      const notes = [
        { currency: "£", value: 5, amount: 4 },
        { currency: "£", value: 10, amount: 15 },
        { currency: "£", value: 20, amount: 7 },
      ];
      const remaining = 143;
      const expected: NotesType[] = [];

      const result = brutAtmAlgo(notes, remaining);

      expect(result).toEqual(expected);
    });

    it("should return the correct notes when remaining is 90", () => {
      const notes = [
        { currency: "£", value: 5, amount: 0 },
        { currency: "£", value: 10, amount: 11 },
        { currency: "£", value: 20, amount: 3 },
      ];
      const remaining = 90;
      const expected = [
        { currency: "£", value: 20, amount: 3 },
        { currency: "£", value: 10, amount: 3 },
      ];

      const result = brutAtmAlgo(notes, remaining);

      expect(result).toEqual(expected);
    });

    it("should return the correct notes when remaining is 50", () => {
      const notes = [
        { currency: "£", value: 5, amount: 0 },
        { currency: "£", value: 10, amount: 8 },
        { currency: "£", value: 20, amount: 1 },
      ];
      const remaining = 50;
      const expected = [
        { currency: "£", value: 20, amount: 1 },
        { currency: "£", value: 10, amount: 3 },
      ];

      const result = brutAtmAlgo(notes, remaining);

      expect(result).toEqual(expected);
    });
  });


  describe("fillZeroAmountNotes", () => {
    it("should replace zero amount notes when possible - Test £140", () => {
      const resultComplete = [
        { currency: "£", value: 20, amount: 7 },
        { currency: "£", value: 10, amount: 0 },
        { currency: "£", value: 5, amount: 0 },
      ];
      const availableNotes = [
        { currency: "£", value: 20, amount: 0 },
        { currency: "£", value: 10, amount: 15 },
        { currency: "£", value: 5, amount: 4 },
      ];

      const expected = [
        { currency: "£", value: 20, amount: 5 },
        { currency: "£", value: 5, amount: 4 },
        { currency: "£", value: 10, amount: 2 },
      ];

      const result = fillZeroAmountNotes(resultComplete, availableNotes);

      expect(result).toEqual(expected);
    });

    it("should not replace when there are no available replacement notes - Test £90", () => {
      const resultComplete = [
        { currency: "£", value: 20, amount: 3 },
        { currency: "£", value: 10, amount: 3 },
      ];
      const availableNotes = [
        { currency: "£", value: 20, amount: 0 },
        { currency: "£", value: 10, amount: 8 },
        { currency: "£", value: 5, amount: 0 },
      ];

      const expected = [
        { currency: "£", value: 20, amount: 3 },
        { currency: "£", value: 10, amount: 3 },
      ];

      const result = fillZeroAmountNotes(resultComplete, availableNotes);

      expect(result).toEqual(expected);
    });

    it("should not replace when all zero amount notes can’t be replaced - Test £50", () => {
      const resultComplete = [
        { currency: "£", value: 20, amount: 1 },
        { currency: "£", value: 10, amount: 3 },
      ];
      const availableNotes = [
        { currency: "£", value: 20, amount: 0 },
        { currency: "£", value: 10, amount: 5 },
        { currency: "£", value: 5, amount: 0 },
      ];

      const expected = [
        { currency: "£", value: 10, amount: 3 },
        { currency: "£", value: 20, amount: 1 },
      ];

      const result = fillZeroAmountNotes(resultComplete, availableNotes);

      expect(result).toEqual(expected);
    });
  });

  describe("balanceDistribution", () => {
    it("should balance the notes as much as possible - Test £140", () => {
      const resultUnbalanced = [
        { currency: "£", value: 20, amount: 5 },
        { currency: "£", value: 5, amount: 4 },
        { currency: "£", value: 10, amount: 2 },
      ];
      const availableNotes = [
        { currency: "£", value: 20, amount: 0 },
        { currency: "£", value: 10, amount: 15 },
        { currency: "£", value: 5, amount: 4 },
      ];

      const expected = [
        { currency: "£", value: 20, amount: 4 },
        { currency: "£", value: 5, amount: 4 },
        { currency: "£", value: 10, amount: 4 },
      ];

      const result = balanceDistribution(resultUnbalanced, availableNotes);
      expect(result).toEqual(expected);
    });

    it("should return the same array if balancing is not possible - Test £90", () => {
      const resultUnbalanced = [
        { currency: "£", value: 20, amount: 3 },
        { currency: "£", value: 10, amount: 3 },
      ];
      const availableNotes = [
        { currency: "£", value: 20, amount: 0 },
        { currency: "£", value: 10, amount: 8 },
        { currency: "£", value: 5, amount: 0 },
      ];

      const expected = [
        { currency: "£", value: 20, amount: 3 },
        { currency: "£", value: 10, amount: 3 },
      ];

      const result = balanceDistribution(resultUnbalanced, availableNotes);
      expect(result).toEqual(expected);
    });

    it("should return the same array when all balancing attempts fail - Test £50", () => {
      const resultUnbalanced = [
        { currency: "£", value: 20, amount: 1 },
        { currency: "£", value: 10, amount: 3 },
      ];
      const availableNotes = [
        { currency: "£", value: 20, amount: 0 },
        { currency: "£", value: 10, amount: 5 },
        { currency: "£", value: 5, amount: 0 },
      ];

      const expected = [
        { currency: "£", value: 20, amount: 1 },
        { currency: "£", value: 10, amount: 3 },
      ];

      const result = balanceDistribution(resultUnbalanced, availableNotes);
      expect(result).toEqual(expected);
    });
  });
});
