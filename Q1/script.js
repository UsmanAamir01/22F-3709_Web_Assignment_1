document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      name: "Wireless Headphones",
      price: "$199",
      image: "/images/wireless_headphones.jpg",
      description:
        "Premium noise-canceling wireless headphones with 30-hour battery life.",
    },
    {
      name: "Smart Watch",
      price: "$299",
      image: "/images/smart_watch.jpg",
      description:
        "Advanced smart watch with health monitoring and GPS tracking.",
    },
    {
      name: "4K Camera",
      price: "$899",
      image: "/images/4k_camera.jpg",
      description: "Professional 4K video camera with 20x optical zoom.",
    },
    {
      name: "Gaming Laptop",
      price: "$1299",
      image: "/images/gaming_laptop.jpg",
      description:
        "High-performance gaming laptop with the latest graphics and fast processor.",
    },
  ];

  const container = document.querySelector(".products-container");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const toggleIcon = document.getElementById("toggleIcon");

  // Create product cards
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const cardInner = document.createElement("div");
    cardInner.className = "card-inner";

    // Front side
    const front = document.createElement("div");
    front.className = "front";
    front.innerHTML = `
      <img src="${product.image}" class="product-image" alt="${product.name}">
      <div class="product-name">${product.name}</div>
      <div class="product-price">${product.price}</div>
    `;

    const back = document.createElement("div");
    back.className = "back";
    back.innerHTML = `
      <div class="product-description">${product.description}</div>
      <button class="buy-button">Buy Now</button>
    `;

  
    const buyButton = back.querySelector(".buy-button");
    buyButton.addEventListener("click", () => {
      console.log(`Purchase initiated for: ${product.name}`);
    });

    cardInner.appendChild(front);
    cardInner.appendChild(back);
    card.appendChild(cardInner);
    container.appendChild(card);
  });

  const updateToggleIcon = () => {
    if (document.body.classList.contains("dark-mode")) {
      if (toggleIcon) toggleIcon.src = "/images/dark_mode_icon.png";
    } else {
      if (toggleIcon) toggleIcon.src = "/images/light_mode_icon.png";
    }
  };

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  updateToggleIcon();

  if (darkModeToggle && toggleIcon) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
      updateToggleIcon();
    });
  } else {
    console.warn("Dark mode toggle elements not found.");
  }
});
