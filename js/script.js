// ====== MENU TOGGLE ======
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

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
const popup = document.createElement("div");
popup.className = "image-popup";
popup.innerHTML = `<img src="" alt="popup image">`;
document.body.appendChild(popup);

const popupImg = popup.querySelector("img");

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("click", () => {
    popupImg.src = img.src;
    popup.classList.add("active");
  });
});

popup.addEventListener("click", () => {
  popup.classList.remove("active");
});
