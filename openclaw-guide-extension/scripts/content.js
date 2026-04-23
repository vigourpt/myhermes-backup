// OpenClaw Guide - Content Script
// Communicates with the OpenClaw Control UI to detect the current page

(function() {
  'use strict';

  // Detect current OpenClaw UI page from URL or DOM
  function detectPage() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    // Map URL patterns to page names
    const pathMap = {
      '/': 'chat',
      '/chat': 'chat',
      '/config': 'config',
      '/channels': 'channels',
      '/agents': 'agents',
      '/sessions': 'sessions',
      '/skills': 'skills',
      '/cron': 'cron',
      '/nodes': 'nodes',
      '/usage': 'usage',
      '/logs': 'logs',
      '/overview': 'overview'
    };

    let page = pathMap[path] || 'chat';
    
    // Also check for hash routes like #/channels
    if (hash && hash.length > 1) {
      const hashPath = hash.substring(1);
      page = pathMap[hashPath] || page;
    }

    // Also try to detect from sidebar active item
    const activeSidebarItem = document.querySelector('.sidebar nav .nav-item.active, .sidebar .item.active, [class*="sidebar"] [class*="active"]');
    if (activeSidebarItem) {
      const text = activeSidebarItem.textContent.toLowerCase();
      if (text.includes('chat')) page = 'chat';
      else if (text.includes('config')) page = 'config';
      else if (text.includes('channel')) page = 'channels';
      else if (text.includes('agent')) page = 'agents';
      else if (text.includes('session')) page = 'sessions';
      else if (text.includes('skill')) page = 'skills';
      else if (text.includes('cron')) page = 'cron';
      else if (text.includes('node')) page = 'nodes';
      else if (text.includes('usage')) page = 'usage';
      else if (text.includes('log')) page = 'logs';
    }

    // Try to detect from tab elements
    const tabs = document.querySelectorAll('[role="tab"], .tab, [class*="tab"]');
    tabs.forEach(tab => {
      const text = tab.textContent.toLowerCase();
      if (text.includes('chat') && (tab.getAttribute('aria-selected') === 'true' || tab.classList.contains('active'))) {
        page = 'chat';
      }
    });

    return page;
  }

  // Send page info to sidebar
  function notifySidebar() {
    const page = detectPage();
    
    // Check if sidebar is open and listening
    if (window.chrome && window.chrome.runtime) {
      window.chrome.runtime.sendMessage({
        type: 'OPENCLAW_PAGE',
        page: page
      }).catch(() => {
        // Sidebar might not be listening, that's ok
      });
    }
    
    // Also use localStorage for cross-context communication
    localStorage.setItem('openclaw-guide-current-page', page);
    localStorage.setItem('openclaw-guide-page-timestamp', Date.now().toString());
  }

  // Watch for URL changes (OpenClaw UI uses hash routing or history API)
  function setupNavigationWatcher() {
    // Initial detection
    notifySidebar();

    // Watch for hash changes
    window.addEventListener('hashchange', notifySidebar);

    // Watch for navigation changes (SPA navigation)
    let lastUrl = window.location.href;
    const observer = new MutationObserver(() => {
      if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        notifySidebar();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Also poll for changes as fallback
    setInterval(() => {
      if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        notifySidebar();
      }
    }, 1000);
  }

  // Add subtle highlighting to key UI elements
  function highlightKeyElements() {
    // This is optional visual enhancement
    // Add a subtle border to form inputs that might need attention
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"], textarea');
    inputs.forEach(input => {
      // Don't modify OpenClaw's own styling
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupNavigationWatcher();
      highlightKeyElements();
    });
  } else {
    setupNavigationWatcher();
    highlightKeyElements();
  }
})();
