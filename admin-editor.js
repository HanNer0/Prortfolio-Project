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

  /*============================
      RESET POPUP
  ============================*/
  resetBtn.addEventListener("click", () => {
    warningPopup.style.display = "flex";
  });

  cancelResetBtn.addEventListener("click", () => {
    warningPopup.style.display = "none";
  });

  confirmResetBtn.addEventListener("click", () => {
    warningPopup.style.display = "none";
    
    // Clear ALL localStorage
    localStorage.clear();

    // Reset all textareas
    document.querySelectorAll("textarea[data-key]").forEach(t => t.value = "");

    // Reset all images to default
    document.querySelectorAll("[data-img]").forEach(img => {
      const defaultSrc = img.getAttribute("data-default");
      if (defaultSrc) {
        img.src = defaultSrc;
      }
    });

    alert("All changes reset successfully!");
  });


  /*============================
      SAVE POPUP
  ============================*/
  saveBtn.onclick = () => modal.style.display = "block";
  cancelBtn.onclick = () => modal.style.display = "none";

  confirmBtn.onclick = () => {
    // Save textarea values
    document.querySelectorAll("textarea[data-key]").forEach(t => {
      localStorage.setItem(t.dataset.key, t.value);
    });

    alert("Changes saved successfully!");
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };


  /*============================
      LOAD STORED TEXT
  ============================*/
  document.querySelectorAll("textarea[data-key]").forEach(textarea => {
    const savedText = localStorage.getItem(textarea.dataset.key);
    if (savedText) textarea.value = savedText;
  });


  /*============================
      LOAD STORED IMAGES
  ============================*/
  document.querySelectorAll("[data-img]").forEach(img => {
    const key = img.dataset.img;

    // Store ORIGINAL image src
    if (!img.getAttribute("data-default")) {
      img.setAttribute("data-default", img.src);
    }

    const savedImage = localStorage.getItem(key);
    if (savedImage) {
      img.src = savedImage;
    }
  });


  /*============================
      IMAGE UPLOAD HANDLING
  ============================*/
  document.querySelectorAll("[data-img-input]").forEach(input => {
    input.addEventListener("change", () => {
      const file = input.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        const imageKey = input.dataset.imgInput;

        // Preview element
        const previewImg = document.querySelector(`[data-img="${imageKey}"]`);
        if (!previewImg) return;

        // Save to localStorage
        localStorage.setItem(imageKey, reader.result);

        // Update preview instantly
        previewImg.src = reader.result;
      };

      reader.readAsDataURL(file);
    });
  });

});
