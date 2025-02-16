document.addEventListener("DOMContentLoaded", () => {
  const accountForm = document.getElementById("accountForm");
  const rollNumberInput = document.getElementById("rollNumber");
  const accountCreationSection = document.getElementById("accountCreation");
  const accountSection = document.getElementById("accountSection");
  const accountNumberElem = document.getElementById("accountNumber");
  const currentBalanceElem = document.getElementById("currentBalance");
  const transactionForm = document.getElementById("transactionForm");
  const transactionTypeElem = document.getElementById("transactionType");
  const transactionAmountElem = document.getElementById("transactionAmount");
  const transactionHistoryElem = document.getElementById("transactionHistory");
  const messageElem = document.getElementById("message");
  const downloadBtn = document.getElementById("downloadBtn");

  let accountNumber = "";
  let baseDeposit = 0;
  let transactions = [];

  const calculateBalance = () =>
    transactions.reduce(
      (balance, txn) =>
        txn.type === "withdrawal" ? balance - txn.amount : balance + txn.amount,
      0
    );

  const renderTransactions = () => {
    transactionHistoryElem.innerHTML = "";
    transactions.forEach((txn) => {
      const li = document.createElement("li");
      li.className =
        txn.type === "deposit" ? "transaction-income" : "transaction-expense";
      li.innerHTML = `<strong>[${
        txn.date
      }]</strong> ${txn.type.toUpperCase()} : <span class="transaction-amount">PKR ${
        txn.amount
      }</span>`;
      transactionHistoryElem.appendChild(li);
    });
    currentBalanceElem.textContent = calculateBalance();
    transactionHistoryElem.style.display = transactions.length
      ? "block"
      : "none";
  };

  accountForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const rollNumberValue = rollNumberInput.value.trim();

    const rollNumberPattern = /^\d{2}[A-Za-z]-\d{4}$/;

    if (!rollNumberValue) {
      alert("Roll number is required.");
      return;
    }
    if (!rollNumberPattern.test(rollNumberValue)) {
      alert("Invalid roll number format. Use the format: 22F-XXXX.");
      return;
    }

    accountNumber = `ACC-${rollNumberValue}`;
    accountNumberElem.textContent = accountNumber;

    const digits = rollNumberValue.match(/\d/g);
    const lastDigit = digits ? parseInt(digits[digits.length - 1]) || 1 : 1;
    baseDeposit = lastDigit * 1000;

    transactions = [
      {
        id: Date.now(),
        type: "deposit",
        amount: baseDeposit,
        date: new Date().toLocaleString(),
      },
    ];

    accountCreationSection.style.display = "none";
    accountSection.style.display = "block";

    renderTransactions();
  });

  transactionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    messageElem.textContent = "";
    messageElem.style.display = "none";

    const txnType = transactionTypeElem.value;
    const amount = parseFloat(transactionAmountElem.value);
    if (isNaN(amount) || amount <= 0) {
      messageElem.textContent = "Enter a valid amount.";
      messageElem.style.display = "block";
      return;
    }

    const currentBalance = calculateBalance();

    if (txnType === "deposit") {
      if (amount < baseDeposit || amount % baseDeposit !== 0) {
        messageElem.textContent = `Deposit must be at least PKR ${baseDeposit} and in multiples of ${baseDeposit}.`;
        messageElem.style.display = "block";
        return;
      }
    } else if (txnType === "withdrawal") {
      if (amount > currentBalance * 0.8) {
        messageElem.textContent = `You can only withdraw up to 80% of your balance (PKR ${Math.floor(
          currentBalance * 0.8
        )}).`;
        messageElem.style.display = "block";
        return;
      }
      if (amount > currentBalance) {
        messageElem.textContent = "Insufficient balance.";
        messageElem.style.display = "block";
        return;
      }
    }

    transactions.push({
      id: Date.now(),
      type: txnType,
      amount,
      date: new Date().toLocaleString(),
    });
    renderTransactions();

    transactionAmountElem.value = "";
  });

  downloadBtn.addEventListener("click", () => {
    if (!transactions.length) return;
    const content = transactions
      .map(
        (txn) => `[${txn.date}] ${txn.type.toUpperCase()} : PKR ${txn.amount}`
      )
      .join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${accountNumber}_transaction_history.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});
