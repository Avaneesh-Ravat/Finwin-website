function updateIncome(value) {
    document.getElementById('income').value = value;
    document.getElementById('incomeInput').value = value;
    calculateLoan();
}

function updateInterest(value) {
    document.getElementById('interest').value = value;
    document.getElementById('interestInput').value = value;
    calculateLoan();
}

function updateTenure(value) {
    document.getElementById('tenure').value = value;
    document.getElementById('tenureInput').value = value;
    calculateLoan();
}

function updateOtherEmi(value) {
    document.getElementById('otherEmi').value = value;
    document.getElementById('otherEmiInput').value = value;
    calculateLoan();
}

function calculateLoan() {
    let income = parseFloat(document.getElementById('income').value);
    let interestRate = parseFloat(document.getElementById('interest').value) / 100 / 12;
    let tenure = parseInt(document.getElementById('tenure').value) * 12;
    let otherEmi = parseFloat(document.getElementById('otherEmi').value);

    let maxEmi = (income * 0.5) - otherEmi;
    let loanAmount = maxEmi * (Math.pow(1 + interestRate, tenure) - 1) / (interestRate * Math.pow(1 + interestRate, tenure));
    loanAmount = isFinite(loanAmount) ? loanAmount : 0;

    document.getElementById('loanAmount').innerText = `₹${loanAmount.toFixed(2).toLocaleString()}`;

    let emi = loanAmount * interestRate * Math.pow(1 + interestRate, tenure) / (Math.pow(1 + interestRate, tenure) - 1);
    emi = isFinite(emi) ? emi : 0;

    document.getElementById('emiAmount').innerText = `₹${emi.toFixed(2).toLocaleString()}`;
}

document.addEventListener('DOMContentLoaded', calculateLoan);
