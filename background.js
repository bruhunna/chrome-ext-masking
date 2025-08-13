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

// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  console.log("Keyboard command received:", command);

  if (command === "toggle-masking") {
    toggleMaskingViaShortcut();
  } else if (command === "clear-all-masks") {
    clearAllMasksViaShortcut();
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

    case "updateBadge":
      updateBadge(request.count, sender.tab.id);
      break;

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

// Keyboard shortcut handlers
function toggleMaskingViaShortcut() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggleMaskingMode" });
    }
  });
}

function clearAllMasksViaShortcut() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "clearAllMasks" });
    }
  });
}

// Badge counter update
function updateBadge(count, tabId) {
  const badgeText = count > 0 ? count.toString() : "";
  const badgeColor = count > 0 ? "#2563eb" : "#d1d5db";

  chrome.action.setBadgeText({
    text: badgeText,
    tabId: tabId,
  });

  chrome.action.setBadgeBackgroundColor({
    color: badgeColor,
    tabId: tabId,
  });
}
