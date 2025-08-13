// Background Service Worker for Content Masking Extension
console.log("Background script loaded");

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);

  if (details.reason === "install") {
    // Set default settings on first install
    const defaultSettings = {
      enableMasking: false,
      maskEmails: true,
      maskPhones: true,
      maskCreditCards: true,
      maskSSN: true,
      customRules: [],
    };

    chrome.storage.sync.set(defaultSettings, () => {
      console.log("Default settings configured:", defaultSettings);
    });

    // Open welcome page
    chrome.tabs.create({
      url: chrome.runtime.getURL("welcome.html"),
    });
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Background received message:", request);

  switch (request.action) {
    case "getMaskingStatus":
      getMaskingStatus(sendResponse);
      return true; // Indicates async response

    case "toggleMasking":
      toggleMasking(request.enabled, sendResponse);
      return true;

    default:
      console.log("Unknown message action:", request.action);
  }
});

// Helper functions
function getMaskingStatus(sendResponse) {
  chrome.storage.sync.get(
    [
      "enableMasking",
      "maskEmails",
      "maskPhones",
      "maskCreditCards",
      "maskSSN",
      "customRules",
    ],
    (settings) => {
      sendResponse({
        success: true,
        enabled: settings.enableMasking,
        settings: settings,
      });
    }
  );
}

function toggleMasking(enabled, sendResponse) {
  chrome.storage.sync.set({ enableMasking: enabled }, () => {
    sendResponse({
      success: true,
      enabled: enabled,
    });
  });
}
