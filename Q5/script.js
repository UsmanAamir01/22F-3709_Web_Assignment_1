document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Smartphone", price: 30000 },
    { id: 3, name: "Headphones", price: 5000 },
    { id: 4, name: "Smartwatch", price: 8000 },
  ];

  const rollNumberElem = document.getElementById("rollNumber");
  const promoCodeElem = document.getElementById("promoCode");
  const productListElem = document.getElementById("productList");
  const originalPriceElem = document.getElementById("originalPrice");
  const discountPercentElem = document.getElementById("discountPercent");
  const finalPriceElem = document.getElementById("finalPrice");

  const renderProducts = () => {
    productListElem.innerHTML = "";
    products.map((product) => {
      const productDiv = document.createElement("div");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `product-${product.id}`;
      checkbox.value = product.id;

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.textContent = `${product.name} (PKR ${product.price})`;

      productDiv.appendChild(checkbox);
      productDiv.appendChild(label);
      productListElem.appendChild(productDiv);
    });
  };

  renderProducts();
  const getRollDiscount = (rollNumber) => {
    const parts = rollNumber.split("-");
    if (parts.length < 2) return 0;
    const digitsPart = parts[1];
    if (digitsPart.length < 2) return 0;

    const middleTwo = digitsPart.substring(1, 3);
    return parseInt(middleTwo) || 0;
  };

  const calculateEffectiveDiscount = () => {
    const rollNumber = rollNumberElem.value.trim();
    let rollDiscount = getRollDiscount(rollNumber);

    const selectedProductIds = new Set(
      Array.from(
        document.querySelectorAll('#productList input[type="checkbox"]:checked')
      ).map((cb) => parseInt(cb.value))
    );
    const maxDiscount = selectedProductIds.size >= 2 ? 60 : 50;

    const promoCode = promoCodeElem.value.trim();
    const extraDiscount = promoCode.toUpperCase() === "USMAN10" ? 10 : 0;

    let totalDiscount = rollDiscount + extraDiscount;
    if (totalDiscount > maxDiscount) totalDiscount = maxDiscount;
    return totalDiscount;
  };

  const updatePrices = () => {
    const selectedIds = Array.from(
      document.querySelectorAll('#productList input[type="checkbox"]:checked')
    ).map((cb) => parseInt(cb.value));

    const selectedProducts = products.filter((product) =>
      selectedIds.includes(product.id)
    );

    const originalTotal = selectedProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );
    originalPriceElem.textContent = originalTotal;

    const discountPercent = calculateEffectiveDiscount();
    discountPercentElem.textContent = discountPercent;

    const finalTotal = originalTotal * (1 - discountPercent / 100);
    finalPriceElem.textContent = finalTotal.toFixed(2);
  };
  rollNumberElem.addEventListener("input", updatePrices);
  promoCodeElem.addEventListener("input", updatePrices);
  productListElem.addEventListener("change", updatePrices);
});
