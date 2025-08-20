// Set year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});

// Shape filter
const shapeFilter = document.getElementById("shapeFilter");
const cards = document.querySelectorAll(".card");

shapeFilter.addEventListener("change", (e) => {
  const value = e.target.value;
  cards.forEach(card => {
    const shape = card.dataset.shape;
    card.style.display = (value === "all" || value === shape) ? "block" : "none";
  });
});

// Contact form (demo only)
document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  alert(`Thanks, ${data.get("name")}! I will reply to ${data.get("email")}.`);
  e.target.reset();
});
