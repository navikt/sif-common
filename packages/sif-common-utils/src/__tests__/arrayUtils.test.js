"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrayUtils_1 = require("../arrayUtils");
describe('arrayUtils', () => {
    const data = [1, 2, 3, 4, 5];
    it('returns correct items when nth is 1', () => {
        const result = data.filter((_, index) => {
            return (0, arrayUtils_1.nthItemFilter)(index, 1);
        });
        expect(result.length).toBe(5);
    });
    it('returns correct items when nth is 2, and starts by including the first item', () => {
        const result = data.filter((_, index) => {
            return (0, arrayUtils_1.nthItemFilter)(index, 2);
        });
        expect(result.length).toBe(3);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(5);
    });
});
