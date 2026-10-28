'use strict';

document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();

  const error = document.getElementById('error');
  const result = document.getElementById('result');
  error.textContent = '';

  const income = Number(document.getElementById('income').value);

  try {
    document.getElementById('tax').textContent = TaxCalculator.calculateTax(income).toFixed(2);
    document.getElementById('net').textContent = TaxCalculator.calculateNetIncome(income).toFixed(2);
    document.getElementById('rate').textContent = (TaxCalculator.effectiveRate(income) * 100).toFixed(2) + '%';
    result.hidden = false;
  } catch (e) {
    result.hidden = true;
    error.textContent = e.message;
  }
});
