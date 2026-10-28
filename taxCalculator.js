'use strict';

// Works in the browser (global TaxCalculator) and in Node/Jasmine (module.exports).
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TaxCalculator = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  // Illustrative progressive tax brackets (upper limit, rate).
  const BRACKETS = [
    { upTo: 10000, rate: 0.0 },
    { upTo: 40000, rate: 0.1 },
    { upTo: 90000, rate: 0.2 },
    { upTo: Infinity, rate: 0.3 }
  ];

  function validateIncome(income) {
    if (typeof income !== 'number' || !Number.isFinite(income)) {
      throw new TypeError('Income must be a finite number');
    }
    if (income < 0) {
      throw new RangeError('Income cannot be negative');
    }
  }

  function calculateTax(income) {
    validateIncome(income);
    let tax = 0;
    let lower = 0;
    for (const { upTo, rate } of BRACKETS) {
      if (income > lower) {
        tax += (Math.min(income, upTo) - lower) * rate;
      }
      lower = upTo;
    }
    return Math.round(tax * 100) / 100;
  }

  function calculateNetIncome(income) {
    return Math.round((income - calculateTax(income)) * 100) / 100;
  }

  function effectiveRate(income) {
    validateIncome(income);
    if (income === 0) return 0;
    return Math.round((calculateTax(income) / income) * 10000) / 10000;
  }

  return { calculateTax, calculateNetIncome, effectiveRate, BRACKETS };
});
