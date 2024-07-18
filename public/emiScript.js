function updateAmount(value) {
    document.getElementById('amountValue').innerText = `₹${Number(value).toLocaleString()}`;
    calculateEMI();
}

function updateInterest(value) {
    document.getElementById('interestValue').innerText = `${parseFloat(value).toFixed(2)}%`;
    calculateEMI();
}

function updateYears(value) {
    document.getElementById('yearsValue').innerText = `${value} years`;
    calculateEMI();
}

function calculateEMI() {
    let amount = document.getElementById('amount').value;
    let interestRate = document.getElementById('interest').value / 100 / 12;
    let years = document.getElementById('years').value;
    let months = years * 12;

    let emi = amount * interestRate * Math.pow(1 + interestRate, months) / (Math.pow(1 + interestRate, months) - 1);
    emi = isFinite(emi) ? emi : 0;

    document.getElementById('emiValue').innerText = `₹${emi.toFixed(2).toLocaleString()}`;
}

document.addEventListener('DOMContentLoaded', calculateEMI);
