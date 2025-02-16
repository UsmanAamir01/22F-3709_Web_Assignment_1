# Task 4 – Bank Account System

I implemented this task by developing a bank account simulation where the account details are derived from my roll number. The account number is generated using the roll number, and the initial deposit is calculated by multiplying the last digit of the roll number by 1000 PKR.

The system supports deposits and withdrawals while enforcing constraints:

- Deposits must be multiples of the base deposit.
- Withdrawals cannot exceed 80% of the current balance.

I used `reduce()` to calculate the total balance from the transaction history, and I dynamically update the transaction history in the UI. As a bonus, I added a feature to download the transaction history as a `.txt` file.

## Files:

- `index.html`
- `style.css`
- `script.js`

## How to Run:

1. Open `index.html` in your web browser.
2. Enter your roll number to create an account.
3. Use the transaction form to perform deposits or withdrawals.
4. View the updated transaction history and current balance.
5. (Bonus) Click the download button to save your transaction history as a text file.
