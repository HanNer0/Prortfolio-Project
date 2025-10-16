// ====== MENU TOGGLE ======
const menuIcon = document.getElementById('.menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
  navbar.classList.toggle('active');
});


// ====== BACKGROUND PARTICLES ======
const bg = document.querySelector(".background-particles");
if (bg) {
  for (let i = 0; i < 40; i++) {
    const dot = document.createElement("span");
    dot.classList.add("particle");
    dot.style.left = Math.random() * 100 + "vw";
    dot.style.animationDuration = 5 + Math.random() * 10 + "s";
    dot.style.width = dot.style.height = Math.random() * 6 + "px";
    bg.appendChild(dot);
  }
}

// ====== IMAGE POPUP ======
const popup = document.getElementById("imagePopup");
const popupImg = popup.querySelector("img");

document.querySelectorAll(".floating-image").forEach(img => {
  img.addEventListener("click", () => {
    popupImg.src = img.src;
    popup.style.display = "flex";
  });
});

popup.addEventListener("click", () => {
  popup.style.display = "none";
});
