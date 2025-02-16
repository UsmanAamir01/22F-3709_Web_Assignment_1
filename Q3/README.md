# Task 3 – Selective String Reversal with Dynamic List Population

I implemented this task by creating an interactive tool that reverses a user-input string while skipping every N-th character. The skip interval (N) is determined by summing the digits of my roll number, though I also provided an option for manual input as a bonus. The transformation preserves the positions of skipped characters, and the original and transformed strings are added dynamically to a list.

I used modern JavaScript features like arrow functions, `map()`, `reduce()`, and a `Set` to handle the logic efficiently, ensuring that the UI updates in real-time without page reloads.

## Files:

- `index.html`
- `style.css`
- `script.js`

## How to Run:

1. Open `index.html` in your web browser.
2. Enter your input string and roll number (or an optional manual skip interval).
3. Click the "Transform" button.
4. Observe the original and transformed strings appear dynamically in the results list.
