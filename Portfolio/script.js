document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.dataset.key;

    // Save ONLY if not already saved
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, el.innerText.trim());
    }
  });


  // ===== SECRET LOGO ACTIVATION =====
  let logoClicks = 0;
  const logo = document.querySelector(".logo");

  if (logo) {
    logo.addEventListener("click", () => {
      logoClicks++;
      if (logoClicks === 7) {
        localStorage.setItem("isAdmin", "true");
        alert("✅ Admin unlocked");
        window.location.href = "admin-editor.html";
      }
    });
  }


  // ===== LOAD ADMIN CONTENT =====
  document.querySelectorAll("[data-key]").forEach(el => {
  const saved = localStorage.getItem(el.dataset.key);
  if (saved) el.innerText = saved;
  });

  document.querySelectorAll("[data-img]").forEach(img => {
  const savedImg = localStorage.getItem(img.dataset.img);
  if (savedImg) img.src = savedImg;
});



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
      .then(() => {
        alert("✅ Email sent successfully!");
        contactForm.reset();
      })
      .catch(() => {
        alert("❌ Failed to send email. Please try again.");
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

  // ================= CHATBOT =================
  const chatBody = document.querySelector(".chat-body");
  const messageInput = document.querySelector(".message-input");
  const sendMessageButton = document.querySelector("#send-message");
  const fileInput = document.querySelector("#file-input");
  const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
  const fileCancelButton = document.querySelector("#file-cancel");
  const chatbotToggler = document.querySelector("#chatbot-toggler");
  const closeChatbot = document.querySelector("#close-chatbot");

  API_KEY = "AIzaSyBKxikU-Q2EwYW26CYyS_1YWLc3NFNKqVE";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  // ✅ ✅ SYSTEM PROMPT (YOUR PORTFOLIO INFO)
  const SYSTEM_PROMPT = `
You are an AI chatbot embedded in the personal portfolio website of Rhoanne.

ABOUT Rhoanne:
- BSIT student (Freshman)
- Aspiring Web and Software Developer
- Skills: HTML, CSS, JavaScript, PHP, MySQL, Java, Kotlin, Android, SQLite
- Projects:
  1. Goyo - A sleep monitoring app to help users track their sleep and improve their overall well-being.
  2. Epic Saga Fan Page - A sing-along/listening webpage for "Epic: The Musical," featuring all the songs from the famous internet musical.
  3. Simple games made using Godot
  4. Art samples during Pandemic
- Experience Level: Academic / Student Projects

RULES:
- Speak professionally but friendly
- Represent Rhoanne accurately
- Do not invent job experience or companies
- Encourage contacting Rhoanne when asked about hiring
`;

  const userData = {
    message: null,
    file: { data: null, mime_type: null }
  };

  // ✅ ✅ CHAT HISTORY INITIALIZED WITH SYSTEM PROMPT
  const chatHistory = [
    {
      role: "user",
      parts: [{ text: SYSTEM_PROMPT }]
    }
  ];

  const initialInputHeight = messageInput.scrollHeight;

  const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
  };

  const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");

    chatHistory.push({
      role: "user",
      parts: [
        { text: userData.message },
        ...(userData.file.data ? [{ inline_data: userData.file }] : [])
      ]
    });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: chatHistory })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);

      const apiResponseText =
        data.candidates[0].content.parts[0].text
          .replace(/\*\*(.*?)\*\*/g, "$1")
          .trim();

      messageElement.innerText = apiResponseText;

      // ✅ ✅ FIXED: Store actual bot reply
      chatHistory.push({
        role: "model",
        parts: [{ text: apiResponseText }]
      });

    } catch (error) {
      messageElement.innerText = error.message;
      messageElement.style.color = "#ff0000";
    } finally {
      userData.file = {};
      incomingMessageDiv.classList.remove("thinking");
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    }
  };

  const handleOutgoingMessage = (e) => {
    e.preventDefault();

    userData.message = messageInput.value.trim();
    messageInput.value = "";

    const outgoingMessageDiv = createMessageElement(
      `<div class="message-text">${userData.message}</div>`,
      "user-message"
    );

    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

    setTimeout(() => {
      const incomingMessageDiv = createMessageElement(
        `<div class="message-text">
           <div class="thinking-indicator">
             <div class="dot"></div>
             <div class="dot"></div>
             <div class="dot"></div>
           </div>
         </div>`,
        "bot-message",
        "thinking"
      );

      chatBody.appendChild(incomingMessageDiv);
      generateBotResponse(incomingMessageDiv);
    }, 600);
  };

  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && messageInput.value.trim() && !e.shiftKey) {
      handleOutgoingMessage(e);
    }
  });

  sendMessageButton.addEventListener("click", handleOutgoingMessage);

  chatbotToggler.addEventListener("click", () =>
    document.body.classList.toggle("show-chatbot")
  );

  closeChatbot.addEventListener("click", () =>
    document.body.classList.remove("show-chatbot")
  );
});

// ===== PROJECT LINKS =====
function openGoyo() {
  window.open("https://www.figma.com/design/84qFCpq9ekGTrzHzSxGX5P/Rhoanne-Kyla-Maclang-s-team-library", "_blank");
}

function openEpic() {
  window.open("https://hanner0.github.io/Sia-Final-Project/");
}

function openGithub() {
  window.open("https://github.com/HanNer0/Prortfolio-Project");
}

function openInsta() {
  window.open("https://www.instagram.com/kulot_lng/");
}

