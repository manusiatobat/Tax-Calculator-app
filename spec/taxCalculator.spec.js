'use strict';

const { calculateTax, calculateNetIncome, effectiveRate } = require('../taxCalculator');

describe('Tax Calculator', () => {
  it('charges no tax on income within the tax-free allowance', () => {
    expect(calculateTax(10000)).toBe(0);
  });

  it('charges 10% on income in the second bracket', () => {
    expect(calculateTax(30000)).toBe(2000);
  });

  it('applies progressive rates across brackets', () => {
    // 30000 * 0.1 (10k-40k) + 10000 * 0.2 (40k-50k) = 3000 + 2000
    expect(calculateTax(50000)).toBe(5000);
  });

  it('applies the top rate above the highest threshold', () => {
    expect(calculateTax(100000)).toBe(3000 + 10000 + 3000);
  });

  it('calculates net income after tax', () => {
    expect(calculateNetIncome(50000)).toBe(45000);
  });

  it('calculates the effective tax rate', () => {
    expect(effectiveRate(50000)).toBe(0.1);
    expect(effectiveRate(0)).toBe(0);
  });

  it('rejects negative or non-numeric income', () => {
    expect(() => calculateTax(-1)).toThrowError(RangeError);
    expect(() => calculateTax('abc')).toThrowError(TypeError);
  });
});
