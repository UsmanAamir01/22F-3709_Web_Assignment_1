# Task 5 – Roll-Number-Based Discount System

I implemented this task by developing an e-commerce discount system where the discount percentage is determined by the middle two digits of my roll number. For example, if the roll number is `21F-9445`, the discount is extracted as 44%. However, the discount is capped at a maximum of 50%, or 60% if I select two or more products (bonus feature).

The application displays a list of products with prices, and users can select one or more products. The total original price is calculated using `reduce()`, and the final price is updated dynamically in real-time based on the discount. I also added an optional promo code field for extra discounts.

## Files:

- `index.html`
- `style.css`
- `script.js`

## How to Run:

1. Open `index.html` in your web browser.
2. Enter your roll number and an optional promo code.
3. Select the products you wish to purchase.
4. Watch the price summary update instantly, showing the original total, applied discount, and final price.
