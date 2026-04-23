// OpenClaw Guide - Background Service Worker

// Handle side panel on install
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('OpenClaw Guide extension installed');
    
    // Set default settings
    chrome.storage.local.set({
      darkMode: false,
      currentSection: 'overview'
    });
  }
});

// Listen for messages from content script or sidebar
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'OPENCLAW_PAGE') {
    // Store current page for sidebar to read
    chrome.storage.local.set({
      currentPage: message.page,
      currentPageTimestamp: Date.now()
    });
    sendResponse({ success: true });
  }
  return true;
});

// Handle extension icon click to open side panel
chrome.action.onClicked.addListener(async (tab) => {
  // Open side panel if not already open
  try {
    await chrome.sidePanel.open({ windowId: tab.windowId });
  } catch (error) {
    console.error('Failed to open side panel:', error);
  }
});
