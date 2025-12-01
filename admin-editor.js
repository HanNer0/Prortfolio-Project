document.addEventListener("DOMContentLoaded", () => {

  // Get elements
const modal = document.getElementById("saveModal");
const saveBtn = document.getElementById("saveAll");
const confirmBtn = document.getElementById("confirmSave");
const cancelBtn = document.getElementById("cancelSave");

const resetBtn = document.getElementById("resetAll");
const warningPopup = document.getElementById("resetWarning");
const confirmResetBtn = document.getElementById("confirmReset");
const cancelResetBtn = document.getElementById("cancelReset");

// Show warning popup
resetBtn.addEventListener("click", () => {
  warningPopup.style.display = "flex";
});

// Cancel button hides warning popup
cancelResetBtn.addEventListener("click", () => {
  warningPopup.style.display = "none";
});

// Confirm button resets
confirmResetBtn.addEventListener("click", () => {
  warningPopup.style.display = "none";
  localStorage.clear(); // Clear all saved text/images
  document.querySelectorAll("textarea[data-key]").forEach(t => t.value = "");
  console.log("All changes have been reset!");
});



// Show modal when Save All clicked
saveBtn.onclick = () => modal.style.display = "block";

// Cancel button hides modal
cancelBtn.onclick = () => modal.style.display = "none";

// Confirm button saves changes
confirmBtn.onclick = () => {
    // Save all textarea values to localStorage
    document.querySelectorAll("textarea[data-key]").forEach(t => {
        localStorage.setItem(t.dataset.key, t.value);
    });

    alert("✅ Changes saved successfully!");
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};



  // Load text into textareas
  document.querySelectorAll("textarea[data-key]").forEach(textarea => {
    const key = textarea.dataset.key;
    const savedText = localStorage.getItem(key);

    if (savedText) {
      textarea.value = savedText;
    }
  });

  

  // ===== IMAGE HANDLING =====

// Load saved images
// ===== IMAGE HANDLING =====
document.querySelectorAll("[data-img]").forEach(img => {
  const key = img.dataset.img;
  const savedImg = localStorage.getItem(key);

  // If admin-uploaded image exists, use it
  if (savedImg) {
    img.src = savedImg;
  }
  // Else keep the default src from HTML (portfolio image)
});


// Handle image uploads
document.querySelectorAll("[data-img-input]").forEach(input => {
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imgKey = input.dataset.imgInput;
      const previewImg = document.querySelector(`[data-img="${imgKey}"]`);

      // Save image
      localStorage.setItem(imgKey, reader.result);

      // Preview instantly
      previewImg.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
});


});
