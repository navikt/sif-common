import { parseNumberString, ParseNumberStringError } from '../parseNumberString';

describe('parseNumberString', () => {
    it('should handle integer numbers', () => {
        expect(parseNumberString('1', true)).toBe(1);
        expect(parseNumberString('10', true)).toBe(10);
        expect(parseNumberString('100', true)).toBe(100);
        expect(parseNumberString('1000', true)).toBe(1000);
        expect(parseNumberString('10000', true)).toBe(10000);
        expect(parseNumberString('100000', true)).toBe(100000);
    });
    it("should convert '1.000' to 1 if value is to be below 1000", () => {
        const value = '1.000';
        const result = parseNumberString(value, true);
        expect(result).toBe(1);
    });
    it("should convert '52000.120' to 52000.120", () => {
        const value = '52000.120';
        const result = parseNumberString(value);
        expect(result).toBe(52000.12);
    });
    it("should convert '1,000' to 1 if value is to be below 1000", () => {
        const value = '1,000';
        const result = parseNumberString(value, true);
        expect(result).toBe(1);
    });
    it("should convert '100.000,50' to 100000.50", () => {
        const value = '100.000,50';
        const result = parseNumberString(value);
        expect(result).toBe(100000.5);
    });

    it("should convert '100000,50' to 100000.50", () => {
        const value = '100000,50';
        const result = parseNumberString(value);
        expect(result).toBe(100000.5);
    });

    it("should convert '100,000.50' to 100000.50", () => {
        const value = '100,000.50';
        const result = parseNumberString(value);
        expect(result).toBe(100000.5);
    });
    it("should convert '100 000,50' to 100000.50", () => {
        const value = '100 000.50';
        const result = parseNumberString(value);
        expect(result).toBe(100000.5);
    });
    it("should convert '12 100 000,50' to 12100000.50", () => {
        const value = '12 100 000.50';
        const result = parseNumberString(value);
        expect(result).toBe(12100000.5);
    });
    it("should convert '50.000.000' to 50000000", () => {
        const value = '50.000.000';
        const result = parseNumberString(value);
        expect(result).toBe(50000000);
    });

    it("should convert '50,000,000' to 50000000", () => {
        const value = '50,000,000';
        const result = parseNumberString(value);
        expect(result).toBe(50000000);
    });

    it("should convert '120000,40' to 120000.40", () => {
        const value = '120000,40';
        const result = parseNumberString(value);
        expect(result).toBe(120000.4);
    });

    it("should convert '120,000.40' to 120000.40", () => {
        const value = '120,000.40';
        const result = parseNumberString(value);
        expect(result).toBe(120000.4);
    });
    it("should convert '1,000,000.50' to 1000000.5", () => {
        const value = '1,000,000.50';
        const result = parseNumberString(value);
        expect(result).toBe(1000000.5);
    });
    it("should convert '1000.50' to 1000.5", () => {
        const value = '1000.50';
        const result = parseNumberString(value);
        expect(result).toBe(1000.5);
    });
    it("should convert '1000.5001' to 1000.5001", () => {
        const value = '1000.5001';
        const result = parseNumberString(value);
        expect(result).toBe(1000.5001);
    });
    it("should convert '-1' to -1", () => {
        const value = '-1';
        const result = parseNumberString(value);
        expect(result).toBe(-1);
    });
    it("should convert '-1.100.001' to -1100001", () => {
        const value = '-1.100.001';
        const result = parseNumberString(value);
        expect(result).toBe(-1100001);
    });
    it("should convert '-1,100.001' to -1100.001", () => {
        const value = '-1,100.001';
        const result = parseNumberString(value);
        expect(result).toBe(-1100.001);
    });
    it("should convert '-0,2' to -0.2", () => {
        const value = '-0,2';
        const result = parseNumberString(value);
        expect(result).toBe(-0.2);
    });
    it("should convert '200 000' to 200000", () => {
        const value = '200 000';
        const result = parseNumberString(value);
        expect(result).toBe(200000);
    });
    it("should convert '200 000.1' to 200000.1", () => {
        const value = '200 000.1';
        const result = parseNumberString(value);
        expect(result).toBe(200000.1);
    });
    it("should convert '1 200 000.1' to 1200000.1", () => {
        const value = '1 200 000.1';
        const result = parseNumberString(value);
        expect(result).toBe(1200000.1);
    });
    it("should throw an error for '100.20,300'", () => {
        const value = '100.20,300';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '100.2,300'", () => {
        const value = '100.2,300';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '100 20,300'", () => {
        const value = '100 20,300';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '100 20.300'", () => {
        const value = '100 20.300';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '100 20,300'", () => {
        const value = '100 20,300';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '-0,001' (indecisive)", () => {
        const value = '-0,001';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INDECISIVE_NUMBER_STRING);
    });
    it("should throw an error for '100.000'", () => {
        const value = '100.000';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INDECISIVE_NUMBER_STRING);
    });
    it("should throw an error for '100,000'", () => {
        const value = '100,000';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INDECISIVE_NUMBER_STRING);
    });
    it("should throw an error for '1.2.3'", () => {
        const value = '1.2.3';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '1.2.300'", () => {
        const value = '1.2.300';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '100.20.300'", () => {
        const value = '100.20.300';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '2e9'", () => {
        const value = '2e9';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '2E9'", () => {
        const value = '2E9';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '1 2'", () => {
        const value = '1 2';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '1 20'", () => {
        const value = '1 20';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '122 20'", () => {
        const value = '122 20';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '12 100.000,50'", () => {
        const value = '12 100.000.50';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '1.100.000 50'", () => {
        const value = '1.100.000 50';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
    it("should throw an error for '1,100 50'", () => {
        const value = '1,000 50';
        expect(() => parseNumberString(value)).toThrow(ParseNumberStringError.INVALID_NUMBER_FORMAT);
    });
});
