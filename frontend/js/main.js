// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('token') !== null;
}

// Get current user
function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}

// Logout
function logout() {
  localStorage.clear();
  window.location.href = '../index.html';
}

// Redirect to login if not logged in
function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

// Format date
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}

// Format countdown timer
function startTimer(endTime, elementId) {
  const interval = setInterval(() => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const diff = end - now;

    if (diff <= 0) {
      clearInterval(interval);
      const el = document.getElementById(elementId);
      if (el) el.innerHTML = '⏰ Auction Ended';
      return;
    }

    const hours   = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const el = document.getElementById(elementId);
    if (el) el.innerHTML = `⏰ ${hours}h ${minutes}m ${seconds}s remaining`;
  }, 1000);
}