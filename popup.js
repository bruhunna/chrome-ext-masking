document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleMasking");
  const messageBox = document.getElementById("messageBox");
  const instructions = document.getElementById("instructions");

  // Function to display messages in the popup
  function showMessage(message, type = "success") {
    messageBox.textContent = message;
    messageBox.style.display = "block";
    if (type === "error") {
      messageBox.style.backgroundColor = "#ffe0b2"; // Light orange
      messageBox.style.borderColor = "#ffb74d";
      messageBox.style.color = "#e65100"; // Dark orange
    } else {
      messageBox.style.backgroundColor = "#e8f5e9"; // Light green
      messageBox.style.borderColor = "#c8e6c9";
      messageBox.style.color = "#28a745"; // Dark green
    }
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 3000); // Hide after 3 seconds
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
            toggleButton.textContent = "Activate Masking Mode";
            toggleButton.style.backgroundColor = "#3498db";
          } else if (response && response.isMaskingActive) {
            toggleButton.textContent = "Deactivate Masking Mode";
            toggleButton.style.backgroundColor = "#e74c3c"; // Red for active
            instructions.classList.add("active");
          } else {
            toggleButton.textContent = "Activate Masking Mode";
            toggleButton.style.backgroundColor = "#3498db"; // Blue for inactive
            instructions.classList.remove("active");
          }
        }
      );
    }
  });

  toggleButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const tabId = tabs[0].id;
        // Send a message to the content script in the active tab
        chrome.tabs.sendMessage(
          tabId,
          { type: "TOGGLE_MASKING" },
          (response) => {
            if (chrome.runtime.lastError) {
              showMessage(
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
              if (response.isMaskingActive) {
                toggleButton.textContent = "Deactivate Masking Mode";
                toggleButton.style.backgroundColor = "#e74c3c"; // Red
                instructions.classList.add("active");
                showMessage(
                  "Masking mode activated! Hold Ctrl/Cmd + Click elements to mask them."
                );
              } else {
                toggleButton.textContent = "Activate Masking Mode";
                toggleButton.style.backgroundColor = "#3498db"; // Blue
                instructions.classList.remove("active");
                showMessage("Masking mode deactivated.");
              }
            } else {
              showMessage("Failed to toggle masking mode.", "error");
            }
          }
        );
      } else {
        showMessage("No active tab found.", "error");
      }
    });
  });
});
