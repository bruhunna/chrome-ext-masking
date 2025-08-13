document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggleSwitch");
  const statusIndicator = document.getElementById("statusIndicator");
  const instructionsCard = document.getElementById("instructionsCard");
  const messageToast = document.getElementById("messageToast");
  const helpBtn = document.getElementById("helpBtn");
  const testBtn = document.getElementById("testBtn");
  const maskCountElement = document.getElementById("maskCount");
  const currentStyleElement = document.getElementById("currentStyle");
  const blurStyleBtn = document.getElementById("blurStyle");
  const solidStyleBtn = document.getElementById("solidStyle");
  const maskStyleSection = document.getElementById("maskStyleSection");
  const statsSection = document.getElementById("statsSection");

  let currentMaskStyle = "blur";

  // Function to show toast messages
  function showToast(message, type = "success") {
    messageToast.textContent = message;
    messageToast.className = `message-toast show ${
      type === "error" ? "error" : ""
    }`;

    setTimeout(() => {
      messageToast.classList.remove("show");
    }, 3000);
  }

  // Function to update UI state
  function updateUIState(isActive, maskCount = 0, maskStyle = "blur") {
    if (isActive) {
      toggleSwitch.classList.add("active");
      statusIndicator.textContent = "Active";
      statusIndicator.className = "status-indicator active";
      instructionsCard.classList.add("active");
      maskStyleSection.style.display = "block";
      statsSection.style.display = "block";
    } else {
      toggleSwitch.classList.remove("active");
      statusIndicator.textContent = "Inactive";
      statusIndicator.className = "status-indicator inactive";
      instructionsCard.classList.remove("active");
      maskStyleSection.style.display = "none";
      statsSection.style.display = "none";
    }

    // Update mask count
    maskCountElement.textContent = maskCount;

    // Update current style
    currentMaskStyle = maskStyle;
    currentStyleElement.textContent =
      maskStyle.charAt(0).toUpperCase() + maskStyle.slice(1);
    updateStyleButtons();
  }

  // Function to update style buttons
  function updateStyleButtons() {
    blurStyleBtn.classList.toggle("active", currentMaskStyle === "blur");
    solidStyleBtn.classList.toggle("active", currentMaskStyle === "solid");
  }

  // Get the initial state from content script (if active on page load)
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "GET_MASKING_STATE" },
        (response) => {
          if (chrome.runtime.lastError) {
            // This error typically means the content script isn't loaded yet on the current tab,
            // or the tab is a special page (e.g., chrome://extensions) where content scripts don't run.
            console.warn(
              "Could not get masking state from content script:",
              chrome.runtime.lastError.message
            );
            updateUIState(false);
          } else if (response && response.isMaskingActive) {
            updateUIState(
              response.isMaskingActive,
              response.maskCount || 0,
              response.maskStyle || "blur"
            );
          } else {
            updateUIState(false);
          }
        }
      );
    }
  });

  // Toggle switch click handler
  toggleSwitch.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const tabId = tabs[0].id;
        // Send a message to the content script in the active tab
        chrome.tabs.sendMessage(
          tabId,
          { type: "TOGGLE_MASKING" },
          (response) => {
            if (chrome.runtime.lastError) {
              showToast(
                "Cannot activate masking on this page (e.g., Chrome internal pages).",
                "error"
              );
              console.error(
                "Error sending message to content script:",
                chrome.runtime.lastError.message
              );
              return;
            }
            if (response && response.isMaskingActive !== undefined) {
              updateUIState(
                response.isMaskingActive,
                response.maskCount || 0,
                response.maskStyle || "blur"
              );
              if (response.isMaskingActive) {
                showToast(
                  "Masking mode activated! Hold Ctrl/⌘ + Click elements to mask them."
                );
              } else {
                showToast("Masking mode deactivated. All masks cleared.");
              }
            } else {
              showToast("Failed to toggle masking mode.", "error");
            }
          }
        );
      } else {
        showToast("No active tab found.", "error");
      }
    });
  });

  // Help button handler
  helpBtn.addEventListener("click", () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") });
    window.close();
  });

  // Test page button handler
  testBtn.addEventListener("click", () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("test-page.html") });
    window.close();
  });

  // Style button handlers
  function handleStyleChange(newStyle) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "toggleMaskStyle" },
          (response) => {
            if (!chrome.runtime.lastError) {
              currentMaskStyle = newStyle;
              updateStyleButtons();
              currentStyleElement.textContent =
                newStyle.charAt(0).toUpperCase() + newStyle.slice(1);
              showToast(`Mask style changed to ${newStyle}`);
            }
          }
        );
      }
    });
  }

  blurStyleBtn.addEventListener("click", () => {
    if (currentMaskStyle !== "blur") {
      handleStyleChange("blur");
    }
  });

  solidStyleBtn.addEventListener("click", () => {
    if (currentMaskStyle !== "solid") {
      handleStyleChange("solid");
    }
  });

  // Initialize style buttons
  updateStyleButtons();
});
