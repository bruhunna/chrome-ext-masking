let isMaskingActive = false;
let maskedElements = new Set(); // Stores references to masked elements

// Function to apply masking style
function applyMaskingStyle(element) {
  if (element && !maskedElements.has(element)) {
    element.style.backgroundColor = "#333"; // Dark background
    element.style.color = "transparent"; // Hide text color
    element.style.textShadow = "none"; // Ensure text shadow is removed
    element.style.setProperty("filter", "blur(8px)", "important"); // Apply blur
    element.style.setProperty("-webkit-filter", "blur(8px)", "important"); // For webkit browsers
    element.style.transition = "all 0.3s ease-in-out"; // Smooth transition
    element.style.cursor = "not-allowed"; // Indicate it's masked
    element.dataset.originalContent = element.innerHTML; // Store original content
    element.innerHTML = "██████"; // Placeholder content
    element.style.overflow = "hidden"; // Hide overflowing content
    maskedElements.add(element);
  }
}

// Function to remove masking style
function removeMaskingStyle(element) {
  if (element && maskedElements.has(element)) {
    element.style.backgroundColor = "";
    element.style.color = "";
    element.style.textShadow = "";
    element.style.filter = "";
    element.style.setProperty("-webkit-filter", "", "important");
    element.style.transition = "";
    element.style.cursor = "";
    if (element.dataset.originalContent) {
      element.innerHTML = element.dataset.originalContent; // Restore original content
      delete element.dataset.originalContent;
    }
    element.style.overflow = "";
    maskedElements.delete(element);
  }
}

// Click event listener for masking
function handlePageClick(event) {
  if (isMaskingActive) {
    event.preventDefault(); // Prevent default link/button actions
    event.stopPropagation(); // Stop event bubbling

    const targetElement = event.target;
    if (maskedElements.has(targetElement)) {
      removeMaskingStyle(targetElement); // Unmask if already masked
    } else {
      applyMaskingStyle(targetElement); // Mask the clicked element
    }
  }
}

// Highlight effect when hovering in masking mode
function handleMouseMove(event) {
  if (isMaskingActive) {
    // Remove highlight from previously highlighted element
    const currentHighlighted = document.querySelector(
      ".element-masker-highlight"
    );
    if (currentHighlighted && currentHighlighted !== event.target) {
      currentHighlighted.classList.remove("element-masker-highlight");
    }

    // Add highlight to the new target
    if (
      event.target &&
      !event.target.classList.contains("element-masker-highlight")
    ) {
      event.target.classList.add("element-masker-highlight");
    }
  }
}

function handleMouseOut(event) {
  if (isMaskingActive && event.target) {
    event.target.classList.remove("element-masker-highlight");
  }
}

// Inject CSS for highlighting elements
function injectHighlightCSS() {
  const style = document.createElement("style");
  style.id = "element-masker-highlight-style";
  style.textContent = `
        .element-masker-highlight {
            outline: 2px solid #3498db !important; /* Blue border */
            cursor: pointer !important;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.5) !important; /* Blue shadow */
            transition: outline 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
            border-radius: 4px;
        }
    `;
  document.head.appendChild(style);
}

// Remove injected CSS
function removeHighlightCSS() {
  const style = document.getElementById("element-masker-highlight-style");
  if (style) {
    style.remove();
  }
}

// Listener for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "TOGGLE_MASKING") {
    isMaskingActive = !isMaskingActive; // Toggle the state
    if (isMaskingActive) {
      document.addEventListener("click", handlePageClick, true); // Use capture phase
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseout", handleMouseOut);
      injectHighlightCSS();
      // Store the state in sessionStorage so it persists across page reloads
      sessionStorage.setItem("elementMaskingActive", "true");
      console.log("Element Masking: ACTIVATED");
    } else {
      document.removeEventListener("click", handlePageClick, true);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      removeHighlightCSS();
      // Unmask all elements when mode is deactivated
      maskedElements.forEach((el) => removeMaskingStyle(el));
      sessionStorage.setItem("elementMaskingActive", "false");
      console.log("Element Masking: DEACTIVATED");
    }
    sendResponse({ isMaskingActive: isMaskingActive });
  } else if (request.type === "GET_MASKING_STATE") {
    sendResponse({ isMaskingActive: isMaskingActive });
  }
});

// Check if masking was active on previous page load (from sessionStorage)
window.addEventListener("load", () => {
  if (sessionStorage.getItem("elementMaskingActive") === "true") {
    isMaskingActive = true;
    document.addEventListener("click", handlePageClick, true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);
    injectHighlightCSS();
    console.log("Element Masking: Auto-activated on page load.");
  }
});
