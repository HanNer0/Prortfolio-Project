document.addEventListener("DOMContentLoaded", () => {

  // ====== MENU TOGGLE ======
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');

  menuIcon.addEventListener('click', () => {
  navbar.classList.toggle('active');
  menuIcon.classList.toggle('bx-x'); 
  });

  //===== Sending Message to Google Email =====//
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", sendMail);
  }

  function sendMail(event) {
    event.preventDefault();

    let params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phoneNum: document.getElementById("phoneNum").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    emailjs.send("service_jqouhiq", "template_is8a3pi", params)
      .then(function(response) {
        alert("✅ Email sent successfully!");
        console.log("SUCCESS!", response.status, response.text);
        contactForm.reset();
      })
      .catch(function(error) {
        alert("❌ Failed to send email. Please try again.");
        console.error("FAILED...", error);
      });
  }

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
  const popupImg = popup?.querySelector("img");

  document.querySelectorAll(".floating-image").forEach(img => {
    img.addEventListener("click", () => {
      popupImg.src = img.src;
      popup.style.display = "flex";
    });
  });

  popup?.addEventListener("click", () => {
    popup.style.display = "none";
  });

});


//Reviewing Project
function openGoyo(){
  window.open("https://www.figma.com/design/84qFCpq9ekGTrzHzSxGX5P/Rhoanne-Kyla-Maclang-s-team-library?node-id=0-1&t=HLTDvMoXqhUgHvpd-1",'_blank')
}

function openEpic(){
  window.open("https://hanner0.github.io/Sia-Final-Project/")
  }